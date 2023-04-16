import genFake from '../../../../../../libs/utilities/genFake.util';
import { Repository } from 'typeorm';

export type MockRepository<T = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

const BeerMockRepository = <T = any>(beerEntityList): MockRepository<T> => ({
  create: jest.fn().mockImplementation((dto) => dto),
  findOne: jest.fn().mockImplementation((query) => {
    return Promise.resolve(
      beerEntityList.find((el) => el.id === query.where.id),
    );
  }),
  find: jest.fn().mockImplementation((query) => {
    return Promise.resolve(beerEntityList);
  }),
  save: jest.fn().mockImplementation((dto) => {
    const Beer = { id: dto?.id ? dto.id : genFake.uuid(), ...dto };
    beerEntityList.push(Beer);
    return Promise.resolve(Beer);
  }),
  remove: jest.fn().mockImplementation((dto) => {
    const Beer = beerEntityList.find((el) => el.id === dto.id);
    beerEntityList = beerEntityList.filter((el) => el.id !== dto.id);
    return Promise.resolve(Beer);
  }),
});

export default BeerMockRepository;
