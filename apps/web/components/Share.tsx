import { useCanvasStore } from "@repo/store";
import { X, Copy } from "lucide-react";
import { useState } from "react";

export default function Share({
    OnClose
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
            className="fixed inset-0 bg-[#050608ab] flex items-center justify-center z-50"
            onClick={OnClose}
        >
            <div
                className="bg-[#232329] relative w-[32rem] h-auto min-h-[11rem] px-6 py-5 rounded-2xl border border-gray-600 text-white"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={OnClose}
                    className="absolute top-3 right-4 text-white hover:text-red-400 transition-colors"
                >
                    <X size={20} />
                </button>

                {isCollaborative ? (
                    <div className="space-y-7">
                        <p className="text-sm text-gray-400">
                            Anyone with this link can <span className="font-medium text-white">view</span> the document:
                        </p>
                        <div className="flex items-center bg-[#1c1c1f] border border-gray-500 rounded-md px-3 py-2">
                            <input
                                readOnly
                                value={shareURL}
                                className="bg-transparent text-white text-sm flex-1 outline-none"
                            />
                            <button
                                onClick={handleCopy}
                                className="ml-3 text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                            >
                                <Copy size={16} className="mr-1" />
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="m-9 text-center space-y-2">
                        <h1 className="text-lg font-medium">
                            This document isn't collaborative yet.
                        </h1>
                        <p className="text-sm text-gray-400">
                            Enable collaboration to generate a view-only link.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}