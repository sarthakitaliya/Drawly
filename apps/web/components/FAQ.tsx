import { Folder, History, Lock, Users } from "lucide-react";
import FAQItem from "./FaqItem";

export default function FAQ() {
  return (
    <section id="faq" className="relative">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8 md:py-16">
        <h2 className="text-3xl font-semibold tracking-tight text-white">
          Frequently asked questions
        </h2>
        <dl className="mt-8 space-y-4">
          <FAQItem
            q="How many collaborators can join a document?"
            a="Free includes up to 3 collaborators per doc. Pro supports unlimited collaborators with advanced permissions."
            icon={<Users className="w-4 h-4" />}
          />
          <FAQItem
            q="Do you support private documents?"
            a="Yes. Documents are private by default. Share links with view or edit access anytime."
            icon={<Lock className="w-4 h-4" />}
          />
          <FAQItem
            q="Can I create multiple documents?"
            a="Absolutely. Organize unlimited documents into folders and workspaces."
            icon={<Folder className="w-4 h-4" />}
          />
          <FAQItem
            q="Is there version history?"
            a="Pro includes full version history with restore points for every session."
            icon={<History className="w-4 h-4" />}
          />
        </dl>
      </div>
    </section>
  );
}
