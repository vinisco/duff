import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BeerService } from './Beer.service';
import { Beer } from './entities/beer.entity';
import { UpdateBeerDto } from './dto/update-beer.dto';
import BeerMockRepository from './repositories/Beer-mock.repository';
import genFake from '../../../../../libs/utilities/genFake.util';
import { RpcException } from '@nestjs/microservices';

export type MockRepository<T = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

describe('BeerService', () => {
  let BeerEntityList: Beer[] = [];

  let beerService: BeerService;
  let beerRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BeerService,
        {
          provide: getRepositoryToken(Beer),
          useValue: BeerMockRepository(BeerEntityList),
        },
      ],
    }).compile();

    beerService = module.get<BeerService>(BeerService);
    beerRepository = module.get<MockRepository>(getRepositoryToken(Beer));
  });

  it('should be defined', () => {
    expect(beerService).toBeDefined();
    expect(beerRepository).toBeDefined();
  });

  describe('Create', () => {
    it('should be able to create a new Beer', async () => {
      const newBeer = new Beer({
        created_at: new Date(),
        updated_at: new Date(),
        style: genFake.beerName(),
        min_temperature: genFake.minTemperature(),
        max_temperature: genFake.maxTemperature(),
      });

      const result = await beerService.create(newBeer);

      expect(result).toEqual(newBeer);
      expect(result).toHaveProperty('id');
    });
  });
  describe('FindAll', () => {
    it('should be able to find all beers', async () => {
      const result = await beerService.findAll();

      expect(result.length).toEqual(1);
    });
  });
  describe('FindOne', () => {
    it('should be able to find a Beer by id', async () => {
      const newBeer = new Beer({
        created_at: new Date(),
        updated_at: new Date(),
        style: genFake.beerName(),
        min_temperature: genFake.minTemperature(),
        max_temperature: genFake.maxTemperature(),
      });

      const beer = await beerRepository.save(newBeer);

      const result = await beerService.findOne(beer.id);

      expect(result.id).toEqual(beer.id);
    });
    it('should not be able to find a Beer with a invalid id', async () => {
      const fakeBeerId = genFake.uuid();

      await expect(beerService.findOne(fakeBeerId)).rejects.toThrowError(
        RpcException,
      );
    });
  });
  describe('Update', () => {
    it('should be able to update a Beer', async () => {
      const newBeer = new Beer({
        created_at: new Date(),
        updated_at: new Date(),
        style: genFake.beerName(),
        min_temperature: genFake.minTemperature(),
        max_temperature: genFake.maxTemperature(),
      });

      const beer = await beerRepository.save(newBeer);

      const updateBeer: UpdateBeerDto = {
        id: beer.id,
        style: genFake.beerName(),
        min_temperature: genFake.minTemperature(),
        max_temperature: genFake.maxTemperature(),
      };

      const result = await beerService.update(updateBeer);

      expect(result.id).toEqual(updateBeer.id);
      expect(result.style).toEqual(updateBeer.style);
      expect(result.min_temperature).toEqual(updateBeer.min_temperature);
      expect(result.max_temperature).toEqual(updateBeer.max_temperature);
    });
    it('should not be able to update a Beer with a invalid id', async () => {
      const updateBeer: UpdateBeerDto = {
        id: 'invalid',
        style: genFake.beerName(),
        min_temperature: genFake.minTemperature(),
        max_temperature: genFake.maxTemperature(),
      };

      await expect(beerService.update(updateBeer)).rejects.toThrowError(
        RpcException,
      );
    });
  });
  describe('Remove', () => {
    it('should be able to delete a Beer', async () => {
      const newBeer = new Beer({
        created_at: new Date(),
        updated_at: new Date(),
        style: genFake.beerName(),
        min_temperature: genFake.minTemperature(),
        max_temperature: genFake.maxTemperature(),
      });

      const beer = await beerRepository.save(newBeer);

      await beerService.remove(beer.id);

      await expect(beerService.findOne(beer)).rejects.toThrowError(
        RpcException,
      );
    });
    it('should not be able to delete a Beer with a invalid id', async () => {
      const fakeBeerId = genFake.uuid();

      await expect(beerService.remove(fakeBeerId)).rejects.toThrowError(
        RpcException,
      );
    });
  });
});
