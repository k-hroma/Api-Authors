// Importamos la función para conectar a MongoDB
import { connectMongoDB } from "./config/connectaMongoDB";
// Importamos la instancia de la aplicación Express
import { app } from "./app";

// Definimos el puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000

// Función que inicia el servidor
const startServer = async () => {
  try {
     // Intentamos conectar a la base de datos
    await connectMongoDB();
    console.log('📦 Connected to MongoDB successfully')
    // Verificamos si la conexión fue exitosa
    if (!connectMongoDB) {
      throw new Error("MongoDB connection failed ");
    }
    // Iniciamos el servidor Express en el puerto especificado
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🔗 http://localhost:${PORT}/api/authors`);
    });
  } catch (error: unknown) {
    // Capturamos y manejamos cualquier error durante el inicio del servidor
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    console.error(`❌ Fatal startup error: ${errMessage}`);
    process.exit(1);
  };
};
// Llamamos a la función para iniciar el servidor
startServer()


