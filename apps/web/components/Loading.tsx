"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#0f0f10] flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-white text-sm tracking-wide">Loading, please wait...</p>
      </div>
    </div>
  );
}