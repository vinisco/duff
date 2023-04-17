import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { Beer } from 'apps/beer-app/src/modules/beer/entities/beer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpotifyService } from 'libs/modules/spotify/spotify.service';
import { ShowResponseDto } from 'libs/modules/spotify/dto/show.response.dto';

@Injectable()
export class PlaylistService {
  constructor(
    private readonly spotifyService: SpotifyService,
    @InjectRepository(Beer)
    private readonly beerRepository: Repository<Beer>,
  ) {}

  async findPlaylist(temperature: number) {
    const countBeers = await this.beerRepository.count();

    if (countBeers === 0) {
      throw new RpcException({
        message: `There is no beer registered in the current database`,
        status: 404,
      });
    }

    try {
      const beer = await this.beerRepository.query(
        `
        SELECT *,
        ABS((min_temperature + max_temperature)/2 - $1) AS diff
        FROM beers
        ORDER BY diff asc, style`,
        [temperature],
      );

      if (!beer) {
        throw new RpcException({
          message: `Could not find a Beer for this selected temperature`,
          status: 404,
        });
      }

      const playlist: ShowResponseDto =
        await this.spotifyService.showFirstPlaylist(beer[0].style);

      return {
        beerStyle: beer[0].style,
        playlist: {
          name: playlist.name,
          tracks: playlist.tracks.items.map((track) => {
            return {
              name: track.track.name,
              artist: track.track.artists[0].name,
              link: track.track.external_urls.spotify,
            };
          }),
        },
      };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
