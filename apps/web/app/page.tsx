import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOption } from "./api/auth/[...nextauth]/option";
import { redirect } from "next/navigation";
import { SiExcalidraw } from "react-icons/si";
import { 
  Pencil, 
  Users, 
  Shapes, 
  Share2, 
  Layout, 
  Zap,
  ArrowRight
} from "lucide-react";

export default async function Home() {
  const session = await getServerSession(authOption);

  if(session?.user){
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <SiExcalidraw className="text-4xl text-blue-500" />
            <span className="text-2xl font-bold">Drawly</span>
          </div>
          <Link 
            href="/api/auth/signin"
            className="bg-blue-500 hover:bg-blue-600 transition-colors px-6 py-2 rounded-full font-medium"
          >
            Get Started
          </Link>
        </nav>

        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Collaborative Drawing Made Simple
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Create, collaborate, and share your drawings in real-time. Whether you're brainstorming, teaching, or just having fun, Drawly makes it easy.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/api/auth/signin"
              className="bg-blue-500 hover:bg-blue-600 transition-colors px-8 py-3 rounded-full font-medium flex items-center gap-2"
            >
              Start Drawing <ArrowRight size={20} />
            </Link>
            <a 
              href="#features"
              className="border border-gray-600 hover:border-gray-400 transition-colors px-8 py-3 rounded-full font-medium"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-16">Everything You Need to Create</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Shapes className="text-blue-500" size={32} />}
            title="Multiple Shapes"
            description="Draw with various shapes including rectangles, circles, and rhombuses. Perfect for diagrams and illustrations."
          />
          <FeatureCard 
            icon={<Users className="text-green-500" size={32} />}
            title="Real-time Collaboration"
            description="Work together with your team in real-time. See changes instantly as they happen."
          />
          <FeatureCard 
            icon={<Layout className="text-purple-500" size={32} />}
            title="Organized Dashboard"
            description="Keep your drawings organized with a clean, intuitive dashboard. Access your work from anywhere."
          />
          <FeatureCard 
            icon={<Share2 className="text-yellow-500" size={32} />}
            title="Easy Sharing"
            description="Share your drawings with anyone, anywhere. Collaborate with a simple link."
          />
          <FeatureCard 
            icon={<Pencil className="text-red-500" size={32} />}
            title="Drawing Tools"
            description="A comprehensive set of drawing tools to bring your ideas to life."
          />
          <FeatureCard 
            icon={<Zap className="text-orange-500" size={32} />}
            title="Fast & Responsive"
            description="Smooth, responsive drawing experience. No lag, just pure creativity."
          />
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Drawing?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of users who are already creating amazing drawings with Drawly.
          </p>
          <Link 
            href="/api/auth/signin"
            className="bg-white text-blue-600 hover:bg-gray-100 transition-colors px-8 py-3 rounded-full font-medium inline-flex items-center gap-2"
          >
            Get Started Now <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-800">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <SiExcalidraw className="text-2xl text-blue-500" />
            <span className="font-medium">Drawly</span>
          </div>
          <p className="text-gray-400">© 2024 Drawly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) {
  return (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
