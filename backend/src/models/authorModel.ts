// Importamos Schema y model desde Mongoose
import { Schema, model } from "mongoose";
// Importamos la interfaz IAuthor
import { IAuthor } from "../types/authorTypes";

// Definimos el esquema para autores
const authorSchema = new Schema<IAuthor>({
  firstName: {type:String, required: true, trim: true, maxlength: 50},
  lastName:{type:String, required: true, trim: true, maxlength: 50},
}, {timestamps:true, versionKey:false})

// Creamos el modelo de Mongoose para el esquema definido
const AuthorModel = model<IAuthor>("AuthorSchema", authorSchema)

// Exportamos el modelo para usarlo en controladores
export { AuthorModel }
