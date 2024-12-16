import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { PostRepository } from './post.repository';
@Module({
    imports: [
        TypeOrmModule.forFeature([
            Post
        ]),
    ],
    providers: [PostRepository],
    exports: [PostRepository],
})
export class RepositoriesModule { }
