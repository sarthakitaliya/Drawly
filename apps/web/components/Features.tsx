type Tone = "indigo" | "emerald" | "sky" | "amber" | "fuchsia" | "teal";

const toneToBg = (tone: Tone = "indigo") =>
  ( {
    indigo: "bg-indigo-500/10",
    emerald: "bg-emerald-500/10",
    sky: "bg-sky-500/10",
    amber: "bg-amber-500/10",
    fuchsia: "bg-fuchsia-500/10",
    teal: "bg-teal-500/10",
  } as Record<Tone, string>)[tone];

const toneToRing = (tone: Tone = "indigo") =>
  ( {
    indigo: "ring-1 ring-indigo-400/30",
    emerald: "ring-1 ring-emerald-400/30",
    sky: "ring-1 ring-sky-400/30",
    amber: "ring-1 ring-amber-400/30",
    fuchsia: "ring-1 ring-fuchsia-400/30",
    teal: "ring-1 ring-teal-400/30",
  } as Record<Tone, string>)[tone];

export default function FeatureCard({
  icon,
  title,
  desc,
  footIcon,
  footText,
  tone = "indigo",
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  footIcon: React.ReactNode;
  footText: string;
  tone?: "indigo" | "emerald" | "sky" | "amber" | "fuchsia" | "teal";
}) {
  return (
    <div className="group rounded-xl ring-1 ring-white/10 hover:ring-white/20 transition overflow-hidden bg-zinc-950/40">
      <div className="p-5 flex items-start gap-4">
        <div
          className={`h-10 w-10 grid place-items-center rounded-md ${toneToBg(tone)} ${toneToRing(tone)}`}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-white">
            {title}
          </h3>
          <p className="mt-1.5 text-sm text-zinc-300/90">{desc}</p>
        </div>
      </div>
      <div className="px-5 pb-5">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          {footIcon}
          {footText}
        </div>
      </div>
    </div>
  );
}
