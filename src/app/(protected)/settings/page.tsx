'use client';

// import { signOut } from '../../../../auth';
import { UseCurrentUser } from '../../../../hooks/use-current-user';
import { signOut } from 'next-auth/react';
import { ExitIcon } from '@radix-ui/react-icons';
// import { LogoutButton } from '@/components/ui/logout-button';


 function ProfilePage() {
  const user = UseCurrentUser();

  const onClick = () => {
     signOut();
  }

  return (
    <div className='text-center mt-32'>

      <h2 className='text-4xl text-green-500 font-semibold'>Settings Page</h2>

      <div className='mt-4'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisicum rerum at.
        Mollitia officiis expedita fugit sit provident dignissimos placeat voluptate nostrum asperiores,
        reiciendis nobis harum et delectus enim cupiditate voluptatibus veritatis! Totam quisquam magnam
        commodi tenetur placeat corporis.
      </div>

      <div className=' mt-10'>
        {JSON.stringify(user?.name)}
      
        

          <button onClick={onClick} type='submit' className=' bg-slate-300 px-4 py-2 shadow-md mx-auto mt-4 text-black cursor-pointer text-sm rounded flex items-center justify-center h-full w-[150px]'>
          <ExitIcon className=' h-4 w-4 mr-2' />
            Sign-out
          </button>

        

      </div>


    </div>



  )
}

export default ProfilePage;