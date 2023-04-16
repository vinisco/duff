import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyAppController } from './spotify-app.controller';
import { SpotifyAppService } from './spotify-app.service';

describe('SpotifyAppController', () => {
  let spotifyAppController: SpotifyAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SpotifyAppController],
      providers: [SpotifyAppService],
    }).compile();

    spotifyAppController = app.get<SpotifyAppController>(SpotifyAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(spotifyAppController.getHello()).toBe('Hello World!');
    });
  });
});
