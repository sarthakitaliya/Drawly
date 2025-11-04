import { Clock, Eraser, Lock, MousePointer2, Pencil, Save, Share2, Square, TypeIcon, Users, Wifi } from "lucide-react";

export default function CanvasMock() {
  return (
    <div className="relative rounded-xl border border-white/10 bg-zinc-950/50 shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-zinc-900/40">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <div className="text-xs text-zinc-400">Untitled – Canvas A</div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300/90 bg-emerald-400/10 ring-1 ring-emerald-300/30 px-2 py-1 rounded-md">
            <Wifi className="w-3.5 h-3.5" /> Live
          </span>
        </div>
      </div>

      <div className="relative">
        <div className="aspect-[16/10] bg-[radial-gradient(1200px_600px_at_50%_40%,rgba(99,102,241,0.10),transparent_60%)]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 opacity=%220.08%22 width=%2248%22 height=%2248%22 viewBox=%220 0 48 48%22><path d=%22M0 47.5H48M47.5 0V48%22 stroke=%22%23ffffff%22 stroke-width=%220.6%22/></svg>')]" />

          {/* Toolbar */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <button className="group inline-flex items-center justify-center w-9 h-9 rounded-md bg-zinc-900/70 ring-1 ring-white/10 hover:ring-white/20 text-zinc-200 hover:text-white transition">
              <Pencil className="w-4.5 h-4.5" />
            </button>
            <button className="group inline-flex items-center justify-center w-9 h-9 rounded-md bg-zinc-900/70 ring-1 ring-white/10 hover:ring-white/20 text-zinc-200 hover:text-white transition">
              <Square className="w-4.5 h-4.5" />
            </button>
            <button className="group inline-flex items-center justify-center w-9 h-9 rounded-md bg-zinc-900/70 ring-1 ring-white/10 hover:ring-white/20 text-zinc-200 hover:text-white transition">
              <TypeIcon className="w-4.5 h-4.5" />
            </button>
            <button className="group inline-flex items-center justify-center w-9 h-9 rounded-md bg-zinc-900/70 ring-1 ring-white/10 hover:ring-white/20 text-zinc-200 hover:text-white transition">
              <Eraser className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Right panel */}
          <div className="absolute top-4 right-4 flex flex-col items-end gap-3">
            <div className="flex -space-x-2">
              <img
                className="h-7 w-7 rounded-full ring-2 ring-zinc-900 object-cover"
                src="https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=1080&q=80"
                alt="Ava"
              />
              <img
                className="h-7 w-7 rounded-full ring-2 ring-zinc-900 object-cover"
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=facearea&facepad=3&w=80&h=80&q=80"
                alt="Kai"
              />
              <img
                className="h-7 w-7 rounded-full ring-2 ring-zinc-900 object-cover"
                src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&facepad=3&w=80&h=80&q=80"
                alt="Mo"
              />
              <div className="h-7 w-7 rounded-full grid place-items-center bg-zinc-800 ring-2 ring-zinc-900 text-xs text-zinc-300">
                +3
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-md bg-zinc-900/70 ring-1 ring-white/10 px-2.5 py-1.5 text-xs text-zinc-300">
              <Lock className="w-3.5 h-3.5 text-zinc-400" />
              Private
              <span className="mx-1.5 text-zinc-600">•</span>
              <button className="inline-flex items-center gap-1 text-indigo-300 hover:text-indigo-200 transition">
                <Share2 className="w-3.5 h-3.5" />
                Share
              </button>
            </div>
          </div>

          {/* Shapes and strokes */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1600 1000"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="220"
              y="160"
              width="320"
              height="220"
              rx="10"
              className="fill-indigo-400/10 stroke-indigo-300/40"
              style={{ strokeWidth: 2 }}
            />
            <circle
              cx="1010"
              cy="360"
              r="110"
              className="fill-sky-400/10 stroke-sky-300/50"
              style={{ strokeWidth: 2 }}
            />
            <path
              d="M300,650 C420,560 620,740 760,650 C900,560 1120,740 1280,650"
              className="fill-none stroke-emerald-300/60"
              style={{ strokeWidth: 3, strokeLinecap: "round" }}
            />
          </svg>

          {/* Live cursors */}
          <div className="absolute left-[22%] top-[42%] translate-x-[-50%] -translate-y-1/2">
            <div className="relative flex items-center gap-2">
              <MousePointer2 className="w-4.5 h-4.5 text-rose-300 drop-shadow" />
              <span className="text-xs rounded bg-rose-400/10 ring-1 ring-rose-300/30 px-2 py-0.5 text-rose-200">
                Ava
              </span>
            </div>
          </div>
          <div className="absolute left-[64%] top-[30%]">
            <div className="relative flex items-center gap-2">
              <MousePointer2 className="w-4.5 h-4.5 text-emerald-300 drop-shadow" />
              <span className="text-xs rounded bg-emerald-400/10 ring-1 ring-emerald-300/30 px-2 py-0.5 text-emerald-200">
                Mo
              </span>
            </div>
          </div>
          <div className="absolute left-[72%] top-[66%]">
            <div className="relative flex items-center gap-2">
              <MousePointer2 className="w-4.5 h-4.5 text-sky-300 drop-shadow" />
              <span className="text-xs rounded bg-sky-400/10 ring-1 ring-sky-300/30 px-2 py-0.5 text-sky-200">
                Kai
              </span>
            </div>
          </div>

          {/* Bottom toolbar */}
          <div className="absolute bottom-3 inset-x-3 rounded-lg bg-zinc-900/50 ring-1 ring-white/10 px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-zinc-300/90">
              <Save className="w-3.5 h-3.5" />
              Auto-save
            </div>
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 text-xs text-zinc-300/90">
                <Clock className="w-3.5 h-3.5" />
                <span>12 ms</span>
              </div>
              <span className="mx-2 h-4 w-px bg-white/10" />
              <div className="inline-flex items-center gap-1.5 text-xs text-zinc-300/90">
                <Users className="w-3.5 h-3.5" />
                <span>6 online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
