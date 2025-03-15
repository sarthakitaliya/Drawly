import { useUserStore } from "@repo/store";
import { SiExcalidraw } from "react-icons/si";
import Image from "next/image";

export default function Navbar() {
  const { user } = useUserStore();
  return (
    <div className="w-full border-b-[0.5px] border-opacity-10 border-gray-300 p-4 flex justify-between items-center px-8 md:px-14 py-5">
      <div className="flex justify-center items-center gap-5 text-white">
        <div className="size-10 bg-amber-50 rounded-xl flex items-center justify-center">
          <SiExcalidraw size={23} color="blue" />
        </div>
        <h1 className="text-2xl">Drawly</h1>
      </div>

      <div>
        {user && (
          <Image
            src={`${user?.photo}`}
            width={30}
            height={30}
            alt="U"
            className="rounded-full cursor-pointer hover:ring ring-white"
          ></Image>
        )}
      </div>
    </div>
  );
}
