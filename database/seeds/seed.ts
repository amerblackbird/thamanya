import CategoriesSeed from './categories';
import AppManager from '../../typeorm.config';
import ProgramsSeed from './programs';
import { Program } from '../../src/modules/cms/programs/entities/program.entity';
import { Category } from '../../src/modules/cms/categories/entities/category.entity';

AppManager.initialize()
  .then(async () => {
    // Seed database
    await CategoriesSeed(AppManager.getRepository<Category>(Category));
    await ProgramsSeed(AppManager.getRepository<Program>(Program));
  })
  .catch((error) => console.error(error));
