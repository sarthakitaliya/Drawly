export default function BenefitItem({
    icon,
    title,
    description
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }) {
    return (
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
    );
  }