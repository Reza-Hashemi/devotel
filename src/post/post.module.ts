import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { RepositoriesModule } from 'src/repository/repository.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule { }
