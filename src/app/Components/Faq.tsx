"use client"
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

function FAQRow({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }): JSX.Element {
  return (
    <div className="border-b" style={{ borderColor: "rgba(31,61,43,0.1)" }}>
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-6 py-6 text-left"
      >
        <span
          className="text-[15.5px] sm:text-[16.5px] font-medium transition-colors"
          style={{ color: isOpen ? colors.forest : colors.ink }}
        >
          {item.question}
        </span>
        <span
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: isOpen ? colors.forest : "rgba(31,61,43,0.06)",
            color: isOpen ? colors.cream : colors.forest,
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <Plus size={15} strokeWidth={2.2} />
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? 200 : 0 }}
      >
        <p className="pb-6 pr-10 text-[14px] leading-relaxed" style={{ color: "rgba(42,42,34,0.65)" }}>
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection(): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="py-20 px-5 md:px-8" style={{ backgroundColor: "#FFFFFF", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .brand-font { font-family: 'Fraunces', serif; }
      `}</style>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[12px] font-semibold tracking-[0.15em] uppercase" style={{ color: colors.moss }}>
            Questions
          </span>
          <h2 className="brand-font text-3xl md:text-4xl mt-2" style={{ color: colors.ink }}>
            Frequently Asked
          </h2>
        </div>

        <div>
          {faqs.map((item, i) => (
            <FAQRow
              key={i}
              item={item}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-[13.5px]" style={{ color: "rgba(42,42,34,0.6)" }}>
            Still have questions?{" "}
            <a href="#" className="font-semibold" style={{ color: colors.forest }}>
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}