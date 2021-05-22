import { Sequelize } from 'sequelize-typescript';
import { Product } from 'src/modules/product/product.entity';
import { Category } from '../../modules/category/category.entity';
import { User } from '../../modules/user/user.entity';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([Category, Product, User]);
      await await sequelize.sync({ force: false });
      return sequelize;
    },
  },
];
