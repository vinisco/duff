import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { IntegrationService } from '../integration/integration.service';
import { Beer } from 'apps/beer-app/src/modules/beer/entities/beer.entity';
import { ShowResponseDto } from '../integration/dto/show.response.dto';
import { BeerService } from '../beer/beer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SpotifyService {
  constructor(
    private readonly integrationService: IntegrationService,
    @InjectRepository(Beer)
    private readonly beerRepository: Repository<Beer>,
  ) {}

  async findPlaylist(temperature: number) {
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
        await this.integrationService.showFirstPlaylist(beer[0].style);

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
      throw new RpcException(error);
    }
  }
}
