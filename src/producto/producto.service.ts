import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoEntity } from './producto.entity';
import { ProductoRepository } from './producto.repository';
import { ProductoDto } from './dto/producto.dto';
import { DeepPartial } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class ProductoService {
    constructor(
        @InjectRepository(ProductoEntity)
        private readonly productRepository: ProductoRepository
    ) { }

    // Obtener todos los productos
    async getAll(): Promise<ProductoEntity[]> {
        const list = await this.productRepository.find();
        if (!list.length) {
            throw new NotFoundException(new MessageDto('La lista esta vacia'));
        }
        return list;
    }

    // Encontrar un producto por su ID
    async findById(id: number): Promise<ProductoEntity> {
        const producto = await this.productRepository.findOne({ where: { id } });
        if (!producto) {
            throw new NotFoundException(new MessageDto('Producto no encontrado o no existe :('));
        }
        return producto;
    }

    // Encontrar un producto por su nombre
    async findByNombre(nombre: string): Promise<ProductoEntity> {
        const producto = await this.productRepository.findOne({ where: { nombre } });
        return producto;
    }

    // Crear un nuevo producto
    async create(dto: ProductoDto): Promise<any> {
        try {
            const existingProduct = await this.productRepository.findOne({ where: { nombre: dto.nombre } });
            if (existingProduct) {
                throw new ConflictException(new MessageDto('Ya existe un producto con este nombre'));
            }

            const partialEntity: DeepPartial<ProductoEntity> = {
                nombre: dto.nombre,
                precio: dto.precio, // El precio ya es un número, no necesitamos convertirlo
            };

            const producto = this.productRepository.create(partialEntity);
            await this.productRepository.save(producto);
            return new MessageDto(`Producto ${producto.nombre} creado`);
        } catch (error) {
            throw new Error('Error al crear el producto: ' + error.message);
        }
    }

    // Actualizar un producto existente
    async updated(id: number, dto: ProductoDto): Promise<any> {
        const producto = await this.findById(id);

        // Verificar si dto.nombre está presente y no es null o undefined
        if (dto.nombre !== undefined && dto.nombre !== null) {
            producto.nombre = dto.nombre;
        }

        // Verificar si dto.precio está presente y no es null o undefined
        if (dto.precio !== undefined && dto.precio !== null) {
            // Convertir el valor de dto.precio a un número
            const precio = Number(dto.precio);
            if (precio < 0) {
                throw new ConflictException('El precio no puede ser negativo');
            }
            producto.precio = precio;
        }

        await this.productRepository.save(producto);
        return new MessageDto(`Producto ${producto.nombre} actualizado`);
    }

    // Eliminar un producto por su ID
    async delete(id: number): Promise<any> {
        const producto = await this.findById(id);
        await this.productRepository.delete(producto);
        return new MessageDto(`Producto ${producto.nombre} eliminado`);
    }
}
