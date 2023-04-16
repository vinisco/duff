import { faker } from '@faker-js/faker';
import { v4 as uuidV4 } from 'uuid';

faker.setLocale('pt_BR');

const temperature = Number(faker.random.numeric(2));

const genFake = {
  beerName: () => faker.commerce.productName(),
  maxTemperature: () => temperature,
  minTemperature: () => temperature + 2,
  uuid: () => uuidV4(),
};

export default genFake;
