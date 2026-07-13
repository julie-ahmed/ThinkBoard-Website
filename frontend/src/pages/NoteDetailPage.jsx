import { ArrowLeftIcon, LoaderIcon, PenSquareIcon, Trash2Icon } from 'lucide-react';
{/*import {arrow-left} from 'lucide-react';*/ }
import React from 'react';
import { formatDate } from '../lib/utils';
import { Link , useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from "react-hot-toast";
import api from "../lib/axios";
import { useLocation, useParams } from "react-router-dom";
import {useEffect} from "react";


const NoteDetailPage = () => {


  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const {id} = useParams();

  

  console.log(id);       

  useEffect(()=>{
    const fetchNote=async()=>{
      try{
        const res = await api.get(`/notes/${id}`)
                setNote(res.data.note);
                console.log(res.data);
                 
      }
      catch(error){
        console.error("Error fetching the note :", error);
        toast.error("failed to fetch the note");
      }
      finally{
        setLoading(false)
      }    
    
    }

    fetchNote();
  },[id])
  console.log({note})

  const handleDelete = async () => {
    if (!window.confirm("are you sure you want to delete this note?")) return;
    try {
                await api.delete(`/notes/${id}`);

                toast.success("note deleted successfully");
                // await api.get("/notes")
                navigate("/")
            }
            catch (error) {
                console.log("error deleting note", error);
                toast.error("failed to delete note");
            }
    
    };
  const handleSave = async()=>{
    if (! note.title.trim() || ! note.content.trim()) { 
          {/*trim will prevent notes with only spaces too */}
          toast.error("please add title and content");
          return;
        }
    setSaving(true)
    try{
      await api.put(`/notes/${id}`,note) //
      toast.success("note updated successfully")
      navigate("/");
    }
    catch(error){
      console.log("error saving note",error);
      toast.error("failed to update note");
    }
    finally{
      setSaving(false)//
    }
  };

  if(loading){
     return(
       <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10'/>
        
      </div>
     );

  }

return(
  <div className="min-h-screen bg-base-400">
    <div className='container mx-auto px-4 py-8 '>
      <div className='mx-auto max-w-2xl'>
       <div className='flex items-center justify-between mb-6'>
        
                <Link to="/" className="btn btn-ghost">
                  <ArrowLeftIcon className="h-5 w-5" />
                  Back to Notes
                </Link>
                 <button className="btn  btn-error  btn-outline" onClick={handleDelete}>
                     <Trash2Icon className="h-5 w-5"/>
                     Delete Note
                 </button>
       </div>
       <div className="card bg-base-100">
        <div className='card-body'>
            <div className='form-control mb-4'>
              <label className='label'>
                <span className='label-text '>Title</span>
              </label>
              <input
                type='text'
                placeholder={note.title}
                className='input input-bordered'
                value={note.title}
                onChange={(e) => setNote({...note, title:e.target.value})}
              />
            </div>
            <div>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text '>content</span>
                </label>
                <textarea
                  placeholder={note.content}
                  className='textarea textarea-bordered h-32'
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                  />
              </div>
              <div className='card-actions justify-end'>
                <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                  {saving ? "saving...":"save changes"}

                </button>
              </div>

            </div>
        </div>
       </div>
      </div>
    </div>
  </div>
)







        

















//   
//   const navigate = useNavigate(); //useNavigate is a hook that allows us to navigate to different pages programmatically

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//    {/*if you want it to not refresh automatically when u submit one note */}
    
//     if (!title.trim() || !content.trim()) { 
//       {/*trim will prevent notes with only spaces too */}
//       toast.error("all fields are required");
//       return;
//     }

//     setLoading(true);
//      try{
//       await api.put("/notes/${noteid}", { title, content })
//       toast.success("note edited successfully")
//       navigate("/"); //navigate to homepage after creating a note
//      }
//      catch(error){
//       console.log("error editng note",error);
//        toast.error("failed to edit note");
//       if(error.response.status==429){
//         toast.error("slow down! you are editing too much notes in too much fast pace",{
//           duration:4000,
//           icon:"💀",
//         });

//       }else{
//       toast.error("failed to edit note");
//       }
//     }
//      finally{
//       setLoading(false);
//      }

//   };


//   return (
//   <div className="min-h-screen bg-base-400">
//     <div className='container mx-auto px-4 py-8 '>
//       <div className='max-w-2xl  mx-auto'>
        
//         <Link to="/" className="btn mb-6 btn-ghost">
//           <ArrowLeftIcon className="size-5" />
//           Back to Notes
//         </Link>


//         <div className='card bg-base-100'>
//           <div className='card-body'>
//             <h2 className='card-title text-2xl mb-4 text-based-content'>{title} </h2>

//             <form onSubmit={handleSubmit}> {/* when submit we'll call handleSubmit function */}
              // <div className='form-control mb-4'>
              //   <label className='label'>
              //     <span className='label-text '>Title</span>
              //   </label>
              //   <input
              //     type='text'
              //     placeholder={title}
              //     className='input input-bordered'
              //     value={title}
              //     onChange={(e) => setTitle(e.target.value)}
              //   />
              // </div>

//               <div className='form-control mb-4'>
//                 <label className='label'>
//                   <span className='label-text '>content</span>
//                 </label>
//                 <textarea
//                   placeholder={content}
//                   className='textarea textarea-bordered h-32'
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                 />
//               </div>

//               <div className='card-actions justify-end'> {/*justify-end will align the button to the right*/}
//                 <button type="submit" className="btn btn-primary" disabled={loading}>
//                   {loading ? "Saving..." : "Save Note"}
//                 </button>
//               </div>
//             </form>

//           </div>
//         </div>

//       </div>
//     </div>
//   </div>);





 };
export default NoteDetailPage;




