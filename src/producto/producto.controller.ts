import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoDto } from './dto/producto.dto';

@Controller('producto')
export class ProductoController {

    constructor(private readonly productoService: ProductoService) { }

    // Obtener todos los productos
    @Get()
    async getAll() {
        return this.productoService.getAll();
    }

    // Obtener un producto por su ID
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        try {
            return await this.productoService.findById(id);
        } catch (error) {
            throw new NotFoundException('Producto no encontrado');
        }
    }

    // Crear un nuevo producto
    @UsePipes(new ValidationPipe({ whitelist: true })) // Usar Validación de NestJS
    @Post()
    async create(@Body() dto: ProductoDto) {
        try {
            return await this.productoService.create(dto);
        } catch (error) {
            throw new Error('Error al crear el producto: ' + error.message);
        }
    }

    // Actualizar un producto existente
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: ProductoDto) {
        try {
            return await this.productoService.updated(id, dto);
        } catch (error) {
            throw new Error('Error al actualizar el producto: ' + error.message);
        }
    }

    // Eliminar un producto por su ID
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        try {
            return await this.productoService.delete(id);
        } catch (error) {
            throw new Error('Error al eliminar el producto: ' + error.message);
        }
    }
}
