import * as Joi from '@hapi/joi';

export default () => ({
  envFilePath: ['.env'],
  validationSchema: Joi.object({
    DATABASE_HOST: Joi.required(),
    DATABASE_PORT: Joi.number().default(5432),
    RABBIT_MQ_URI: Joi.string().required(),
    RABBIT_MQ_BEER_QUEUE: Joi.string().required(),
  }),
});
