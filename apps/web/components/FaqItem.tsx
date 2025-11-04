export default function FAQItem({
  q,
  a,
  icon,
}: {
  q: string;
  a: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-lg ring-1 ring-white/10 bg-zinc-950/40 p-5">
      <dt className="flex items-center justify-between">
        <span className="text-sm font-medium text-white">{q}</span>
        <div className="w-4 h-4 text-zinc-400">{icon}</div>
      </dt>
      <dd className="mt-2 text-sm text-zinc-300/90">{a}</dd>
    </div>
  );
}
