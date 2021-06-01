import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user/user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const email = await this.userRepository.signUp(authCredentialsDto);

    const payload: JwtPayload = { email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const email = await this.userRepository.validatePassword(signInDto);

    if (!email) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
