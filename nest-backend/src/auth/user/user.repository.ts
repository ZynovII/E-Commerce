import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { email, password } = authCredentialsDto;

    const user = new User();
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (err) {
      if (err.code === '23505') {
        //duplicate user
        throw new ConflictException('User with that email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validatePassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({ email });
    if (user && (await user.validatePassword(password))) {
      return user.email;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
