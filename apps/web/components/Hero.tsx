import { Pencil, Play, Sparkles } from "lucide-react";
import TrustStats from "./Stats";
import CanvasMock from "./CanvasMock";

export default function Hero() {
  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 pt-16 md:pt-20">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs text-zinc-300/80 ring-1 ring-white/10 rounded-full px-2.5 py-1 w-max mb-5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Realtime collaboration</span>
              <span className="mx-1.5 text-zinc-500">•</span>
              <span>Private docs</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.05] tracking-tight text-white">
              Draw together.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-sky-300">
                In real time.
              </span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-zinc-300/90">
              Drawly is a collaborative canvas where teams sketch, brainstorm,
              and iterate live. Create private spaces, invite collaborators, see
              live cursors and presence, and organize work with multiple
              documents.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold tracking-tight text-white bg-indigo-500 hover:bg-indigo-400 ring-1 ring-inset ring-indigo-400/30 transition-colors"
              >
                <Pencil className="w-4.5 h-4.5" />
                New canvas
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium text-zinc-200 ring-1 ring-white/10 hover:ring-white/20 hover:text-white transition-colors"
              >
                <Play className="w-4.5 h-4.5" />
                Watch demo
              </a>
            </div>
            <TrustStats />
          </div>
          <div className="lg:col-span-6 relative">
            <CanvasMock />
          </div>
        </div>
      </div>
    </section>
  );
}
