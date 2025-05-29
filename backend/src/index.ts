import { connectMongoDB } from "./config/connectaMongoDB";
import express from 'express'


interface Author { 
  firstName: string,
  lastName: string,
}

interface QueryResponse { 
  success: boolean,
  message: string,
  data?: Author | Author[] | null,
  error?: string | number | null
}

// Orden lógico: configuración → middleware → rutas → iniciar servidor
const PORT = process.env.PORT || 3000

// Creación de la app
const app = express()
// Middleware para conexión JSON
app.use(express.json());
// Rutas
app.get("", async () => { })
app.post("", async () => { })
app.patch("", async () => { })
app.delete("", async () => { })

// Función asíncrona para manejar conexiones
const startServer = async () => {
  try {
    await connectMongoDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown port connection error";
    console.error(`Fatal startup error: ${errorMessage}`);
    process.exit(1);
  };
};
startServer()


