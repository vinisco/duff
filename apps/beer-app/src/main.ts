import { NestFactory } from '@nestjs/core';
import { RmqService } from 'libs/modules/rmq/rmq.service';
import { BeerAppModule } from './app.module';
import { ExceptionFilter } from 'libs/common/http-exception/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(BeerAppModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('BEER_APP'));
  app.useGlobalFilters(new ExceptionFilter());

  await app.startAllMicroservices();
}
bootstrap();
