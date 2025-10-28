import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsDecimal, IsOptional, IsString } from "class-validator";

export class CreateCajaDto {
    @ApiProperty({
        description: 'Fecha de apertura de la caja',
        example: '2024-01-15T08:00:00.000Z',
        nullable: false
    })
    @IsDateString()
    fechaApertura: string;

    @ApiProperty({
        description: 'Fecha de cierre de la caja',
        example: '2024-01-15T18:00:00.000Z',
        nullable: true
    })
    @IsDateString()
    @IsOptional()
    fechaCierre?: string;

    @ApiProperty({
        description: 'Saldo inicial de la caja',
        example: 1000.00,
        nullable: false
    })
    @IsDecimal()
    saldoInicial: number;

    @ApiProperty({
        description: 'Saldo final de la caja',
        example: 1500.00,
        nullable: true
    })
    @IsDecimal()
    @IsOptional()
    saldoFinal?: number;

    @ApiProperty({
        description: 'Estado de la caja',
        example: 'abierta',
        default: 'abierta',
        nullable: false
    })
    @IsString()
    @IsOptional()
    estado?: string;
}

