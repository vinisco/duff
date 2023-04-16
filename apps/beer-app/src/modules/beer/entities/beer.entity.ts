import { v4 as uuidV4 } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import genFake from '../../../../../../libs/utilities/genFake.util';

@Entity('beers')
export class Beer {
  @ApiProperty({
    example: genFake.uuid(),
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: genFake.beerName(),
  })
  @Column()
  style: string;

  @ApiProperty({
    example: genFake.minTemperature,
  })
  @Column()
  min_temperature: number;

  @ApiProperty({
    example: genFake.maxTemperature,
  })
  @Column()
  max_temperature: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(Beer: Partial<Beer>) {
    if (!this.id) {
      this.id = uuidV4();
    }
    this.style = Beer?.style;
    this.min_temperature = Beer?.min_temperature;
    this.max_temperature = Beer?.max_temperature;
    this.created_at = Beer?.created_at;
    this.updated_at = Beer?.updated_at;
  }
}
