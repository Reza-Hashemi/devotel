import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/repository/user.repository';
import { LoginDto } from './dto/auth.dto';
import { FirebaseService } from 'src/config/firebase/firebase.service';

@Injectable()
export class AuthService {
    constructor(private readonly userRepo: UserRepository, private readonly firebaseService: FirebaseService) { }
    async login(data: LoginDto) {
        try {
            const user = await this.userRepo.findByUserAndPass(data)
            const token = this.firebaseService.createCustomToken(user.id, { userId: user.id })
            return token
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error
            }
            throw new InternalServerErrorException("something went wrong!")
        }
    }
}
