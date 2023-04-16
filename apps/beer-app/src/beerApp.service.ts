import { Injectable } from '@nestjs/common';

@Injectable()
export class BeerAppService {
  getHello(): string {
    return 'Hello World!';
  }
}
