import { FilePlus, Play } from "lucide-react";

export default function DemoCTA() {
  return (
    <section id="demo" className="relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/40 to-zinc-950/50 overflow-hidden">
          <div className="px-6 md:px-10 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-white">
                See Drawly in action
              </h3>
              <p className="mt-1.5 text-zinc-300/90">
                A quick walkthrough of live cursors, private docs, and
                multi-document workflows.
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold tracking-tight text-white bg-indigo-500 hover:bg-indigo-400 ring-1 ring-inset ring-indigo-400/30 transition-colors"
              >
                <Play className="w-4.5 h-4.5" />
                Play demo
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium text-zinc-200 ring-1 ring-white/10 hover:ring-white/20 hover:text-white transition-colors"
              >
                <FilePlus className="w-4.5 h-4.5" />
                Create a doc
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
