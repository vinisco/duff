import { Controller, Get } from '@nestjs/common';
import { BeerAppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class BeerAppController {
  constructor(private readonly beerService: BeerAppService) {}

  getHello(): string {
    return this.beerService.getHello();
  }
}
