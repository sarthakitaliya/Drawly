import React from "react";
// This file assumes Tailwind CSS is already configured in your React/Next.js project.
// Icons: npm i lucide-react
import {
  LogIn,
  PencilLine,
  Pencil,
  Play,
  Wifi,
  Users,
  Lock,
  Share2,
  Square,
  Type as TypeIcon,
  Eraser,
  Save,
  Clock,
  Shield,
  Layers,
  Wand2,
  Wand,
  Link as LinkIcon,
  FilePlus,
  Check,
  History,
  Folder,
  MousePointer2,
  Download,
  Sparkles,
} from "lucide-react";
import PageShell from "../components/Layout";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/FeaturesSection";
import DemoCTA from "../components/DemoCTA";
import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

const DrawlyLandingPage: React.FC = () => {
  return (
    <PageShell>
      <Header />
      <Hero />
      <Features />
      <DemoCTA />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </PageShell>
  );
};

export default DrawlyLandingPage;
