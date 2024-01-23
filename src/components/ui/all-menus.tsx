
import { MenuItem } from "@/components/ui/menus/menu-items";

export const Menu = () => {
    return (
        <div>
            <section className="text-center mt-8 px-4">
         
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold my-2 md:leading-snug leading-snug">
                        Check Our Item
                    </h2>
                    <p className="text-red-500 uppercase tracking-wide font-medium text-lg">
                        {" "}
                        Menus
                    </p>
                </div>

                <div className="flex flex-col justify-center items-center  md:grid grid-cols-3 gap-4 mt-8 lg:grid-cols-5 ">
                    <MenuItem />
                    <MenuItem />
                    <MenuItem />
                    <MenuItem />
                    <MenuItem />     
                </div>
            </section>
        </div>
    );
};


