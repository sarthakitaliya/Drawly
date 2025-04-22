export default function StepCard({
    number,
    icon,
    title,
    description
  }: {
    number: number;
    icon: React.ReactNode;
    title: string;
    description: string;
  }) {
    return (
      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <div className="flex items-center gap-4 mb-4">
          <div className="size-10 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 font-bold">
            {number}
          </div>
          <div className="text-blue-500">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    );
  }