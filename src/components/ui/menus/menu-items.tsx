import { CardButton } from "@/components/icons/card-button-icon";
import { DialogButton } from "../dialog-button";
import { useSession } from "next-auth/react";

export const MenuItem = () => {
  const session = useSession();
  const status = session.status;
  return (
    <div>
      <div className="bg-slate-200 rounded-lg text-cente p-4 flex items-center justify-center flex-col shadow-md hover:-translate-y-4 duration-300 transition-all">
        <div className="">
          <img
            src="/Modified.png"
            alt="logo"
            className="rounded-full max-h-20 shadow-md"
          />
        </div>

        <h4 className="font-semibold my-2 text-xl">Tomate</h4>
        <p className="text-gray-600 text-sm">
          {" "}
          Lorem ipsum dolor, sit amet consectetur <br /> adipisicing elit.
        </p>

        { status === 'unauthenticated' ? (
         <DialogButton />)
         : ''
        }
      </div>
    </div>
  );
};


