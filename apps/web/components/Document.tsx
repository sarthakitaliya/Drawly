import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Member = {
  user: {
    name: string;
    image: string;
  };
};

export default function Document({
  documentId,
  name,
  created,
  author,
  members,
  onClick,
  onRename,
  onDelete,
}: {
  documentId: string;
  name: string;
  created: string;
  author: string;
  members: Member[];
  onClick: () => void;
  onRename: (documentId: string, newName: string) => void;
  onDelete: (documentId: string) => void;
}) {
  const visibleMembers = members.slice(0, 3);
  const remainingCount = members.length - visibleMembers.length;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName !== name && newName.trim()) {
      onRename(documentId, newName);
    }
    setIsRenaming(false);
    setNewName("");
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    await onDelete(documentId);
  };
  const handleRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    setIsRenaming(true);
  };
  return (
    <div
      className="w-full flex justify-between items-center p-7 border-b-[0.5px] bg-[#101827] border-[#1F2937] text-white cursor-pointer hover:bg-[#1A1F2B] group min-h-[80px]"
      onClick={onClick}
      onMouseLeave={() => {
        setIsMenuOpen(false);
      }}
    >
      <div className="flex-4">
        {isRenaming ? (
          <form
            onSubmit={handleRenameSubmit}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="bg-[#1A1F2B] border border-gray-700 rounded px-2 py-1 w-full"
              autoFocus
              onBlur={handleRenameSubmit}
            />
          </form>
        ) : (
          name
        )}
      </div>
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
      <div className="flex-1 flex justify-end">
        <div className="invisible group-hover:visible">
          <button
            className="cursor-pointer relative"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <EllipsisVertical size={20} />
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1A1F2B] rounded-md shadow-lg z-10 border border-gray-700">
                <div className="py-1">
                  <div
                    onClick={handleRename}
                    className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-[#2D3748]"
                  >
                    <Pencil size={16} className="mr-2" />
                    Rename
                  </div>
                  <div
                    onClick={handleDelete}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-[#2D3748]"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Delete
                  </div>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
