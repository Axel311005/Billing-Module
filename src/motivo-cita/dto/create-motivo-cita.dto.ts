import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateMotivoCitaDto {
    @ApiProperty({
        description: 'Descripción del motivo de la cita',
        example: 'Mantenimiento preventivo',
        nullable: false
    })
    @IsString()
    @MinLength(1)
    descripcion: string;
}
