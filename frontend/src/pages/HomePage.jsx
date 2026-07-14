import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import "@fontsource/pixelify-sans";

import api from "../lib/axios";
import toast from "react-hot-toast";
import NotesNotFound from "../components/NotesNotFound";


const HomePage = () => {
  const [isRatelimited, setIsRatelimited] = useState(false); // Set to true for testing purposes, change to false in production

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false); //true bec as soon as we visit the homepage  we will try to fetch the notes from the backend and we will set loading to false once we have fetched the notes

  //to be able to fetch that we use useEffect
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        {/*//this is how we can do it using axios*/}
        const res = await api.get("/notes")
        console.log(res.data);
        setNotes(res.data);
        setIsRatelimited(false); // Reset rate limit state on successful fetch

        //this is how we can do it by using fetch api

        //const res = await fetch("http://localhost:5001/api/notes")
        //const data = await res.json();
        //console.log(data);
      }   //
      catch (error) {
        console.error("Error fetching notes:", error);
        console.log(error);
        if (error.response?.status === 429) { //? makes it optional incase its a network error not a response error
          setIsRatelimited(true);
        }
        else {
          toast.error("failed to load notes");
        }
      }
      finally {
        setLoading(false);


      }

    }

    fetchNotes();
  }, []);



  return (            //bracet is imp it prevents the error of appearing a plan page
    <div className="min-h-screen">
      <Navbar /> 
{/*       
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1
          className="
              font-['Pixelify_Sans']
              text-[clamp(5rem,15vw,16rem)]
              uppercase
              tracking-[0.2em]
              whitespace-nowrap
              select-none
              text-fuchsia-500/10
            ">
          jules
        </h1>

        <div className="absolute justify-center "> */}
      {/* called navbar component andcomponent must start with a capital */}
      
      {isRatelimited && <RateLimitedUI />} 
      <div className="max-w-7xl mx-auto p-4 mt-6">
        
        {/*mx-auto is used to center the div and p-4 is used to give padding and mt-6 is used to give margin top*/}
       {/*conditions*/} 
        {loading && <div className="text-center text-primary py-60">loading notes .....</div>} {/* text-center is used to center the text and text-primary is used to give primary color to the text and py-10 is used to give padding top and bottom*/}

        {notes.length === 0 && !loading && !isRatelimited && <NotesNotFound />} 

        {notes.length > 0 && !(isRatelimited) && (


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (<NoteCard key={note._id} note={note} setNotes={setNotes} />))}


          </div>


        )}


       </div>
      </div>

    //   </div>
    // </div>
  );
};

export default HomePage;




//usestate is used to store the state of the component and
// useeffect is used to perform side effects in the component like fetching data from an API or updating the DOM.4

//notes.length >0 means
//md:grid-
//lg:grid-