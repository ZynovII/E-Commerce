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
  firstName: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  lastName: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(32)
  @Matches(
    /((?=.*\d)|(?=.*W+))(?![.\n])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).*$/,
    {
      message: 'The password is too weak',
    },
  )
  password: string;

  @IsEnum(UserRoles)
  role: UserRoles;

  avatar: string;

  @IsBoolean()
  allowNotification: boolean;
}
