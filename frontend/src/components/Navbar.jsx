import React from 'react';
import {Plus} from "lucide-react"; 
import { Link } from "react-router-dom";


const Navbar = () => {
  return <header className = "bg-base-300 border-b border-base-content/10">
     <div className ="mx-auto max-w-6xl p-4">  {/*xl means 6 x large , py means padding y , p-4 padding all directions */  }

         <div className ="flex items-center justify-between">{/*between means the space between the thinkboard text on the left and the right button */}
             <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
                ThinkBoard
            </h1>
            <div className="flex items-center gap-4">
                <Link to ={"/create"} className="btn btn-primary ">
                <Plus className="size-5"/> {/* if h-5 w-5 height \an dweidth is the same value use size */}
                <span className= "text-m font-bold ">New Note</span>
                </Link>
            </div>

         </div>

     </div>


    </header>
};

export default Navbar;   {/*components must be capitalized at start */}