"use client"
import { useLoadingStore } from "@repo/store";
import { Loader } from "lucide-react";

interface popupModel {
  isOpen: boolean;
  title: string;
  subTitle?: string;
  setInputText: (value: string) => void;
  inputText: string;
  mode?: string;
  onClose: () => void;
  onConfirm?: () => void;
}

export default function Popup({
  isOpen,
  title,
  subTitle,
  setInputText,
  inputText,
  mode,
  onClose,
  onConfirm,
}: popupModel) {

  const {loading} = useLoadingStore();
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#050608ab] flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#0F141F] p-6 border-2 border-[#344256] rounded-2xl w-xl flex flex-col gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h2 className="text-white text-xl font-semibold">{title}</h2>
          <p className="text-[#9CA3AF]">{subTitle}</p>
        </div>
        <div>
            {
                mode === "create" && <h1 className="text-white">Enter Document name: </h1> ||
                mode === "collaborate" && <h1 className="text-white">Enter Document name: </h1> ||
                mode === "join" && <h1 className="text-white">Enter Room ID: </h1>
            }
          <input
            type="text"
            placeholder="Type here..."
            className="w-full bg-[#1A1F2B] text-white p-2 mt-4 rounded-md border-[#344256] border-2"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />    
        </div>

        <div className="flex justify-end gap-3 text-white">
          <button
            onClick={onClose}
            className="bg-[#0F141F] px-4 py-2 border rounded-[12px] cursor-pointer hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#158AFF] px-4 py-2 rounded-[12px] cursor-pointer hover:opacity-85"
          >
            {loading ? <Loader className="animate-spin "/> : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
