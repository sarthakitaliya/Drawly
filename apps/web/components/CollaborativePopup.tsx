"use client";

import { useCanvasStore } from "@repo/store";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";

export default function CollabModel({
  setCollaborativeOpen,
}: {
  setCollaborativeOpen: (s: boolean) => void;
}) {
  const { documentID } = useCanvasStore();
  const [copied, setCopied] = useState<string | null>(null);
  const shareURL = `${window.origin}/document/${documentID}`;

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCollaborativeOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setCollaborativeOpen]);

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
      onClick={() => setCollaborativeOpen(false)}
    >
        
      <div
        className="bg-[#232329] text-white rounded-2xl p-6 w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">🎉 Collaboration Enabled</h2>

        <p className="text-sm text-gray-300 mb-6">
          Share this Room ID or Link with others to collaborate in real-time.
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <label className="text-sm font-medium mb-1 block">Room ID</label>
            <div className="flex gap-2 items-center">
              <input
                readOnly
                className="bg-zinc-800 rounded-lg px-3 py-2 w-full text-sm border border-zinc-700"
                value={documentID}
              />
              <button
                onClick={() => copyToClipboard(documentID, "Room ID")}
                className="hover:bg-zinc-700 p-2 rounded-md border border-zinc-600"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
            {copied === "Room ID" && (
              <p className="text-xs text-green-400 mt-1">Copied Room ID!</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Shareable Link</label>
            <div className="flex gap-2 items-center">
              <input
                readOnly
                className="bg-zinc-800 rounded-lg px-3 py-2 w-full text-sm border border-zinc-700"
                value={shareURL}
              />
              <button
                onClick={() => copyToClipboard(shareURL, "Link")}
                className="hover:bg-zinc-700 p-2 rounded-md border border-zinc-600"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
            {copied === "Link" && (
              <p className="text-xs text-green-400 mt-1">Copied Link!</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setCollaborativeOpen(false)}
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}