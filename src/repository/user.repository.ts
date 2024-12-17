import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginDto } from "src/auth/dto/auth.dto";
import { Role } from "src/entities/role.entity";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

export class UserRepository {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) { }

    async create(data: any, role: Role): Promise<User> {
        try {
            const { username, password, } = data
            const newUser = this.userRepo.create({
                username,
                password
            })
            newUser.role = role
            return await this.userRepo.save(newUser)
        } catch (error) {
            console.error('Error in delete post:', error.message);
            throw new InternalServerErrorException('An error occurred while creating user');
        }
    }
    async findOne(id: string): Promise<User> {
        try {
            const user = await this.userRepo.findOne({ where: { id } })
            if (!user) throw new NotFoundException("User not found!")
            return user
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error
            }
            console.error('Error in delete post:', error.message);
            throw new InternalServerErrorException('An error occurred while finding user');
        }
    }
    async findByUserAndPass(data: LoginDto): Promise<User> {
        const { password, username } = data
        try {
            const user = await this.userRepo.findOne({
                where: {
                    username, password
                }
            })
            if (!user) throw new NotFoundException("user not found!")
            return user
        } catch (error) {
            throw error
        }
    }
}