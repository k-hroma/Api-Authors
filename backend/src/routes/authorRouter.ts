// 6. Rutas 
import { Router } from "express";
import { getAuthors, createAuthor, updateAuthor, deleteAuthor } from "../controllers/authorController";

const authorRouter = Router()


authorRouter.get("/", getAuthors)
authorRouter.post("/", createAuthor)
authorRouter.patch("/:id", updateAuthor)
authorRouter.delete("/:id", deleteAuthor)

export {authorRouter}