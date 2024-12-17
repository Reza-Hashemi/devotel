import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from './config/db/config/database.module';
import { ConfigModule } from '@nestjs/config';
import { RepositoriesModule } from './repository/repository.module';
import { PostModule } from './post/post.module';
import { FirebaseModule } from './config/firebase/firebase.module';
import { FirebaseAuthMiddleware } from './common/middleware/validateToken';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guard/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    RepositoriesModule,
    PostModule,
    FirebaseModule,
    AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FirebaseAuthMiddleware)
      .exclude(
        { path: '/auth', method: RequestMethod.ALL }, 'auth/(.*)',)
      .forRoutes('*');
  }
}
