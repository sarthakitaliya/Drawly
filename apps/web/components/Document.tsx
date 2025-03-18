type member = {
  name: string;
  photo: string;
};
export default function Document({
  name,
  created,
  author,
  members,
  onClick
}: {
  name: string;
  created: string;
  author: string;
  members: any[];
  onClick: () => void;
}) {
  return (
    <div className="w-[80vw]  bg-[#101827] flex justify-between items-center p-7 border-b-[0.5px] border-[#1F2937] text-white cursor-pointer" onClick={onClick}>
      <h1 className="flex-4">{name}</h1>
      <h1 className="flex-2 text-center">{created}</h1>
      <h1 className="flex-1 text-center">{author}</h1>
      <div className="flex-2 text-right">
        <div className="flex justify-end">
          {members.map((index) => (
            <div key={index}>s</div>
          ))}
        </div>
      </div>
    </div>
  );
}
