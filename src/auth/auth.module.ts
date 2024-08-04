import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[User,UsersModule,JwtModule.register({
    global:true,
    secret:jwtConstants.secret,
    signOptions:{expiresIn:'60s'},
  })],exports:[AuthService]
})
export class AuthModule {
  
}
