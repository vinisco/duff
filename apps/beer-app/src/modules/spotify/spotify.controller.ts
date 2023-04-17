import { Controller } from '@nestjs/common';

import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RmqService } from 'libs/modules/rmq/rmq.service';
import { SpotifyService } from './spotify.service';

@Controller()
export class SpotifyController {
  constructor(
    private readonly spotifyService: SpotifyService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern({ cmd: 'find_playlist' })
  findPlaylist(
    @Payload() temperature: { temperature: number },
    @Ctx() context: RmqContext,
  ) {
    this.rmqService.ack(context);
    return this.spotifyService.findPlaylist(temperature.temperature);
  }
}
