import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { LayoutThemes } from './models/LayoutThemes';
import { SignInDto } from '../dto/sign-in.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      allowNotification,
      avatar,
    } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      firstName,
      lastName,
      role,
      email,
      password: hashedPassword,
      allowNotification,
      avatar,
      theme: LayoutThemes.LIGHT,
    });

    try {
      await this.save(user);
    } catch (err) {
      if (err.code === '23505') {
        //duplicate user
        throw new ConflictException('User with that email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return user.email;
  }

  async validatePassword(signInDto: SignInDto): Promise<string> {
    const { email, password } = signInDto;
    const user = await this.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user.email;
    } else {
      return null;
    }
  }
}
