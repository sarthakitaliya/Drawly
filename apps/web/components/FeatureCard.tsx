
export default function FeatureCard({ 
    icon, 
    title, 
    description 
  }: { 
    icon: React.ReactNode; 
    title: string; 
    description: string; 
  }) {
    return (
      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors group">
        <div className="mb-4 transition-transform duration-300">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    );
  }