import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  IsOptional,
  IsEmail,
  IsBoolean,
} from 'class-validator';

export class CreateEmpleadoDto {
  @ApiProperty({ description: 'Primer nombre del empleado', example: 'Juan' })
  @IsString()
  @MinLength(1)
  primerNombre: string;

  @ApiProperty({
    description: 'Primer apellido del empleado',
    example: 'Pérez',
  })
  @IsString()
  @MinLength(1)
  primerApellido: string;

  @ApiProperty({ description: 'Número de cédula', example: '1-1234-5678' })
  @IsString()
  @MinLength(5)
  cedula: string;

  @ApiProperty({ description: 'Número de teléfono', example: '+50688887777' })
  @IsString()
  @MinLength(8)
  telefono: string;

  // @ApiProperty({
  //   description: 'Correo electrónico del empleado',
  //   example: 'empleado@empresa.com',
  // })
  // @IsEmail()
  // correo: string;

  @ApiProperty({
    description: 'Dirección física',
    example: 'Managua, Nicaragua',
    required: false,
  })
  @IsString()
  @IsOptional()
  direccion?: string;

  // @ApiProperty({
  //   description: 'Cargo o puesto del empleado',
  //   example: 'Vendedor',
  // })
  // @IsString()
  // @MinLength(2)
  // cargo: string;

  @ApiProperty({
    description: 'Indica si el empleado está activo',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  //   @ApiProperty({
  //     description: 'ID del usuario asociado (User)',
  //     example: 'uuid-1234',
  //     required: false,
  //   })
  //   @IsString()
  //   @IsOptional()
  //   userId?: string;
}
