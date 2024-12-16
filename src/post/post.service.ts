import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PostRepository } from 'src/repository/post.repository';
import { UserRepository } from 'src/repository/user.repository';
import { CreatePostDto, FindPostDto } from './dto/post.dto';

@Injectable()
export class PostService {
    constructor(private readonly userRpo: UserRepository, private readonly postRepo: PostRepository) { }
    async getPosts(data: FindPostDto) {
        try {
            return await this.postRepo.find(data)
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error('Error in get posts:', error.message);
            throw new InternalServerErrorException('An error occurred while retrieving posts');
        }
    }
    async getPost(id: number) {
        try {
            return await this.postRepo.findOne(id)
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error('Error in get post:', error.message);
            throw new InternalServerErrorException('An error occurred while retrieving post');
        }
    }

    async createPost(data: CreatePostDto, imageName: string, userId: string) {
        try {
            const user = await this.userRpo.findOne(userId)
            return await this.postRepo.create(data, imageName, user)
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error('Error in create post:', error.message);
            throw new InternalServerErrorException('An error occurred while retrieving posts');
        }
    }
    async updatePost(id: number, data: any, userId: string) {
        try {
            return await this.postRepo.update(id, data, userId)
        } catch (error) {
            if (error instanceof ForbiddenException || error instanceof NotFoundException) {
                throw error
            }
            console.error('Error in update post:', error.message);
            throw new InternalServerErrorException('An error occurred while updating post');
        }
    }
    async deletePost(id: number, userId: string) {
        try {
            return await this.postRepo.delete(id, userId)
        } catch (error) {
            if (error instanceof ForbiddenException || error instanceof NotFoundException) {
                throw error
            }
            console.error('Error in update post:', error.message);
            throw new InternalServerErrorException('An error occurred while updating post');
        }
    }
}

