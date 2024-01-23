
import Image from 'next/image';
import {RightIcon} from '@/components/icons/right-icon';

export function OurServices() {
    return (
        <div className="section-container my-16 py-10 px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">

                {/* ------ text ------  */}
                <div className="md:w-1/2">
                    <div className="md:space-y-7 text-center lg:text-left">
                        <p className="text-4xl md:text-5xl font-bold my-2 md:leading-snug">Our Story $ Services</p>

                        <h2 className="text-red-500 uppercase tracking-wide font-medium text-lg">What Our Customers Say About Us</h2>

                        <blockquote className="text-black my-5 leading-[30px]">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error
                            laboriosam nulla sequi fugiat repudiandae odit exercitationem
                            assumenda.
                        </blockquote>

                        <button className="md:flex gap-2 items-center justify-between text-white btc px-6 py-2 bg-green-500 rounded-full mt-6 font-semibold border shadow-md">
                            Explore <RightIcon />
                        </button>
                    </div>
                </div>


                {/* ----- image -----  */}
                <div className="md:w-1/2">

                    <div className="grid  sm:grid-cols-2 grid-cols-2 gap-8 items-center">
                        <div className="shadow-md rounded-sm py-5 px-2 flex flex-col items-center text-center space-y-2 text-green-500 cursor-pointer">
                            <Image src={'/services/icon1.png'} width={30} height={30} alt='' />
                            <h5 className='font-bold pt-3 text-black'>Reservation</h5>
                        </div>

                        <div className="shadow-md rounded-sm py-5 px-4 flex flex-col items-center text-center space-y-2 text-green-500 cursor-pointer">
                            <Image src={'/services/icon2.png'} width={30} height={30} alt='' />
                            <h5 className='font-bold pt-3 text-black'>Delivery</h5>
                        </div>

                        <div className="shadow-md rounded-sm py-5 px-4 flex flex-col items-center text-center space-y-2 text-green-500 cursor-pointer">
                            <Image src={'/services/icon3.png'} width={30} height={30} alt='' />
                            <h5 className='font-bold pt-3 text-black'>Tracking Order</h5>
                        </div>

                        <div className="shadow-md rounded-sm py-5 px-4 flex flex-col items-center text-center space-y-2 text-green-500 cursor-pointer">
                            <Image src={'/services/icon4.png'} width={30} height={30} alt='' />
                            <h5 className='font-bold pt-3 text-black'>Online Order</h5>
                        </div>


                    </div>

                </div>
            </div>
        </div>
    );
}


