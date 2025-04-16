"use client";

import { useCanvasStore } from "@repo/store";
import { X, Copy } from "lucide-react";
import { useState } from "react";

export default function Share({
  OnClose,
}: {
  OnClose: () => void;
}) {
  const { isCollaborative, documentID } = useCanvasStore();
  const [copied, setCopied] = useState(false);
  const shareURL = `${window.origin}/share/${documentID}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
      onClick={OnClose}
    >
      <div
        className="bg-[#232329] text-white rounded-2xl p-6 w-full max-w-md shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={OnClose}
          className="absolute top-3 right-4 text-white hover:text-red-400 transition-colors"
        >
          <X size={20} />
        </button>

        {isCollaborative ? (
          <>
            <h2 className="text-xl font-semibold mb-3">🔗 Share Document</h2>
            <p className="text-sm text-gray-300 mb-6">
              Share this link to allow others to <span className="text-white font-medium">view</span> the document.
            </p>

            <div className="mb-4">
              <label className="text-sm font-medium mb-1 block">Shareable Link</label>
              <div className="flex gap-2 items-center">
                <input
                  readOnly
                  className="bg-zinc-800 rounded-lg px-3 py-2 w-full text-sm border border-zinc-700"
                  value={shareURL}
                />
                <button
                  onClick={handleCopy}
                  className="hover:bg-zinc-700 p-2 rounded-md border border-zinc-600"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              {copied && (
                <p className="text-xs text-green-400 mt-1">Copied Link!</p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={OnClose}
                className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
              >
                Got it
              </button>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4 py-8">
            <h2 className="text-lg font-medium">🚫 Not Collaborative</h2>
            <p className="text-sm text-gray-400 px-2">
              This document isn't in collaborative mode yet. Enable collaboration to generate a view-only link.
            </p>
            <button
              onClick={OnClose}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
            >
              Got it
            </button>
          </div>
        )}
      </div>
    </div>
  );
}