import { Module } from '@nestjs/common';
import { BeerService } from './beer.service';
import { BeerController } from './beer.controller';
import { RmqModule } from 'libs/modules/rmq/rmq.module';
import { BEER_SERVICE } from 'libs/common/constants/services';

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
