import { Injectable } from '@nestjs/common';

@Injectable()
export class SpotifyAppService {
  getHello(): string {
    return 'Hello World!';
  }
}
