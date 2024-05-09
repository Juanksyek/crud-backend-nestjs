import { RolNombre } from './../rol.enum';
import { IsEnum } from "class-validator";

export class CreateRolDto {

    @IsEnum(RolNombre, {message: 'el rol solo puede ser USER o ADMIN'})
    rolNombre: string;
}