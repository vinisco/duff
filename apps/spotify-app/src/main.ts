import { NestFactory } from '@nestjs/core';
import { SpotifyAppModule } from './spotify-app.module';

async function bootstrap() {
  const app = await NestFactory.create(SpotifyAppModule);
  await app.listen(3000);
}
bootstrap();
