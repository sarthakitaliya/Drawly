const TestimonialCard: React.FC<{
  img: string;
  name: string;
  role: string;
  quote: string;
}> = ({ img, name, role, quote }) => (
  <div className="rounded-xl ring-1 ring-white/10 bg-zinc-950/40 p-6">
    <div className="flex items-center gap-3">
      <img
        className="h-10 w-10 rounded-full object-cover ring-2 ring-zinc-900"
        src={img}
        alt={name}
      />
      <div>
        <div className="text-sm font-medium text-white">{name}</div>
        <div className="text-xs text-zinc-400">{role}</div>
      </div>
    </div>
    <p className="mt-4 text-sm text-zinc-300/90">{quote}</p>
  </div>
);

export default function Testimonials() {
  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 md:py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <TestimonialCard
            img="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=96&h=96&q=80"
            name="Jules Carter"
            role="Design Lead"
            quote="“Live cursors and instant sync make remote whiteboarding feel natural. We replaced three tools with Drawly.”"
          />
          <TestimonialCard
            img="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=facearea&facepad=2&w=96&h=96&q=80"
            name="Dmitri Novak"
            role="Product Manager"
            quote="“Private docs and permissions let us ideate safely before sharing with stakeholders.”"
          />
          <TestimonialCard
            img="https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?auto=format&fit=facearea&facepad=2&w=96&h=96&q=80"
            name="Mira Chen"
            role="Engineer"
            quote="“Fast, reliable, and the tools feel great. The vector quality is crisp even with many collaborators.”"
          />
        </div>
      </div>
    </section>
  );
}
