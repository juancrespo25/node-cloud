import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '../../roles/types/role.type';
import { ToLowerCaseDTO } from '../../common/common.decorator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name!: string;

  @IsString()
  @MinLength(3)
  last_name!: string;

  @ToLowerCaseDTO()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password!: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role!: UserRole;
}
