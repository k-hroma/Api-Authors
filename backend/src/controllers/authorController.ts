// Controladores
import { QueryResponse } from "../types/authorTypes"
import { AuthorModel } from "../models/authorModel"
import {Request, Response } from 'express'

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

export {getAuthors, createAuthor, updateAuthor, deleteAuthor }
