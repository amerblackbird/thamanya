import { Repository } from 'typeorm';
import { Category } from '../../src/programs/entities/category.entity';
import { Logger } from '@nestjs/common';

const categoriesSeedData = [
  {
    title: 'News',
    description: 'Latest news and updates',
    active: true,
  },
];

const CategoriesSeed = async (repo: Repository<Category>) => {
  const logger = new Logger();

  logger.log('Categories seeder start');

  const repository = repo.manager.getRepository<Category>(Category);

  const categorySeed: Category[] = [];
  for (const data of categoriesSeedData) {
    const exists = await repository.findOne({
      where: {
        title: data.title,
      },
    });

    if (exists) {
      continue;
    }
    const category = new Category();
    category.title = data.title;
    category.description = data.description;
    category.active = data.active;
    categorySeed.push(category);
  }
  if (!categorySeed.length) {
    logger.log('No new categories to seed');
    return;
  }
  await repo.save(categorySeed);

  logger.log('Categories seeder done');
};

export default CategoriesSeed;
