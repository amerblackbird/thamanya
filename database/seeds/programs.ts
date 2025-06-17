import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { Program } from '../../src/programs/entities/program.entity';
import { Episode } from '../../src/episodes/entities/episode.entity';
import { ProgramType } from '../../src/programs/types';

const programsSeedData = [
  {
    title: 'Web Development Bootcamp',
    description:
      'An intensive program designed to teach the fundamentals of web development, including HTML, CSS, and JavaScript.',
    active: true,
    type: ProgramType.PODCAST,
    language: 'English',
    publishDate: '2023-01-15 T00:00:00Z',
    episodes: [
      {
        title: 'Introduction to HTML',
        description: 'Learn the basics of HTML and how to structure web pages.',
        duration: 3600, // in seconds
        publishDate: '2023-01-15 T00:00:00Z',
      },
      {
        title: 'CSS Fundamentals',
        description: 'Discover how to style web pages using CSS.',
        duration: 2700, // in seconds
        publishDate: '2023-01-22 T00:00:00Z',
      },
    ],
  },
  {
    title: 'Data Science Essentials',
    description:
      'A comprehensive program covering the key concepts and tools in data science, including Python, R, and machine learning.',
    active: true,
    type: ProgramType.DOCUMENTARY,
    language: 'English',
    publishDate: '2023-02-01 T00:00:00Z',
    episodes: [
      {
        title: 'Getting Started with Python',
        description: 'An introduction to Python programming for data science.',
        duration: 4200, // in seconds
        publishDate: '2023-02-01 T00:00:00Z',
      },
      {
        title: 'Introduction to Machine Learning',
        description:
          'Learn the basics of machine learning and how to apply it to real-world problems.',
        duration: 4800, // in seconds
        publishDate: '2023-02-08 T00:00:00Z',
      },
    ],
  },
  {
    title: 'AI and Machine Learning',
    description:
      'Explore the world of artificial intelligence and machine learning, including neural networks and deep learning.',
    active: true,
    type: ProgramType.PODCAST,
    language: 'Arabic',
    publishDate: '2023-03-01 T00:00:00Z',
    episodes: [
      {
        title: 'Understanding Neural Networks',
        description:
          'A deep dive into neural networks and how they are used in AI applications.',
        duration: 5400, // in seconds
        publishDate: '2023-03-01 T00:00:00Z',
      },
      {
        title: 'Deep Learning Techniques',
        description:
          'Learn about advanced deep learning techniques and their applications.',
        duration: 6000, // in seconds
        publishDate: '2023-03-08 T00:00:00Z',
      },
    ],
  },
];

const ProgramsSeed = async (repo: Repository<Program>) => {
  const logger = new Logger();

  logger.log('Programs seeder start');

  const repository = repo.manager.getRepository<Program>(Program);

  for (const data of programsSeedData) {
    const exists = await repository.findOne({
      where: {
        title: data.title,
      },
    });

    if (exists) {
      continue;
    }
    const program = new Program();
    program.title = data.title;
    program.description = data.description;
    program.active = data.active;
    program.type = data.type;
    program.language = data.language;
    program.publishDate = data.publishDate;

    const newProgram = await repository.save(program);

    for (const episodeData of data.episodes) {
      const episode = new Episode();
      episode.title = episodeData.title;
      episode.description = episodeData.description;
      episode.duration = episodeData.duration;
      episode.program = newProgram;
      episode.publishDate = episodeData.publishDate;

      await repo.manager.getRepository(Episode).save(episode);
    }
  }

  logger.log('Programs seeder done');
};

export default ProgramsSeed;
