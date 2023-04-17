import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min } from 'class-validator';
import genFake from 'libs/utilities/genFake.util';

export class CreateBeerRequestDto {
  @ApiProperty({ example: genFake.beerName(), description: `Beer style` })
  @IsString()
  readonly style: string;

  @ApiProperty({
    example: genFake.minTemperature(),
    description: `Minimum beer style temperature
  `,
  })
  @Max(1000000)
  @Min(-278)
  readonly min_temperature: number;

  @ApiProperty({
    example: genFake.maxTemperature(),
    description: `Maximum beer style temperature
  `,
  })
  @Max(1000000)
  @Min(-278)
  readonly max_temperature: number;
}
