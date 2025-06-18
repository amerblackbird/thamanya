import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheableMemory } from 'cacheable';
import { createKeyv } from '@keyv/redis';
import { Keyv } from 'keyv';
import { CmsModule } from './modules/cms/cms.module';
import { DiscoveryModule } from './modules/discovery/discovery.module';

import databaseConfig from './core/config/database.config';
import appConfig from './core/config/app.config';
import cacheConfig from './core/config/cache.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env' : '.development.env',
      isGlobal: true,
      load: [databaseConfig, appConfig, cacheConfig],
    }),
    CacheModule.registerAsync({
      useFactory: () => {
        return {
          stores: [
            new Keyv({
              store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
            }),
            createKeyv('redis://localhost:6379'),
          ],
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('database.host') as string,
          port: +configService.get('database.port'),
          username: configService.get('database.username') as string,
          password: configService.get('database.password') as string,
          database: configService.get('database.name') as string,
          entities: [__dirname + '/**/*.{entity,view}{.ts,.js}'],
          migrations: [__dirname + '../database/migrations/*{.ts,.js}'],
          migrationsTableName: '_migrations',
          synchronize: false,
          extra: {
            options: '-c statement_timeout=60000ms',
            query_timeout: 60000,
            poolSize: 10,
          },
        };
      },
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    ScheduleModule.forRoot(),
    CmsModule,
    DiscoveryModule,
  ],
})
export class AppModule {}
