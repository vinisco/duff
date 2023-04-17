import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { serialize } from '../../../../../libs/utilities/serialize.util';
import { RpcException } from '@nestjs/microservices';
import { AuthorizationResponseDto } from './dto/authorization.response.dto';
import { SearchResponseDto } from './dto/search.response.dto';
import { ShowResponseDto } from './dto/show.response.dto';

@Injectable()
export class IntegrationService {
  constructor(private readonly httpService: HttpService) {}

  async authenticate(): Promise<AuthorizationResponseDto> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(
          'https://accounts.spotify.com/api/token',
          serialize({
            grant_type: 'client_credentials',
          }),
          {
            headers: {
              Authorization:
                'Basic ' +
                Buffer.from(
                  process.env.SPOTIFY_CLIENT + ':' + process.env.SPOTIFY_SECRET,
                ).toString('base64'),
            },
          },
        ),
      );
      return data;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async searchPlaylist(playlist: string): Promise<SearchResponseDto> {
    try {
      const { access_token } = await this.authenticate();
      const { data } = await firstValueFrom(
        this.httpService.get(
          `https://api.spotify.com/v1/search?q=${playlist}&type=playlist`,
          {
            headers: {
              Authorization: 'Bearer ' + access_token,
            },
          },
        ),
      );
      return data;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async showFirstPlaylist(playlist: string): Promise<ShowResponseDto> {
    try {
      const { access_token } = await this.authenticate();

      const data = await this.searchPlaylist(playlist);

      if (!data.playlists.items[0]?.id) {
        throw new RpcException({
          message: `No playlists where found for this beer name`,
          status: 404,
        });
      }

      const { data: playlistItem } = await firstValueFrom(
        this.httpService.get(
          `https://api.spotify.com/v1/playlists/${data.playlists.items[0].id}`,
          {
            headers: {
              Authorization: 'Bearer ' + access_token,
            },
          },
        ),
      );

      return playlistItem;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
