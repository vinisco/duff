import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  LessThan,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { RpcException } from '@nestjs/microservices';

import { CreateBeerDto } from './dto/create-beer.dto';
import { UpdateBeerDto } from './dto/update-beer.dto';
import { Beer } from './entities/beer.entity';

@Injectable()
export class BeerService {
  constructor(
    @InjectRepository(Beer)
    private readonly beerRepository: Repository<Beer>,
  ) {}

  async create(createBeerDto: CreateBeerDto) {
    const beer = this.beerRepository.create(createBeerDto);

    return await this.beerRepository.save(beer);
  }

  async findAll() {
    const results = await this.beerRepository.find();

    return results;
  }

  async findOne(id: string) {
    const beer = await this.beerRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!beer) {
      throw new RpcException({ message: `Beer not found`, status: 404 });
    }

    return beer;
  }

  async update(updateBeerDto: UpdateBeerDto) {
    const beer = await this.beerRepository.findOne({
      where: {
        id: updateBeerDto.id,
      },
    });

    if (!beer) {
      throw new RpcException({ message: `Beer not found`, status: 404 });
    }

    Object.assign(beer, updateBeerDto);

    return this.beerRepository.save(beer);
  }

  async remove(id: string) {
    const Beer = await this.beerRepository.findOne({ where: { id } });

    if (!Beer) {
      throw new RpcException({ message: `Beer not found`, status: 404 });
    }

    return this.beerRepository.remove(Beer);
  }
}
