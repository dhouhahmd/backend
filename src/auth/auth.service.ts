import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { userLogin } from './userLogin';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log(`Validating user with email: ${email}`);
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      console.log('User not found');
      throw new UnauthorizedException('Invalid email or password');
    }
    
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    console.log(`Password valid: ${isPasswordValid}`);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    
    return user;
  }

  async login(userLogin: userLogin) {
    const user = await this.validateUser(userLogin.email, userLogin.password);
    if (user) {
      const payload = { userId: user.id, role: user.role };
      return {
        userId: user.id,
        access_token: this.jwtService.sign(payload),
        role: user.role,
      };
    }
  }
}
