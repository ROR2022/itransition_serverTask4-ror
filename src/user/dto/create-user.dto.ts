import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
//import { listRoles } from 'src/lib/dataGlobal';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  username: string;

  @IsString()
  @MinLength(1)
  password: string;

  @IsEmail({}, { message: 'email must be a valid email' })
  email: string;

  active: boolean;

  avatar: string;

  lastLogin: Date;
}
