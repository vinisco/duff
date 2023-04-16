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
  create(@Payload() createBeerDto: CreateBeerDto, @Ctx() context: RmqContext) {
    this.rmqService.ack(context);

    return this.beerService.create({
      ...createBeerDto,
    });
  }

  @MessagePattern({ cmd: 'find_all' })
  findAll(@Ctx() context: RmqContext) {
    this.rmqService.ack(context);
    return this.beerService.findAll();
  }

  @MessagePattern({ cmd: 'find_one' })
  findOne(@Payload() request: { id: string }, @Ctx() context: RmqContext) {
    this.rmqService.ack(context);
    return this.beerService.findOne(request.id);
  }

  @MessagePattern({ cmd: 'update' })
  update(@Payload() updateBeerDto: UpdateBeerDto, @Ctx() context: RmqContext) {
    this.rmqService.ack(context);
    return this.beerService.update(updateBeerDto);
  }

  @MessagePattern({ cmd: 'remove' })
  remove(@Payload() request: { id: string }, @Ctx() context: RmqContext) {
    this.rmqService.ack(context);
    return this.beerService.remove(request.id);
  }
}
