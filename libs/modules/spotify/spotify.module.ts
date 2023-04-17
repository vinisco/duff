import { Module } from '@nestjs/common';

import { SpotifyService } from './spotify.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [SpotifyService],
  exports: [SpotifyService],
})
export class SpotifyModule {}
