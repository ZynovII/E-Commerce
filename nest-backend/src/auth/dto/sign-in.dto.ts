import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @ApiProperty({ example: 'fake@test.com', description: 'User email' })
  email: string;

  @MinLength(8)
  @MaxLength(32)
  @Matches(
    /((?=.*\d)|(?=.*W+))(?![.\n])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).*$/,
    {
      message: 'The password is too weak',
    },
  )
  @ApiProperty({ example: '1PassWord10', description: 'Password' })
  password: string;
}
