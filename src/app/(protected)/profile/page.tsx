import React from 'react'
import { auth, signOut } from '../../../../auth';


async function ProfilePage() {

  const session = await auth();
  return (
    <div className='text-center mt-32'>

      <h2 className='text-4xl text-green-500 font-semibold'>Profile Page</h2>
      
      <div className='mt-4'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi nam cum rerum at.
        Mollitia officiis expedita fugit sit provident dignissimos placeat voluptate nostrum asperiores,
        reiciendis nobis harum et delectus enim cupiditate voluptatibus veritatis! Totam quisquam magnam
        commodi tenetur placeat corporis.
      </div>
      
      <div className=' mt-10'>

        {JSON.stringify(session)}
        <form className=' mt-6 cursor-pointer' action={async () => {
          'use server'
          await signOut();
        }}>

          <button type='submit' className=' bg-lime-300 px-4 py-2 text-black cursor-pointer text-2xl'>Sign-out</button>

        </form>
      
      </div>
  

    </div>

   

  )
}

export default ProfilePage;