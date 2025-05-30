// Importamos Express para crear la aplicación
import express from 'express' 
// Importamos CORS para permitir solicitudes desde otros orígenes
import cors from 'cors'
// Importamos el enrutador de autores
import { authorRouter } from './routes/authorRouter';

// Creamos una instancia de la aplicación Express
const app = express()
// Middleware para parsear solicitudes entrantes con cuerpo en formato JSON
app.use(express.json());
// Middleware para habilitar CORS (Cross-Origin Resource Sharing)
app.use(cors())
// Middleware para usar el enrutador de autores en la ruta base /api/authors
app.use("/api/authors", authorRouter)
// Exportamos la instancia de la aplicación para ser usada en el servidor
export { app }