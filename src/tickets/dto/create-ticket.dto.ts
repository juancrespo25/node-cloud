import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(15)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  description: string;
}
