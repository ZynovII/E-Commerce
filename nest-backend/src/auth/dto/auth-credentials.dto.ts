import { IsEmail, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail()
  email: string;

  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, {
    message: 'password is incorrect',
  })
  password: string;
}
