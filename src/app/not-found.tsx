"use client";

import { Home, ArrowLeft } from "lucide-react";

const colors = {
  forest: "#1F3D2B",
  forestDeep: "#16301F",
  moss: "#6B8F5C",
  bambooTan: "#C9A876",
  cream: "#F6F2E9",
  ochre: "#B8863B",
};

export default function NotFound(): JSX.Element {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-5"
      style={{ backgroundColor: colors.forest, fontFamily: "'Inter', sans-serif" }}
    >
      <div className="text-center max-w-lg">
        <div 
          className="brand-font leading-none mb-6" 
          style={{ fontSize: "clamp(5rem, 18vw, 9rem)", color: colors.bambooTan }}
        >
          404
        </div>

        <h1 
          className="brand-font text-2xl md:text-3xl mb-3" 
          style={{ color: colors.cream }}
        >
          This path hasn&apos;t been woven yet.
        </h1>

        <p 
          className="text-[14.5px] mb-9" 
          style={{ color: "rgba(246,242,233,0.65)" }}
        >
          The page you're looking for may have moved, or never existed.
          Let's get you back to solid ground.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/"
            className="flex items-center gap-2 px-6 py-3.5 rounded-full text-[14px] font-semibold"
            style={{ backgroundColor: colors.ochre, color: colors.cream }}
          >
            <Home size={16} strokeWidth={2} />
            Back to Home
          </a>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full text-[14px] font-semibold border"
            style={{ borderColor: "rgba(246,242,233,0.3)", color: colors.cream }}
          >
            <ArrowLeft size={16} strokeWidth={2} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}