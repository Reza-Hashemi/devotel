import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseModule } from 'src/config/firebase/firebase.module';
import { RepositoriesModule } from 'src/repository/repository.module';

@Module({
  imports: [FirebaseModule, RepositoriesModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
