import {Module} from '@nestjs/common';
import {TaskManagerModule} from './modules/task-manager/task-manager.module';
import {AuthModule} from './modules/auth/auth.module';
import {SharedModule} from './modules/shared/shared.module';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    TaskManagerModule,
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),],
  controllers: [],
  providers: [],
})

export class AppModule {
}
