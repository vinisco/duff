import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BeerModule } from './modules/beer/beer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BeerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
