
import React from 'react'
import { auth } from '../../../../auth';

const MenuPage = async () => {
  const session = await auth()

  // const handleChange = () => {

  // }

 

  return (
    <div className='text-center mt-32'>
      <h2 className='text-4xl text-green-500 font-semibold'>Menu Items</h2>


      <div className='mt-4'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi nam cum rerum at.
        Mollitia officiis expedita fugit sit provident dignissimos placeat voluptate nostrum asperiores,
        reiciendis nobis harum et delectus enim cupiditate voluptatibus veritatis! Totam quisquam magnam
        commodi tenetur placeat corporis.
      </div>

      <div className=' mt-10'>
        {JSON.stringify(session?.user.name)}
      </div>



    </div>
  )
}

export default MenuPage;