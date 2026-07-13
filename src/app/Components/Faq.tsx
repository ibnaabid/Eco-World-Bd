"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const colors = {
  forest: "#1F3D2B",
  moss: "#6B8F5C",
  bambooTan: "#C9A876",
  cream: "#F6F2E9",
  ochre: "#B8863B",
  ink: "#2A2A22",
};

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is every piece genuinely handmade?",
    answer:
      "Yes. Every basket, chair, and lamp is shaped and finished by hand by artisans in our partner workshops — no machine molding is used at any stage.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Inside Dhaka, orders arrive in 2-3 working days. Outside Dhaka, delivery typically takes 4-7 working days depending on the region.",
  },
  {
    question: "Can I customize size or color?",
    answer:
      "Many furniture pieces can be customized in size, and most items support a natural or smoke-finished tone. Message us before ordering to confirm.",
  },
  {
    question: "Is bamboo furniture durable in humid weather?",
    answer:
      "Our bamboo is treated and oil-finished to resist moisture and pests, making it well suited to Bangladesh's climate when kept out of direct rain.",
  },
  {
    question: "What if my item arrives damaged?",
    answer:
      "Every order is covered by a 6-month craftsmanship warranty. If anything arrives damaged, contact us within 48 hours for a free replacement.",
  },
];

function FAQRow({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b transition-all duration-300" style={{ borderColor: "rgba(31,61,43,0.08)" }}>
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-6 py-7 text-left group"
      >
        <span
          className="text-[16px] md:text-[17px] font-medium tracking-tight transition-colors duration-300 group-hover:text-[#1F3D2B]"
          style={{ color: isOpen ? colors.forest : colors.ink }}
        >
          {item.question}
        </span>
        <span
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: isOpen ? colors.forest : "transparent",
            color: isOpen ? colors.cream : colors.ink,
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <Plus size={16} strokeWidth={1.5} />
        </span>
      </button>
      
      {/* Pure CSS Smooth Height Dynamic Animation */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 pb-7" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pr-10 text-[14px] leading-relaxed font-light text-stone-500">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="py-28 px-6 md:px-16" style={{ backgroundColor: "#FFFFFF", fontFamily: "'Inter', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=Inter:wght@300;400;500;600&display=swap');
        .brand-font { font-family: 'Fraunces', serif; }
      `}} />

      <div className="max-w-7xl mx-auto">
        {/* Split Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Side Header (Stays sticky on large screens) */}
          <div className="lg:col-span-4 lg:sticky lg:top-10 h-fit">
            <span className="text-[11px] font-medium tracking-[0.25em] uppercase block mb-3" style={{ color: colors.moss }}>
              Customer Support
            </span>
            <h2 className="brand-font text-4xl font-medium tracking-tight leading-tight mb-6" style={{ color: colors.ink }}>
              Frequently <br />
              <span className="italic font-normal">Asked Questions</span>
            </h2>
            <p className="text-[14px] text-stone-500 font-light leading-relaxed mb-6 max-w-sm">
              Can't find what you're looking for? Our dedicated concierge team is always here to assist with custom orders.
            </p>
            <a 
              href="#" 
              className="inline-flex items-center text-[13px] font-medium tracking-wide uppercase pb-0.5 border-b transition-all duration-300 hover:opacity-70"
              style={{ color: colors.forest, borderColor: colors.forest }}
            >
              Contact Support Team
            </a>
          </div>

          {/* Right Side Accordion Grid */}
          <div className="lg:col-span-8 border-t" style={{ borderColor: "rgba(31,61,43,0.08)" }}>
            {faqs.map((item, i) => (
              <FAQRow
                key={i}
                item={item}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}