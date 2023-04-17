import { Module } from '@nestjs/common';

import { SpotifyService } from './spotify.service';
import { SpotifyController } from './spotify.controller';
import { RmqModule } from 'libs/modules/rmq/rmq.module';
import { IntegrationModule } from '../integration/integration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beer } from '../beer/entities/beer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Beer]), IntegrationModule, RmqModule],
  controllers: [SpotifyController],
  providers: [SpotifyService],
  exports: [SpotifyService],
})
export class SpotifyModule {}
