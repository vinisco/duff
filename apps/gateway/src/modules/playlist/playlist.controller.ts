import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PlaylistService } from './playlist.service';

@ApiTags('Playlist')
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get('')
  findPlaylist(@Query() temperature: { temperature: string }) {
    return this.playlistService.findPlaylist(Number(temperature.temperature));
  }
}
