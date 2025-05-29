import { connectMongoDB } from "./config/connectaMongoDB";
import { Schema, model } from "mongoose";
import express, { Response, Request, NextFunction } from 'express';

// 1. Definición de interfaces===================================================================
interface IAuthor { 
  firstName: string,
  lastName: string,
}

interface QueryResponse { 
  success: boolean,
  message: string,
  data?: IAuthor | IAuthor[] | null,
  error?: string | null
}

// 2. Configuración de Express ==================================================================
const PORT = process.env.PORT || 3000
// Creación de la app
const app = express()

// 3. Modelo Mongoose ===========================================================================
const authorSchema = new Schema<IAuthor>({
  firstName: {type:String, required: true, trim: true, maxlength: 50},
  lastName:{type:String, required: true, trim: true, maxlength: 50},
}, {timestamps:true, versionKey:false})

const AuthorModel = model<IAuthor>("AuthorSchema", authorSchema )

// 4. Middleware para conexión JSON =============================================================
app.use(express.json());

// 5. Controladores =============================================================================
const getAuthors =  async (req: Request, resp: Response<QueryResponse>):Promise<any> => {
  try {
    const authors = await AuthorModel.find()
    return resp.status(200).json({
      success: true, 
      message: authors.length > 0 ? "Authors retrieved" : "No authors found",
      data: authors
    })
    
  } catch (error:unknown) {
    const errMessage = error instanceof Error ? error.message :"Unknow Error"
    return resp.status(500).json({
      success: false,
      message: "Failed to retrieve authors",
      error: errMessage
    })
    }
}
 
const createAuthor = async (req: Request, resp: Response<QueryResponse>): Promise<any> => { 
  try {
    const { lastName, firstName } = req.body
    if (!lastName || !lastName) { 
      return resp.status(400).json({
        success: false,
        message: "First Name and Last Name are required"
      });
    };
    const newAuthor = new AuthorModel({ lastName, firstName })
    await newAuthor.save()
    return resp.status(201).json({
      success: true,
      message: "Author created successfully",
      data: newAuthor
    })


   } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown Error"
    return resp.status(500).json({
      success: false,
      message: "Failed to create author",
      error: errMessage
    })
   }
}

const updateAuthor = async (req: Request, resp: Response): Promise<any> => {
  
  try {
    const { id } = req.params
    const { lastName, firstName } = req.body;
    const updatedAuthor = await AuthorModel.findByIdAndUpdate(id, { lastName, firstName }, { new: true })
    if (!updatedAuthor) { 
      return resp.status(404).json({
        success: false,
        message:`Author ID: ${id} not found`
      })
    }
    return resp.status(200).json({
      success: true,
      message: `Author ID: ${id}, updated successfully`,
      data: updatedAuthor
    })
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error"
    return resp.status(500).json({
      success: false,
      message: `Failed to update author`,
      error: errMessage
    })
  }
};

const deleteAuthor = async (req: Request, resp: Response): Promise<any> => { 
  try { 
    const { id } = req.params
    const deletedAuthor = await AuthorModel.findByIdAndDelete(id)
    if (!deletedAuthor) {
      return resp.status(404).json({
        success: false,
        message:`Author ID: ${id} not found`
      })
     }
    return resp.status(200).json({
      success: true,
      message: "Author deleted successfully",
      data:deletedAuthor,
    })
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error"
    return resp.status(500).json({
      success: false, 
      message: "Failed to delete author",
      error:errMessage
    })
   }
}
// 6. Rutas =====================================================================================

app.get("/api/authors", getAuthors)
app.post("/api/authors", createAuthor)
app.patch("/api/authors/:id", updateAuthor)
app.delete("/api/authors/:id", deleteAuthor)



// 7. Inicio del servidor ======================================================================
const startServer = async () => {
  try {
    await connectMongoDB();
    console.log('📦 Connected to MongoDB successfully')
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🔗 http://localhost:${PORT}/api/authors`);
    });
  } catch (error:unknown) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    console.error(`❌ Fatal startup error: ${errMessage}`);
    process.exit(1);
  };
};
startServer()


