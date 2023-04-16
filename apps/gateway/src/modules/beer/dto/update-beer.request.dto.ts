import { ApiHideProperty, PartialType } from '@nestjs/swagger';

import { CreateBeerRequestDto } from './create-beer.request.dto';

export class UpdateBeerRequestDto extends PartialType(CreateBeerRequestDto) {
  @ApiHideProperty()
  id: string;
}
