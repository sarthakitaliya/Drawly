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
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Globe,
} from "lucide-react";
import FeatureCard from "../components/FeatureCard";
import BenefitItem from "../components/BenefitItem";
import StepCard from "../components/StepCard";

export default async function Home() {
  const session = await getServerSession(authOption);

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white font-sans">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <div className="size-12 bg-[#FFFBEA] rounded-xl flex items-center justify-center">
              <SiExcalidraw className="text-3xl text-blue-800" />
            </div>
            <span className="text-2xl font-bold text-white">Drawly</span>
          </div>
          <div className="flex gap-4">
            <Link
              href="/api/auth/signin"
              className="bg-blue-500 hover:bg-blue-600 transition-colors px-6 py-2 rounded-full font-medium flex items-center gap-2"
            >
              Get Started <ArrowRight size={18} />
            </Link>
          </div>
        </nav>

        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 mb-6">
            <Sparkles size={16} />
            <span className="text-sm font-medium">
              The Future of Collaborative Drawing
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6  text-blue-600 leading-light">
            Draw Together, Create Together
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Experience seamless real-time collaboration with Drawly. Create,
            share, and collaborate on drawings with your team instantly.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/api/auth/signin"
              className="bg-blue-500 hover:bg-blue-600 transition-colors px-8 py-3 rounded-full font-medium flex items-center gap-2 group"
            >
              Start Drawing Free{" "}
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <a
              href="#demo"
              className="border border-gray-600 hover:border-gray-400 transition-colors px-8 py-3 rounded-full font-medium"
            >
              Watch Demo
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Everything You Need to Create
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Powerful features designed to make your collaborative drawing
            experience seamless and enjoyable
          </p>
        </div>
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

      {/* How It Works Section */}
      <div
        id="how-it-works"
        className="container mx-auto px-4 py-20 bg-gray-800/30"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get started with Drawly in just a few simple steps
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <StepCard
            number={1}
            icon={<Pencil size={24} />}
            title="Create"
            description="Start a new drawing or join an existing one"
          />
          <StepCard
            number={2}
            icon={<Users size={24} />}
            title="Collaborate"
            description="Invite team members to work together in real-time"
          />
          <StepCard
            number={3}
            icon={<Share2 size={24} />}
            title="Share"
            description="Share your work with others and export your drawings"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold mb-6">Why Choose Drawly?</h2>
            <div className="space-y-6">
              <BenefitItem
                icon={<CheckCircle2 className="text-green-500" size={24} />}
                title="Real-time Updates"
                description="See changes instantly as your team works together"
              />
              <BenefitItem
                icon={<Clock className="text-blue-500" size={24} />}
                title="Save Time"
                description="No more back-and-forth emails or file sharing"
              />
              <BenefitItem
                icon={<Globe className="text-purple-500" size={24} />}
                title="Access Anywhere"
                description="Work from any device, anywhere in the world"
              />
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-2xl" id="demo">
            <div className="aspect-video rounded-xl flex items-center justify-center">
              {/* <SiExcalidraw className="text-6xl text-blue-500 mx-auto mb-4" /> */}
              {/* <p className="text-gray-400">Interactive Demo Coming Soon</p> */}
              <video
                autoPlay
                loop
                muted
                className="w-full rounded-xl shadow-lg object-cover"
              >
                <source src="/demo.mov" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="bg-blue-600 rounded-2xl p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Drawing?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of users who are already creating amazing drawings
            with Drawly.
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
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <SiExcalidraw className="text-2xl text-blue-500" />
            <span className="font-medium">Drawly</span>
          </div>
          <div className="flex gap-6 text-gray-400">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
          <p className="text-gray-400">© 2024 Drawly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
