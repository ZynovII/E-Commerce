import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Creating user' })
  @ApiResponse({ status: 201, type: '' })
  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: '{accessToken: klsgbsdj3095sba}' })
  @Post('/signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
