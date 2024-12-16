import { InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/entities/role.entity";
import { Repository } from "typeorm";

export class RoleRepository {
    constructor(@InjectRepository(Role) private readonly roleRepo: Repository<Role>) { }
    async create(data: any) {
        const { name } = data
        try {
            const newRole = this.roleRepo.create({
                name
            })
            return await this.roleRepo.save(newRole)
        } catch (error) {
            throw new InternalServerErrorException('An error occurred while creating role');

        }
    }
    async find(date: any) {
        const { pageSize, pageNumber } = date
        try {
            const skip = pageNumber ? (pageNumber - 1) * pageSize : 0
            const take = pageSize ? pageSize : 10
            return await this.roleRepo.find({ skip, take })
        } catch (error) {
            throw new InternalServerErrorException('An error occurred while fetching roles');
        }
    }
}