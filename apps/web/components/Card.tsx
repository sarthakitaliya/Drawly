import { LucideIcon } from "lucide-react";

export default function Card({
  CardIcon,
  onClick,
  title,
}: {
  CardIcon: LucideIcon;
  onClick: () => void;
  title: string;
}) {
  return (
    <div
      className="h-[250px] w-[90vw] md:w-[40vw] text-white bg-[#1A1F2B] flex items-center justify-center rounded-2xl cursor-pointer hover:opacity-85 hover:translate-y-[-5px] hover:shadow-lg transition-all duration-300 ease-out"
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="size-16 flex items-center justify-center rounded-full bg-[#2D3848] p-2">
          <CardIcon size={33} color="#B6B8BE" />
        </div>

        <div className="mt-4 font-semibold">{title}</div>
      </div>
    </div>
  );
}
