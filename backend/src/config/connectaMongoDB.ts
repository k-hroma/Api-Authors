// Importamos la función 'connect' y el tipo 'ConnectOptions' desde Mongoose
import { connect, ConnectOptions } from "mongoose";

// Importamos y configuramos dotenv para manejar variables de entorno
import dotenv from 'dotenv';
dotenv.config();

// Definimos un tipo para representar el resultado de la conexión
type ConnectionResult = {
  success: boolean;
  message: string;
};

// Función asincrónica para conectar a MongoDB
const connectMongoDB = async (): Promise<ConnectionResult> => {
  // Obtenemos la URI de la base de datos desde las variables de entorno
  const URI_DB = process.env.URI_DB?.trim();

  // Verificamos si la URI está definida
  if (!URI_DB) {
    const errorMsg = "MongoDB connection string missing or empty";
    console.error(errorMsg);
    return {
      success: false,
      message: errorMsg
    };
  }

  try {
    // Definimos las opciones de conexión para Mongoose
    const options: ConnectOptions = {
      serverSelectionTimeoutMS: 5000, // Tiempo máximo para seleccionar un servidor
      autoIndex: true,                // Habilita la creación automática de índices
      maxPoolSize: 10                 // Tamaño máximo del pool de conexiones
    };

    // Intentamos conectar a la base de datos
    await connect(URI_DB, options);
    return {
      success: true,
      message: "Successful connection"
    };

  } catch (error) {
    // Capturamos y manejamos cualquier error durante la conexión
    const errorMessage = error instanceof Error ? error.message : "Unknown database connection error";
    console.error(`MongoDB connection failed: ${errorMessage}`);
    return {
      success: false,
      message: `Connection failed: ${errorMessage}`
    };
  }
};

// Exportamos la función de conexión para su uso en otras partes de la aplicación
export { connectMongoDB };
