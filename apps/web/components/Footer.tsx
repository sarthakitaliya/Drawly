export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 grid place-items-center rounded-md bg-zinc-800 ring-1 ring-white/10">
              <span className="text-xs font-semibold tracking-tight text-indigo-300">
                DW
              </span>
            </div>
            <div>
              <div className="text-zinc-100 font-semibold tracking-tight text-[17px]">
                drawly
              </div>
              <div className="text-xs text-zinc-500">Sketch. Share. Ship.</div>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-zinc-300 hover:text-white transition">
              Docs
            </a>
            <a href="#" className="text-zinc-300 hover:text-white transition">
              Changelog
            </a>
            <a href="#" className="text-zinc-300 hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="text-zinc-300 hover:text-white transition">
              Terms
            </a>
          </div>
        </div>
        <div className="mt-6 text-xs text-zinc-500">
          © {new Date().getFullYear()} Drawly, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
