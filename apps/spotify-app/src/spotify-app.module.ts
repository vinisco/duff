import { Module } from '@nestjs/common';
import { SpotifyAppController } from './spotify-app.controller';
import { SpotifyAppService } from './spotify-app.service';

@Module({
  imports: [],
  controllers: [SpotifyAppController],
  providers: [SpotifyAppService],
})
export class SpotifyAppModule {}
