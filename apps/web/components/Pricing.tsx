import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" className="relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 md:py-14">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Simple pricing
            </h2>
            <p className="mt-2 text-zinc-300/90">
              Start free and scale with your team. No credit card required.
            </p>
          </div>
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {/* Free */}
            <div className="rounded-2xl ring-1 ring-white/10 bg-zinc-950/40 p-6 flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold tracking-tight text-white">
                  Free
                </h3>
                <span className="text-xs text-zinc-400">
                  Good for individuals
                </span>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-semibold tracking-tight text-white">
                  $0
                </span>
                <span className="text-sm text-zinc-400">/ user / mo</span>
              </div>
              <ul className="mt-5 space-y-3 text-sm text-zinc-300/90">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-300" /> Unlimited
                  private documents
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-300" /> Real-time sync
                  & live cursors
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-300" /> 3 collaborators
                  per doc
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-300" /> PNG export
                </li>
              </ul>
              <a
                href="#"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold tracking-tight text-white bg-zinc-800 hover:bg-zinc-700 ring-1 ring-white/10 transition-colors"
              >
                Get started
              </a>
            </div>

            {/* Pro */}
            <div className="relative rounded-2xl ring-1 ring-indigo-400/40 bg-gradient-to-b from-indigo-500/10 to-zinc-950/50 p-6 flex flex-col">
              <div className="absolute -top-3 right-4 text-[10px] uppercase tracking-wide text-indigo-200 bg-indigo-500/20 ring-1 ring-indigo-400/40 px-2 py-1 rounded">
                Popular
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold tracking-tight text-white">
                  Pro
                </h3>
                <span className="text-xs text-zinc-400">For teams</span>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-semibold tracking-tight text-white">
                  $8
                </span>
                <span className="text-sm text-zinc-400">/ user / mo</span>
              </div>
              <ul className="mt-5 space-y-3 text-sm text-zinc-300/90">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-300" /> Unlimited
                  collaborators
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-300" /> Version history
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-300" /> Advanced
                  permissions
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-300" /> SVG/PNG export
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-300" /> Priority
                  support
                </li>
              </ul>
              <a
                href="#"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold tracking-tight text-white bg-indigo-500 hover:bg-indigo-400 ring-1 ring-inset ring-indigo-400/30 transition-colors"
              >
                Start free trial
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
