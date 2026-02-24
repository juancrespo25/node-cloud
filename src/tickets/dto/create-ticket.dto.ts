import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TicketLevel } from '../type/tickets.type';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(15)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  description!: string;

  @IsEnum(TicketLevel)
  @IsOptional()
  level!: string;
}
