import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
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
  @IsNumber()
  readonly min_temperature: number;

  @ApiProperty({
    example: genFake.maxTemperature(),
    description: `Maximum beer style temperature
  `,
  })
  @IsNumber()
  readonly max_temperature: number;
}
