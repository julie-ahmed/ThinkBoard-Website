import { NotebookIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';

const NotesNotFound = () => {
  return (
    <div className='flex flex-col items-center py-16 space-y-6 max-w-md mx-auto text-center'> {/*mx-auto is used to center the div*/}
      <div className='bg-primary/10 rounded-full p-8'>
      <NotebookIcon className="size-10 text-primary"/>
      </div>
      <h3 className='text-2xl font-bold'>No Notes yet</h3>
      <p className="text-base-content/70">
         Ready to organize your thoughts? Create your first note to get started on your journey.
      </p>
      <Link to="/create" className="btn btn-primary">
        Create your first Note
      </Link>
    </div>
  );
};

export default NotesNotFound;

{/*diff between text-primary and text-base-content is that text-primary uses the primary color from the theme, while text-base-content uses the default text color from the theme*/}