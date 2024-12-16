import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './config/db/config/database.module';
import { ConfigModule } from '@nestjs/config';
import { RepositoriesModule } from './repository/repository.module';
import { PostModule } from './post/post.module';
import { FirebaseModule } from './config/firebase/firebase.module';
import { FirebaseAuthMiddleware } from './common/middleware/validateToken';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    RepositoriesModule,
    PostModule,
    FirebaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FirebaseAuthMiddleware)
      .forRoutes('*');
  }
}
