import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  fullName: string;

  @ApiProperty({ description: 'ID del cliente', example: 1 })
  @IsInt()
  @IsPositive()
  clienteId?: number;

  @ApiProperty({ description: 'ID del empleado', example: 1 })
  @IsInt()
  @IsPositive()
  empleadoId?: number;
}
