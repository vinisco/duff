import { Module } from '@nestjs/common';
import { BeerService } from './beer.service';
import { BeerController } from './beer.controller';
import { BEER_SERVICE } from './constants/services';
import { RmqModule } from 'libs/modules/rmq/rmq.module';

@Module({
  imports: [
    RmqModule.register({
      name: BEER_SERVICE,
    }),
  ],
  controllers: [BeerController],
  providers: [BeerService],
  exports: [BeerService],
})
export class BeerModule {}
