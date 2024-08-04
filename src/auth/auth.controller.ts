import { Body, Controller, Post } from '@nestjs/common';
import { userLogin } from './userLogin';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
        ){}
    @Post('login-auth')
    SignIn(@Body() userLogin:userLogin){
        return this.authService.login(userLogin);

    }

}
