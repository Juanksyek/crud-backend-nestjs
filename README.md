# CRUD con Nestjs, Angular y JWT

##Instrucciones de uso y notas

## Desarrollo
- Para el desarrollo de backend untilicé TypeScript y variables de entorno, así como Nestjs.
- Tambien utilicé el package de JWT para las autenticaciones y autorizaciones en los inicios de sesion y usuarios.
- Para los templates tambien utilicé los componentes de creacion de nest como lo es ng.

## Ejecución.
__Importante__ seguir las instrucciones:
1. Primero hay que crear el archivo `.env`, para esto hay un `sample` dentro del proyecto:
  ```
      SERVER_PORT=3000

      DB_HOST=localhost
      DB_PORT=3306
      DB_DATABASE=crud_nest
      DB_USER=root
      DB_PASSWORD=

      JWT_SECRET=secret
```
2. Posterior, hay que abrir los servicios de `XAMPP`, si no esta descargado el servicio, favor de instalarlo.
3. Hay que abrir el servicio para MySQL y abrir el admin.
4. Seguido hay importar la base de datos, la cual se puede encontrar en la carpeta `database` hay que descargarla como archivo.
  - Para importar la BD correctamente, primero se debe crear la `BD` con el nombre `crud_nest`.
  - Una vez creada la BD, hay que importarla estando dentro de la `BD` creada.
  - Si todo se realizo correctamente, aparecerá un mensaje con el ajuste de tablas y datos existentes.
5. En la carpeta `crud-backend-nestjs` hay que abrir una terminal para instalar las dependencias de npm y nest.
6. Instalar dependencias de npm utilizando `npm i`
7. Instalar las dependencias de nest utilizando `npm i @nestjs`
8. Instalar dependencias de nest y modules utilizando `npm i @nestjs/common` y `npm i @nestjs/config`
9. Como último paso, para ejecutar el backend hay que utilizar `npm run start:dev`

Hasta aquí hay que dejar ejecutando la terminal para que el frontend pueda mostrar correctamente los datos, el resto de instrucciones están en el repositorio de crud-frontend-nest.
