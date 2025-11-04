import { Download, Folder, Layers, LinkIcon, Lock, MousePointer2, Shield, Sparkles, Users, Wand, Wand2, Wifi } from "lucide-react";
import FeatureCard from "./Features";

export default function Features() {
  return (
    <section id="features" className="relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              Everything you need to think in sketches
            </h2>
            <p className="text-zinc-300/90">
              From private canvases to multiplayer sessions with live cursors
              and presence. Organize work across multiple documents and invite
              collaborators with fine-grained permissions.
            </p>
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Users className="w-5 h-5 text-indigo-300" />}
            title="Live collaboration"
            desc="See edits as they happen with sub-second sync, presence indicators, and conflict-free drawing."
            footIcon={<Wifi className="w-3.5 h-3.5" />}
            footText="Realtime multiplayer"
            tone="indigo"
          />
          <FeatureCard
            icon={<Lock className="w-5 h-5 text-emerald-300" />}
            title="Private by default"
            desc="Create private documents and share only when you’re ready, with view or edit roles."
            footIcon={<Shield className="w-3.5 h-3.5" />}
            footText="Access controls"
            tone="emerald"
          />
          <FeatureCard
            icon={<MousePointer2 className="w-5 h-5 text-sky-300" />}
            title="Live cursors"
            desc="Track every participant with labeled cursors and color-coded selections."
            footIcon={<Sparkles className="w-3.5 h-3.5" />}
            footText="Smooth presence"
            tone="sky"
          />
          <FeatureCard
            icon={<Folder className="w-5 h-5 text-amber-300" />}
            title="Multiple documents"
            desc="Organize projects with unlimited canvases, folders, and fast search."
            footIcon={<Layers className="w-3.5 h-3.5" />}
            footText="Project spaces"
            tone="amber"
          />
          <FeatureCard
            icon={<Wand2 className="w-5 h-5 text-fuchsia-300" />}
            title="Vector-smooth tools"
            desc="Pencil, shapes, text, and connectors designed for precision and speed."
            footIcon={<Wand className="w-3.5 h-3.5" />}
            footText="Snap & align"
            tone="fuchsia"
          />
          <FeatureCard
            icon={<Download className="w-5 h-5 text-teal-300" />}
            title="Export & share"
            desc="Export PNG/SVG and share instant links with optional passwords."
            footIcon={<LinkIcon className="w-3.5 h-3.5" />}
            footText="One-click links"
            tone="teal"
          />
        </div>
      </div>
    </section>
  );
}
