import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  name: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  last_name: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail()
  email: string;
}
