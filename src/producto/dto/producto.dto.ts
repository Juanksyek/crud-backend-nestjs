import { IsNotEmpty, IsNumber, IsPositive} from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class ProductoDto{

    @IsNotBlank({message: 'El nombre no puede estar vacio padrino'})
    nombre?: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive({message: 'El precio debe ser positivo :)'})
    precio?: number;
}