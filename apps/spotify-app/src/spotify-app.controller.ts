import { Controller, Get } from '@nestjs/common';
import { SpotifyAppService } from './spotify-app.service';

@Controller()
export class SpotifyAppController {
  constructor(private readonly spotifyAppService: SpotifyAppService) {}

  @Get()
  getHello(): string {
    return this.spotifyAppService.getHello();
  }
}
