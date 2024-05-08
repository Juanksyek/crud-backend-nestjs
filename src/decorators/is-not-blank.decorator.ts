import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsNotBlank(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            name: 'isNotBlank', // Nombre del decorador
            target: object.constructor, // Clase a la que se aplica el decorador
            propertyName: propertyName, // Propiedad del objeto a validar
            options: validationOptions, // Opciones de validación
            validator: {
                validate(value: any) {
                    // Validar que el valor sea una cadena de texto no vacía
                    if (typeof value !== 'string') return false; // No es una cadena
                    const valueTrimmed = value.trim(); // Eliminar espacios en blanco al principio y al final
                    return valueTrimmed !== ''; // Devolver true si la cadena no está vacía
                },
            },
        });
    };
}
