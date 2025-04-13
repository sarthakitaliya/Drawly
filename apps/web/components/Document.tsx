import Image from "next/image";

type Member = {
  user: {
    name: string;
    image: string;
  };
};

export default function Document({
  name,
  created,
  author,
  members,
  onClick,
}: {
  name: string;
  created: string;
  author: string;
  members: Member[];
  onClick: () => void;
}) {
  const visibleMembers = members.slice(0, 3);
  const remainingCount = members.length - visibleMembers.length;

  return (
    <div
      className="w-[80vw] bg-[#101827] flex justify-between items-center p-7 border-b-[0.5px] border-[#1F2937] text-white cursor-pointer"
      onClick={onClick}
    >
      <h1 className="flex-4">{name}</h1>
      <h1 className="flex-2 text-center">{created}</h1>
      <h1 className="flex-1 text-center">{author}</h1>
      <div className="flex-2 text-right">
        <div className="flex justify-end items-center">
          {members.length > 0 ? (
            <>
              {visibleMembers.map((i, index) => (
                <Image
                  key={index}
                  src={i.user.image}
                  width={32}
                  height={32}
                  alt={i.user.name}
                  className="w-8 h-8 rounded-full border-2 border-white"
                  style={{ marginLeft: index === 0 ? 0 : "-10px" }}
                />
              ))}
              {remainingCount > 0 && (
                <div
                  className="w-8 h-8 rounded-full bg-gray-600 border-2 border-white text-xs flex items-center justify-center"
                  style={{ marginLeft: "-10px" }}
                >
                  +{remainingCount}
                </div>
              )}
            </>
          ) : (
            <div className="text-sm text-gray-400 italic">Private</div>
          )}
        </div>
      </div>
    </div>
  );
}