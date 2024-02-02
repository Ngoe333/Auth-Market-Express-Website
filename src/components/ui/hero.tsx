import Image from "next/image";
import {RightIcon} from "@/components/icons/right-icon";
import {VideoIcon} from "@/components/icons/video-icon";
import { DialogVideo } from "@/components/ui/dialog-video";
import Link from "next/link";

export const Hero = () => {
    return (
        <>
            <main>
                {/* Hero Section  */}
                <section className="px-4 text-left md:flex items-center justify-between  mt-10 sm: ">
                    <div className="mt-20 ">
                        <h1 className="mt-12 md:text-5xl text-4xl font-bold  md:leading-snug leading-snug  ">
                            Faites Vous Achats <br /> Au Marché <br />{" "}
                            <span className="text-green-500">Grand-Hangar</span> <br />
                            Sans Vous Deplacez
                        </h1>

                        <p className="mt-4  md:text-1xl">
                            Where Eacch Plate Weaves a Story of Culinary Mastery <br /> and
                            Passionate
                        </p>

                        <div className="gap-10 flex items-center justify-center  lg:justify-start xl:justify-start">
                            <Link href="/menus" className=" flex gap-2 items-center text-white btc px-6 py-2 bg-green-500 rounded-full mt-6 font-semibold border shadow-md">
                                Explore <RightIcon />{" "}
                            </Link>

                           <div>
                            <DialogVideo />
                           </div>
                        </div>
                    </div>

                    <div>
                        <Image
                            src={"/Bg Banner 3.png"}
                            width={600}
                            height={600}
                            alt="hero image"
                        />

                        <div className="flex  gap-6 md:flex-row items-center justify-center -mt-12">
                            <div className="flex rounded-2xl bg-white items-center gap-3 px-3 py-1 shadow-md  w-40 -mt-4 md:-mt-10 ">
                                <div>
                                    <Image
                                        src="/Tomate.png"
                                        width={50}
                                        height={50}
                                        alt="tomate"
                                        className="rounded-2xl"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <h5 className="font-medium mb-1">Tomato</h5>
                                    <div className="rating rating-sm">
                                        <input
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-yellow-500 "
                                            readOnly
                                        />
                                        <input
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-yellow-500"
                                            readOnly
                                            checked
                                        />
                                        <input
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-yellow-500"
                                            readOnly
                                        />
                                        <input
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-yellow-500"
                                            readOnly
                                        />
                                        <input
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-yellow-500"
                                            readOnly
                                        />
                                    </div>
                                    <p className="font-semibold text-blue-950">500 frs</p>
                                </div>
                            </div>

                            <div className="flex  rounded-2xl bg-white items-center gap-3 px-3 py-1 shadow-md w-40 md:-mt-6  ">
                                <div>
                                    <Image
                                        src="/Viande.png"
                                        width={50}
                                        height={50}
                                        alt="viande"
                                        className="rounded-2xl"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <h5 className="font-medium mb-1">1kg</h5>
                                    <div className="rating rating-sm">
                                        <input
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-yellow-500"
                                            readOnly
                                        />
                                        <input
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-yellow-500"
                                            readOnly
                                            checked
                                        />
                                        <input
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-yellow-500"
                                            readOnly
                                        />
                                        <input
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-yellow-500"
                                            readOnly
                                        />
                                        <input
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-yellow-500"
                                            readOnly
                                        />
                                    </div>
                                    <p className="font-semibold text-blue-950">1000 frs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};


