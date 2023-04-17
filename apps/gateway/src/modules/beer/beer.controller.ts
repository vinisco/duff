import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BeerService } from './beer.service';
import { CreateBeerRequestDto } from './dto/create-beer.request.dto';
import { UpdateBeerRequestDto } from './dto/update-beer.request.dto';

@ApiTags('Beer')
@Controller('beer')
export class BeerController {
  constructor(private readonly beerService: BeerService) {}

  @Post()
  create(@Body() createBeerDto: CreateBeerRequestDto) {
    return this.beerService.create({
      ...createBeerDto,
    });
  }

  @Get()
  findAll() {
    return this.beerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBeerDto: UpdateBeerRequestDto) {
    return this.beerService.update({ ...updateBeerDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beerService.remove(id);
  }
}
