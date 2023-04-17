import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { Max, Min } from 'class-validator';
import genFake from 'libs/utilities/genFake.util';

export class GetPlaylistRequestDto {
  @ApiProperty({
    example: genFake.minTemperature(),
    description: `temperature,
  `,
  })
  @Max(1000000)
  @Min(-278)
  readonly temperature: number;
}
