
// Definimos la interfaz del autor que usaremos en toda la app
interface IAuthor { 
  firstName: string,
  lastName: string,
}

// Interfaz para las respuestas HTTP del servidor
interface QueryResponse { 
  success: boolean,
  message: string,
  data?: IAuthor | IAuthor[] | null,
  error?: string | null
}

export {IAuthor, QueryResponse }