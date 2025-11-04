import BackgroundAccents from "./Background";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="antialiased bg-[#0b0b0f] text-zinc-200 selection:bg-indigo-500/30 selection:text-indigo-100"
      style={{
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
      }}
    >
      <BackgroundAccents />
      {children}
    </div>
  );
}
