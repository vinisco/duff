import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BeerAppController } from './beerApp.controller';
import { BeerAppService } from './beerApp.service';
import appConfig from './config/app.config';
import migrations from './database/migration.index';
import { BeerModule } from './modules/beer/beer.module';
import { RmqModule } from 'libs/modules/rmq/rmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: false,
        migrationsRun: true,
        migrations,
      }),
    }),
    BeerModule,
  ],
  controllers: [BeerAppController],
  providers: [BeerAppService],
})
export class BeerAppModule {}
