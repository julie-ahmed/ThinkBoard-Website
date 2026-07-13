import { PenSquareIcon , Trash2Icon} from 'lucide-react';
import React from 'react';
import {formatDate} from '../lib/utils';
import { Link } from 'react-router-dom';
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const NoteCard = ({ note,setNotes }) => {
    
    const navigate=useNavigate();
    
    const handleEdit = async(e,Title,content,_id) =>{
        e.preventDefault();
        try{
            navigate(`/notes/${_id}`,{
                state: {
                    title:Title,
                    content:content,
                },
            });
            
        }
        catch(error){
            console.log(error)
        }

    }   
     

    const handleDelete = async (e, id) => {
        e.preventDefault(); //prevent the default behavior of the link ehich is to navigate to the note page when we click on the delete button because its inside the link element

        if (!window.confirm("are you sure you want to delete this note?")) {
            return;
        }
        try {
            await api.delete(`/notes/${id}`);
            setNotes(prevNotes => prevNotes.filter(note => note._id !== id));//update the notes state by filtering out the deleted note
            toast.success("note deleted successfully");
            // await api.get("/notes")
        }
        catch (error) {
            console.log("error deleting note", error);
            toast.error("failed to delete note");
        }

    };

  return( 
    
    <Link to={`/notes/${note._id}`} 
    className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#497c69]">

        <div className="card-body">
            <h3 className="card-title text-based-content ">
                {note.title}
            </h3>
            <p className="text-base-content/70 line-clamp-3">{note.content}</p>
            <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-base-content/60">
                {formatDate(new Date (note.createdAt))}
                </span>
                <div className="flex items-center gap-1">
                      {/* <Link to={"/notes/:id"} className="btn-xs btn-ghost  btn-primary ">*/}

                      <button className="btn btn-xs btn-ghost" onClick={(e) => handleEdit(e,note.title,note.content , note._id)}>
                            <PenSquareIcon className="size-4" />
                          </button>

                      {/* </Link>*/}
                    <button className="btn btn-xs btn-ghost text-error" onClick={(e) => handleDelete(e,note._id)}>
                      <Trash2Icon className="size-4"/>
                    </button>

                </div>
            

            </div>


        </div>
    
    
    
    
    </Link>
    
  );
};

export default NoteCard;
{/*
//text-based-content is used to give the text color based on the theme and //
// bg-base-100 is used to give the background color based on the theme and 
//hover:shadow-lg is used to give the shadow on hover and 
// transition-all is used to give the transition effect and 
// duration-200 is used to give the duration of the transition effect and 
// border-t-4 is used to give the border top width of 4px and 
// border-solid is used to give the border style solid and 
// border-[#00FF9D] is used to give the border color #00FF9D
*/}