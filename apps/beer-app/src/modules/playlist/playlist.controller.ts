import { Controller } from '@nestjs/common';

import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RmqService } from 'libs/modules/rmq/rmq.service';
import { PlaylistService } from './playlist.service';
import { GetPlaylistRequest } from './dto/get-playlist.request';

@Controller()
export class PlaylistController {
  constructor(
    private readonly spotifyService: PlaylistService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern({ cmd: 'find_playlist' })
  findPlaylist(
    @Payload() getPlaylistRequest: GetPlaylistRequest,
    @Ctx() context: RmqContext,
  ) {
    this.rmqService.ack(context);
    return this.spotifyService.findPlaylist(getPlaylistRequest.temperature);
  }
}
