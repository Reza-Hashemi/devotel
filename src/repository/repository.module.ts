import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { PostRepository } from './post.repository';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/entities/role.entity';
import { RoleRepository } from './role.repository';
@Module({
    imports: [
        TypeOrmModule.forFeature([
            Post, User, Role
        ]),
    ],
    providers: [PostRepository, UserRepository, RoleRepository],
    exports: [PostRepository, UserRepository, RoleRepository],
})
export class RepositoriesModule { }
