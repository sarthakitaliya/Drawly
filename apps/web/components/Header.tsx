import { LogIn, PencilLine } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/40 bg-zinc-900/30 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <a
          href="#"
          className="group inline-flex items-center gap-3"
          aria-label="Drawly Home"
        >
          <div className="h-8 w-8 grid place-items-center rounded-md bg-zinc-800 ring-1 ring-white/10 group-hover:ring-indigo-400/40 transition-colors">
            <span className="text-xs font-semibold tracking-tight text-indigo-300">
              DW
            </span>
          </div>
          <span className="text-zinc-100 font-semibold tracking-tight text-[17px]">
            drawly
          </span>
        </a>
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-200 ring-1 ring-white/10 hover:ring-white/20 hover:text-white transition-colors"
          >
            <LogIn className="w-4 h-4" />
            Sign in
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-md px-3.5 py-2.5 text-sm font-semibold tracking-tight text-white bg-indigo-500 hover:bg-indigo-400 ring-1 ring-inset ring-indigo-400/30 transition-colors"
          >
            <PencilLine className="w-4 h-4" />
            Start drawing
          </a>
        </div>
      </div>
    </header>
  );
}
