import React from 'react'
import { Routes,Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import toast from 'react-hot-toast';
import "./index.css";



const App = () => {
  return (
    <div className='relative h-full w-full' > 
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]"/>
      { /*<button onClick={() => toast.success("congrats!")} className='text-red-500 p-4 bg-pink-300'>click me</button>*/ }
      <Routes>
       <Route path="/" element={<HomePage/>} />
       <Route path="/Create" element={<CreatePage/>} />
       <Route path="/notes/:id" element={<NoteDetailPage/>} />
      </Routes>

    </div>
  )
}

export default App





{ /*
  <div data-theme="forest"> //it can still can be detected by tailwindcss althouth we arent putting it now bec we are put it in tailwind.config.js file
//we removed it to make the gradient in th bottom of the page appear 

//
  */}