import { Module } from '@nestjs/common';
import { TaskManagerModule } from './modules/task-manager/task-manager.module';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './modules/shared/shared.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  RedisModule,
  RedisModuleOptions,
  RedisService,
} from '@liaoliaots/nestjs-redis';
import {
  RedisLockModule,
} from '@huangang/nestjs-simple-redis-lock';

@Module({
  imports: [
    AuthModule,
    TaskManagerModule,
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<RedisModuleOptions> => {
        return {
          closeClient: true,
          config: {
            url: configService.get('REDIS_URL'),
          },
        };
      },
    }),
    RedisLockModule.registerAsync({
      useFactory: async (redisService: RedisService) => {
        return { prefix: ':lock:', client: redisService.getClient() };
      },
      inject: [RedisService],
    }),
  ],
  controllers: [],
  exports: [RedisLockModule],
})
export class AppModule {}
