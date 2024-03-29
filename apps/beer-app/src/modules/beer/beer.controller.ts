import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BeerService } from './beer.service';
import { CreateBeerDto } from './dto/create-beer.dto';
import { UpdateBeerDto } from './dto/update-beer.dto';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RmqService } from 'libs/modules/rmq/rmq.service';

@Controller()
export class BeerController {
  constructor(
    private readonly beerService: BeerService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern({ cmd: 'create' })
  async create(
    @Payload() createBeerDto: CreateBeerDto,
    @Ctx() context: RmqContext,
  ) {
    this.rmqService.ack(context);

    return await this.beerService.create({
      ...createBeerDto,
    });
  }

  @MessagePattern({ cmd: 'find_all' })
  async findAll(@Ctx() context: RmqContext) {
    this.rmqService.ack(context);
    return await this.beerService.findAll();
  }

  @MessagePattern({ cmd: 'find_one' })
  async findOne(
    @Payload() request: { id: string },
    @Ctx() context: RmqContext,
  ) {
    this.rmqService.ack(context);
    return await this.beerService.findOne(request.id);
  }

  @MessagePattern({ cmd: 'update' })
  async update(
    @Payload() updateBeerDto: UpdateBeerDto,
    @Ctx() context: RmqContext,
  ) {
    this.rmqService.ack(context);
    return await this.beerService.update(updateBeerDto);
  }

  @MessagePattern({ cmd: 'remove' })
  async remove(@Payload() request: { id: string }, @Ctx() context: RmqContext) {
    this.rmqService.ack(context);
    return await this.beerService.remove(request.id);
  }
}
