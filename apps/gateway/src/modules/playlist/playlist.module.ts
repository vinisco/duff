import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { RmqModule } from 'libs/modules/rmq/rmq.module';
import { BEER_SERVICE } from 'libs/common/constants/services';

@Module({
  imports: [
    RmqModule.register({
      name: BEER_SERVICE,
    }),
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService],
  exports: [PlaylistService],
})
export class PlaylistModule {}
