# API de Autores

Este es un proyecto de backend desarrollado con **Node.js**, **Express** y **MongoDB**, que implementa una API REST para la gestión de autores. La aplicación permite crear, leer, actualizar y eliminar registros de autores, y puede integrarse fácilmente con un frontend desarrollado, por ejemplo, en React.

## Características

- Crear nuevos autores
- Listar todos los autores registrados
- Editar información de un autor
- Eliminar autores
- Documentación clara del uso de la API
- Middleware de validación y manejo de errores
- Arquitectura organizada con rutas, controladores y modelos separados

## Tecnologías utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [cors](https://www.npmjs.com/package/cors)
- [nodemon](https://www.npmjs.com/package/nodemon) (entorno de desarrollo)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/k-hroma/Api-Authors.git
   cd Api-Authors
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/authorsdb
   ```

   Asegúrate de que tu base de datos MongoDB esté corriendo localmente o cambia la URI por la de tu servidor.

4. Ejecuta el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

   O en modo producción:

   ```bash
   npm start
   ```

## Endpoints disponibles

| Método | Ruta              | Descripción              |
|--------|-------------------|--------------------------|
| GET    | /api/authors      | Lista todos los autores |
| GET    | /api/authors/:id  | Obtiene un autor por ID |
| POST   | /api/authors      | Crea un nuevo autor     |
| PATCH  | /api/authors/:id  | Edita un autor existente |
| DELETE | /api/authors/:id  | Elimina un autor         |

## Estructura del proyecto

```
Api-Authors/
├── controllers/
│   └── author.controller.js
├── models/
│   └── author.model.js
├── routes/
│   └── author.routes.js
├── .env
├── app.js
├── package.json
└── README.md
```

## Próximas mejoras

- Validación de datos con Joi o Zod
- Autenticación de usuarios
- Test unitarios y de integración
- Despliegue en producción (Render, Vercel o Railway)

## Autor

Desarrollado por [k-hroma](https://github.com/k-hroma)

---

> Este proyecto forma parte de mi portfolio como desarrollador Full Stack. ¡Todo feedback es bienvenido!
