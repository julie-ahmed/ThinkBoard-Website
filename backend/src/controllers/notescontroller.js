/*
export const getallnotes=(req,res)=>{
res.send("you got 5 notes")
};
*/

//or
import Note from "../models/Note.js";

//we use postman to check our functions and api is working or not

export async function  getallnotes(req,res){ //we can change req for _ instead bec its not used
    
try{
    const notes = await Note.find().sort({ createdAt: -1 }); //sorted by the newest first
res.status(200).json(notes);//this will send the notes as a json response to the client with a status code of 200 which means success

} catch(error){
    //for debugging purposes
    console.error("Error in getallnotes controller",error);
    res.status(500).json({message :"internal server error"})

}

};
export async function  createnote(req,res){
    try{
        const {title,content} = req.body //this will get the title and content from the request body
        // //console.log(title,content)

        
        const note = new Note({title,content}) //this will create a new note with the title and content from the request body 
        const savednote = await note.save() //this will save the new note to the database
        res.status(201).json(savednote)




        // const newnote = new Note({title,content}) //this will create a new note with the title and content from the request body 
        // await newnote.save() //this will save the new note to the database
        // res.status(201).json({message:"note created successfully"})
    }
    catch (error) {
        console.error("Error in createnote controller", error);
        res.status(500).json({ message: "internal server error" })

    
    }
};
export async function  updatenote(req,res){

    try{
        const {title,content} = req.body
        const updatednote = await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true});
        //the {new:true} by default findByIdAndUpdate returns the old document before the update, but if you set new:true it will return the updated document after the update

        //req.params.id or ID or Id should match how you wrote it in the route in the notesroutes.js file
        //this tells me which note to update by its id and which fields to update with the new title and content from the request body

        if(!updatednote) return res.status(404).json({message:"note not found"})
            //this will check if the note with the given id exists in the database if not it will return a 404 error with a message "note not found"
        
        res.status(200).json({updatednote});
}
    catch (error) {

        console.error("Error in updatenote controller", error);
        res.status(500).json({ message: "internal server error" })

    }


};
export async function  deletenote(req,res){

    try{

        const { title, content } = req.body
        const theReqNote={title,content}
        const deletednote = await Note.findByIdAndDelete(req.params.id);
        if (!deletednote) return res.status(404).json({ message: "note not found" })

        res.status(200).json({theReqNote,message:"note deleted successfully"});
        
        //another way 
        // const deletednote = await Note.findByIdAndDelete(req.params.id);
        // the if statment as it is 
        // res.status(200).json(deletednote)
    }
    catch{
        
        console.error("Error in deletenote controller", error);
        res.status(500).json({ message: "internal server error" })

    }

};


export async function getnotebyid(req, res) {

    try {
        
        const note = await Note.findById(req.params.id) 
        

        if (!note) return res.status(404).json({ message: "note not found" })

        res.status(200).json({ note });
    }
    catch (error) {

        console.error("Error in updatenote controller", error);
        res.status(500).json({ message: "internal server error" })

    }


};