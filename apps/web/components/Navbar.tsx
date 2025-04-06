import { useUserStore } from "@repo/store";
import { SiExcalidraw } from "react-icons/si";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const { user, logoutUser } = useUserStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    signOut({callbackUrl:"/"});
    router.push("/");
  };

  return (
    <div className="w-full border-b-[0.5px] border-opacity-10 border-gray-300 p-4 flex justify-between items-center px-8 md:px-14 py-5">
      <div className="flex justify-center items-center gap-5 text-white">
        <div className="size-10 bg-amber-50 rounded-xl flex items-center justify-center">
          <SiExcalidraw size={23} color="blue" />
        </div>
        <h1 className="text-2xl">Drawly</h1>
      </div>

      <div className="relative">
        {user && (
          <div>
            <Image
              src={`${user?.photo}`}
              width={30}
              height={30}
              alt="U"
              className="rounded-full cursor-pointer hover:ring ring-white"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1A1F2B] rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-2 text-sm text-white border-b border-gray-700">
                  {user.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
                >
                  <span className="flex items-center gap-3 text-red-500 cursor-pointer"><LogOut size={15} color="red"/>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
