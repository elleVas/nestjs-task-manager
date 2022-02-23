import { Body, Controller, Post, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Controller('auth')
export class AuthController {
    private logger = new Logger('AuthController', {timestamp: true});
    constructor(
        private authService: AuthService) { }

    @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        this.logger.verbose(`User  "${authCredentialsDto.username}", try to singUp`);
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body() loginCredentialsDto: LoginCredentialsDto
    ): Promise<{ accessToken: string }> {
        this.logger.verbose(`User  "${loginCredentialsDto.username}", try to singIn`);
        return this.authService.signIn(loginCredentialsDto);
    }
}
