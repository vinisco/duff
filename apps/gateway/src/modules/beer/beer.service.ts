import { Injectable, HttpException, Inject } from '@nestjs/common';

import { CreateBeerRequestDto } from './dto/create-beer.request.dto';
import { UpdateBeerRequestDto } from './dto/update-beer.request.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BEER_SERVICE } from '../../../../../libs/common/constants/services';

@Injectable()
export class BeerService {
  constructor(@Inject(BEER_SERVICE) private beerClient: ClientProxy) {}

  async create(createBeerDto: CreateBeerRequestDto) {
    try {
      return await lastValueFrom(
        this.beerClient.send({ cmd: 'create' }, createBeerDto),
      );
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  async findAll() {
    try {
      return await lastValueFrom(this.beerClient.send({ cmd: 'find_all' }, {}));
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  async findOne(id: string) {
    try {
      return await lastValueFrom(
        this.beerClient.send(
          { cmd: 'find_one' },
          {
            id,
          },
        ),
      );
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  async update(updateBeerDto: UpdateBeerRequestDto) {
    try {
      return await lastValueFrom(
        this.beerClient.send({ cmd: 'update' }, updateBeerDto),
      );
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  async remove(id: string) {
    try {
      return await lastValueFrom(
        this.beerClient.send({ cmd: 'remove' }, { id }),
      );
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }
}
