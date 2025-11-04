export default function BackgroundAccents() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 opacity-70 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(99,102,241,0.20),rgba(14,14,22,0)_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.35)_60%,#0b0b0f_100%)]" />
      <div className="absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_10%,black,transparent)] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 opacity=%220.15%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><path d=%22M0 39.5H40M39.5 0V40%22 stroke=%22%23ffffff%22 stroke-width=%220.5%22/></svg>')]" />
    </div>
  );
}
