import { ForbiddenException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "src/entities/post.entity";
import { User } from "src/entities/user.entity";
import { CreatePostDto, FindPostDto } from "src/post/dto/post.dto";
import { Repository } from "typeorm";

export class PostRepository {
    constructor(@InjectRepository(Post) private readonly postRepo: Repository<Post>) { }

    async find(data: FindPostDto): Promise<Post[]> {
        const { pageSize, pageNumber } = data
        try {
            const createQuery = this.postRepo.createQueryBuilder("post")
            const skip = pageNumber ? (Number(pageNumber) - 1) * Number(pageSize) : 0
            const take = pageSize ? Number(pageSize) : 10
            return await createQuery.skip(skip).take(take).getMany()
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error('Error in find post:', error.message);
            throw new InternalServerErrorException('An error occurred while fetching posts');
        }
    }

    async findOne(id: number): Promise<Post> {
        try {
            const post = await this.postRepo.findOne({ where: { id } })
            if (!post) throw new NotFoundException("post not found")
            return post
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error('Error in findOne post:', error.message);
            throw new InternalServerErrorException('An error occurred while fetching post');
        }
    }


    async create(data: CreatePostDto, image: string, user: User): Promise<Post> {
        const { title, content } = data
        try {
            const newPost = this.postRepo.create({
                title,
                content,
                image
            })
            newPost.user = user
            return await this.postRepo.save(newPost)
        } catch (error) {
            console.error('Error in create post:', error.message);
            throw new InternalServerErrorException('An error occurred while create post');
        }
    }
    async update(id: number, data: any, userId: string): Promise<Post> {
        const { title, content, image, } = data
        try {
            const post = await this.postRepo.findOne({ where: { id }, relations: ["user"] })
            if (!post) throw new NotFoundException("Post not found!")
            if (post.user.id != userId) throw new ForbiddenException('You do not have permission to access this resource');
            if (title && title != "") post.title = title
            if (content && content != "") post.content = content
            if (image && image != "") post.image = image
            return await this.postRepo.save(post)
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof ForbiddenException) {
                throw error;
            }
            console.error('Error in update post:', error.message);
            throw new InternalServerErrorException('An error occurred while updating posts');
        }
    }
    async delete(id: number, userId: string): Promise<void> {
        try {
            const post = await this.postRepo.findOne({ where: { id }, relations: ["user"] })
            if (!post) throw new NotFoundException("Post not found!")
            if (post.user.id != userId) throw new ForbiddenException('You do not have permission to access this resource');
            await this.postRepo.remove(post)
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof ForbiddenException) {
                throw error;
            }
            console.error('Error in delete post:', error.message);
            throw new InternalServerErrorException('An error occurred while deleting posts');
        }
    }
}