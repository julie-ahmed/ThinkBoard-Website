import { ArrowLeftIcon, PenSquareIcon, Trash2Icon } from 'lucide-react';
{/*import {arrow-left} from 'lucide-react';*/ }
import React from 'react';
import { formatDate } from '../lib/utils';
import { Link , useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from "react-hot-toast";
import api from "../lib/axios";


const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); //useNavigate is a hook that allows us to navigate to different pages programmatically

  const handleSubmit = async (e) => {
    e.preventDefault()
   {/*if you want it to not refresh automatically when u submit one note */}
    
    if (!title.trim() || !content.trim()) { 
      {/*trim will prevent notes with only spaces too */}
      toast.error("all fields are required");
      return;
    }

    setLoading(true);
     try{
      await api.post("/notes", { title, content })
      toast.success("note created successfully")
      navigate("/"); //navigate to homepage after creating a note
     }
     catch(error){
      console.log("error creating note",error);
      if(error.response.status==429){
        toast.error("slow down! you are creating too much notes in too much fast pace",{
          duration:4000,
          icon:"💀",
        });

      }else{
      toast.error("failed to create note");
      }
    }
     finally{
      setLoading(false);
     }

  };

  return (
  <div className="min-h-screen bg-base-400">
    <div className='container mx-auto px-4 py-8 '>
      <div className='max-w-2xl  mx-auto'>
        
        <Link to="/" className="btn mb-6 btn-ghost">
          <ArrowLeftIcon className="size-5" />
          Back to Notes
        </Link>

        <div className='card bg-base-100'>
          <div className='card-body'>
            <h2 className='card-title text-2xl mb-4 text-based-content'>Create New Note</h2>

            <form onSubmit={handleSubmit}> {/* when submit we'll call handleSubmit function */}
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text '>Title</span>
                </label>
                <input
                  type='text'
                  placeholder='Note Title'
                  className='input input-bordered'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text '>content</span>
                </label>
                <textarea
                  placeholder='write Note Content here...'
                  className='textarea textarea-bordered h-32'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className='card-actions justify-end'> {/*justify-end will align the button to the right*/}
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>
            </form>

          </div>
        </div>

      </div>
    </div>
  </div>);

};

export default CreatePage;












