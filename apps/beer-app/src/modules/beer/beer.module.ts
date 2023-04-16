import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BeerService } from './beer.service';
import { BeerController } from './beer.controller';
import { Beer } from './entities/beer.entity';
import { RmqModule } from 'libs/modules/rmq/rmq.module';

@Module({
  imports: [TypeOrmModule.forFeature([Beer]), RmqModule],
  controllers: [BeerController],
  providers: [BeerService],
  exports: [BeerService],
})
export class BeerModule {}
