import { Injectable, HttpException, Inject } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BEER_SERVICE } from '../../../../../libs/common/constants/services';

@Injectable()
export class PlaylistService {
  constructor(@Inject(BEER_SERVICE) private beerClient: ClientProxy) {}

  async findPlaylist(temperature: number) {
    try {
      return await lastValueFrom(
        this.beerClient.send({ cmd: 'find_playlist' }, { temperature }),
      );
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }
}
