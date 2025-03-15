import { ReactNode } from "react";

export function IconButton({
  icon,
  onClick,
  activated,
  className,
  title,
}: {
  icon: ReactNode;
  onClick: () => void;
  activated?: boolean;
  className?: string;
  title?: string;
}) {
  return (
    <div
      className={`cursor-pointer rounded-lg p-1.5 hover:bg-zinc ${className}  ${
        activated ? "text-white bg-[#48488e]" : "text-zinc-400"
      } `}
      onClick={onClick}
      title={title}
    >
      {icon}
    </div>
  );
}
