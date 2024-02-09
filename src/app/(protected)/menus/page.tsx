
import React from 'react';

const MenuPage = async () => {
  // const handleChange = () => {

  // }

  return (
    <div className='text-center mt-32'>
      <h2 className='text-4xl text-green-500 font-semibold'>Menu Items</h2>

      <div className="flex flex-wrap justify-center items-center gap-4 mt-4 mb-4 px-4" >
        {/* ----- All category button -----  */}
        <button className=' font-semibold'

        >
          All
        </button >

        <button className=' font-semibold'

        >
          Salad
        </button>

        <button className=' font-semibold'

        >
          🐟Poissons
        </button>

        <button className=' font-semibold'

        >
          🥬Légumes
        </button>

        <button className=' font-semibold'

        >
          Desserts
        </button>
        <button className=' font-semibold'

        >
          Drinks
        </button>
      </div >

      <div className="flex justify-center items-center mt-3 ">
        <input
          type="text"
          placeholder="Search..."
          // onChange={handleChange}
          className="outline-none pl-4 rounded-md py-2 bg-slate-100 shadow-inner" />
      </div>


      <div className='mt-4'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi nam cum rerum at.
        Mollitia officiis expedita fugit sit provident dignissimos placeat voluptate nostrum asperiores,
        reiciendis nobis harum et delectus enim cupiditate voluptatibus veritatis! Totam quisquam magnam
        commodi tenetur placeat corporis.
      </div>

      <div className=' mt-10 text-center'>
        <h3>Market Express Sanaga</h3>
       
      </div>



    </div>
  )
}

export default MenuPage;