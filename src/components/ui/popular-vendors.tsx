import Image from "next/image";

const categoryItems = [
  {
    id: 1,
    title: "Main Dish",
    des: "(86 dishes)",
    image: <Image src={"/img1.png"} width={75} height={75} alt="logo" />,
  },
];

export const PopularVendors = () => {
  return (
    <>
      <section>
        <div className=" py-10 bg-slate-100 mt-8">
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold my-2 md:leading-snug leading-snug">
              Best Vendors
            </p>

            <h2 className="text-red-500 uppercase tracking-wide font-medium text-lg">
              Choose Us to Order
            </h2>
          </div>

          {/* ---- Categories Cart -----  */}

          <div className="flex flex-col sm:flex-row flex-wrap gap-2 justify-around items-center mt-12 space-y-2">
            {categoryItems.map((item, i) => (
              <div
                key={i}
                className="shadow-lg rounded-md bg-white py-2 px-2 w-60 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all"
              >
                <div className="flex w-full mx-auto items-center justify-center">
                  {/* <Image src={item.image} alt="logo" className='bg-[#C1F1C6] p-5 rounded-full w-32 h-32' /> */}
                  <Image
                    src={"/img1.png"}
                    width={100}
                    height={100}
                    alt="img2"
                  />
                </div>

                <div className="mt-5 space-y-1">
                  <h5>{item.title}</h5>
                  <p>{item.des}</p>
                </div>
              </div>
            ))}
            
            {categoryItems.map((item, i) => (
              <div
                key={i}
                className="shadow-lg rounded-md bg-white py-2 px-2 w-60 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all"
              >
                <div className="flex w-full mx-auto items-center justify-center">
                  {/* <Image src={item.image} alt="logo" className='bg-[#C1F1C6] p-5 rounded-full w-32 h-32' /> */}
                  <Image
                    src={"/img2.png"}
                    width={100}
                    height={100}
                    alt="img2"
                  />
                </div>

                <div className="mt-5 space-y-1">
                  <h5>{item.title}</h5>
                  <p>{item.des}</p>
                </div>
              </div>
            ))}
            
            {categoryItems.map((item, i) => (
              <div
                key={i}
                className="shadow-lg rounded-md bg-white py-2 px-2 w-60 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all"
              >
                <div className="flex w-full mx-auto items-center justify-center">
                  <Image
                    src={"/img3.png"}
                    width={100}
                    height={100}
                    alt="img2"
                  />
                </div>

                <div className="mt-5 space-y-1">
                  <h5>{item.title}</h5>
                  <p>{item.des}</p>
                </div>
              </div>
            ))}
            
          </div>

          {/* <Videobutton /> */}
        </div>
      </section>
    </>
  );
};

