import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        description: 'Email del usuario (único)',
        example: 'usuario@ejemplo.com',
        nullable: false
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'password123',
        nullable: false,
        minLength: 6
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @ApiProperty({
        description: 'Nombre completo del usuario',
        example: 'Juan Pérez',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    fullName: string;

    @ApiProperty({
        description: 'Nombre de usuario',
        example: 'juanperez',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    userName: string;

    @ApiProperty({
        description: 'Estado activo del usuario',
        example: true,
        default: true
    })
    @IsBoolean()
    @IsOptional()
    activo?: boolean;

    @ApiProperty({
        description: 'Roles del usuario',
        example: ['user'],
        default: ['user'],
        type: [String]
    })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    roles?: string[];
}
