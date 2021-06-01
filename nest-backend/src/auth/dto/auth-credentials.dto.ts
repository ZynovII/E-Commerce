import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRoles } from 'src/auth/user/models/UserRoles';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty({ example: 'Nick', description: 'First Name' })
  firstName: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty({ example: 'Smith', description: 'Last Name' })
  lastName: string;

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

  @IsEnum(UserRoles)
  @ApiProperty({ example: 'ADMIN', description: 'User Role' })
  role: UserRoles;

  @ApiProperty({ example: '???', description: 'Avatar img' })
  avatar: string;

  @IsBoolean()
  @ApiProperty({ example: 'true', description: 'Is notifications allowed' })
  allowNotification: boolean;
}
