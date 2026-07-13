import mongoose from "mongoose";

//1-create a schema 
//2-create a model based off that schema 
const noteschema= new mongoose.Schema(
    {
     title : 
        {
           type:String,
           required:true
        }
    ,
     content : 
         {
            type:String,
            required:true
         }

    },
    {
        timestamps:true,
    } //this will automatically add createdAt and updatedAt fields to the schema

);

const Note = mongoose.model("Note",noteschema);

export default Note;