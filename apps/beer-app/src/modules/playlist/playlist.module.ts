import { Module } from '@nestjs/common';

import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { RmqModule } from 'libs/modules/rmq/rmq.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beer } from '../beer/entities/beer.entity';
import { SpotifyModule } from 'libs/modules/spotify/spotify.module';

@Module({
  imports: [TypeOrmModule.forFeature([Beer]), SpotifyModule, RmqModule],
  controllers: [PlaylistController],
  providers: [PlaylistService],
  exports: [PlaylistService],
})
export class PlaylistModule {}
