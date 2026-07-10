"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";
import toast from "react-hot-toast";
// import { authClient } from "@/lib/auth-client"; 

const colors = {
  forest: "#16301F",
  forestDeep: "#0F241A",
  moss: "#7FA36A",
  bambooTan: "#D4B483",
  cream: "#FAF7F0",
  ochre: "#C9922F",
  ink: "#211F16",
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1 + i * 0.07, ease: "easeOut" },
  }),
};

function getStrength(password: string): { label: string; score: number; color: string } {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { label: "Weak", score: 1, color: "#D9534F" };
  if (score <= 3) return { label: "Fair", score: 2, color: colors.ochre };
  return { label: "Strong", score: 3, color: colors.moss };
}

export default function RegisterPage(): JSX.Element {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", agree: false });
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; agree?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  
  const strength = getStrength(form.password);

  const validate = () => {
    const next: typeof errors = {};
    if (form.name.trim().length < 2) next.name = "Enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address";
    if (form.password.length < 6) next.password = "Password must be at least 6 characters";
    if (!form.agree) next.agree = "You must accept the terms to continue";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (error) {
        setErrors({ general: error.message || "Failed to create account" });
        setLoading(false);
        return;
      }

      toast.success("SignUp successfully Done!....")
      router.push("/login"); 
    } catch (err) {
      setErrors({ general: "Something went wrong. Please try again." });
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard", // গুগল সাইন আপের পর সরাসরি ড্যাশবোর্ড বা হোমে রিডাইরেক্ট
      });
    } catch (err) {
      console.error("Google sign-in failed", err);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,680&family=Inter:wght@400;500;600;700&display=swap');
        .brand-font { font-family: 'Fraunces', serif; }
        .auth-input { transition: border-color 0.25s ease, box-shadow 0.25s ease; }
        .strength-bar { transition: width 0.3s ease, background-color 0.3s ease; }
        .custom-checkbox { transition: background-color 0.2s ease, border-color 0.2s ease; }
        .glass-card {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(212,180,131,0.18);
        }
      `}</style>

      {/* Left Panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden" style={{ backgroundColor: colors.forest }}>
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1616627561950-9f746e330187?q=80&w=1200&auto=format&fit=crop" alt="Handcrafted bamboo furniture" fill className="object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(15,36,26,0.9) 0%, rgba(15,36,26,0.98) 60%, rgba(9,22,15,1) 100%)" }} />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(201,146,47,0.16) 0%, transparent 70%)" }} />
        </div>

        <motion.a href="/" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative flex items-center gap-2.5 z-10">
          <svg width="26" height="30" viewBox="0 0 30 34" fill="none">
            <rect x="12" y="0" width="6" height="34" rx="2" fill={colors.bambooTan} />
            <rect x="12" y="7" width="6" height="2.2" fill={colors.forest} />
            <rect x="12" y="16" width="6" height="2.2" fill={colors.forest} />
            <rect x="12" y="25" width="6" height="2.2" fill={colors.forest} />
            <path d="M15 7 C 8 5, 4 8, 3 3" stroke={colors.moss} strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <path d="M15 16 C 22 14, 26 17, 27 12" stroke={colors.moss} strokeWidth="1.6" fill="none" strokeLinecap="round" />
          </svg>
          <span className="brand-font text-xl" style={{ color: colors.cream }}>BambooCraft</span>
        </motion.a>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative z-10">
          <h2 className="brand-font text-3xl xl:text-4xl leading-[1.15] mb-6" style={{ color: colors.cream }}>
            Join a community <br /> rooted in craft.
          </h2>

          <div className="flex flex-col gap-3">
            {["Early access to new artisan drops", "Save favorites & track orders", "Direct stories from the makers"].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }} className="glass-card flex items-center gap-3 px-3.5 py-2.5 rounded-xl">
                <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(212,180,131,0.18)" }}>
                  <Check size={11} color={colors.bambooTan} strokeWidth={3} />
                </span>
                <span className="text-[13.5px]" style={{ color: "rgba(250,247,240,0.8)" }}>{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="relative z-10 text-[12px]" style={{ color: "rgba(250,247,240,0.35)" }}>
          &copy; 2026 BambooCraft. Handmade in Bangladesh.
        </motion.p>
      </div>

      {/* Right Panel */}
      <div className="flex items-center justify-center p-6 sm:p-10" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="w-full max-w-sm">
          <motion.a href="/" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:hidden flex items-center gap-2 mb-8">
            <svg width="22" height="26" viewBox="0 0 30 34" fill="none">
              <rect x="12" y="0" width="6" height="34" rx="2" fill={colors.ochre} />
              <rect x="12" y="7" width="6" height="2.2" fill="#fff" />
              <rect x="12" y="16" width="6" height="2.2" fill="#fff" />
              <rect x="12" y="25" width="6" height="2.2" fill="#fff" />
            </svg>
            <span className="brand-font text-lg" style={{ color: colors.ink }}>BambooCraft</span>
          </motion.a>

          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="show">
            <h1 className="brand-font text-3xl mb-2" style={{ color: colors.ink }}>Create account</h1>
            <p className="text-[13.5px] mb-8" style={{ color: "rgba(33,31,22,0.55)" }}>
              Already with us?{" "}
              <a href="/login" className="font-semibold" style={{ color: colors.forest }}>Sign in instead</a>
            </p>
          </motion.div>

          {errors.general && (
            <p className="text-[13px] p-3 rounded-lg mb-4 text-center font-medium bg-red-50" style={{ color: "#D9534F" }}>
              {errors.general}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <motion.div variants={fadeUp} custom={1} initial="hidden" animate="show">
              <label className="text-[12.5px] font-medium mb-1.5 block" style={{ color: colors.ink }}>Full name</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" color="rgba(33,31,22,0.4)" />
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Abid Hasan" className="auth-input w-full pl-10 pr-4 py-3 rounded-xl text-[14px] outline-none border" style={{ borderColor: errors.name ? "#D9534F" : "rgba(0,0,0,0.1)" }} />
              </div>
              {errors.name && <p className="text-[11.5px] mt-1" style={{ color: "#D9534F" }}>{errors.name}</p>}
            </motion.div>

            <motion.div variants={fadeUp} custom={2} initial="hidden" animate="show">
              <label className="text-[12.5px] font-medium mb-1.5 block" style={{ color: colors.ink }}>Email address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" color="rgba(33,31,22,0.4)" />
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="auth-input w-full pl-10 pr-4 py-3 rounded-xl text-[14px] outline-none border" style={{ borderColor: errors.email ? "#D9534F" : "rgba(0,0,0,0.1)" }} />
              </div>
              {errors.email && <p className="text-[11.5px] mt-1" style={{ color: "#D9534F" }}>{errors.email}</p>}
            </motion.div>

            <motion.div variants={fadeUp} custom={3} initial="hidden" animate="show">
              <label className="text-[12.5px] font-medium mb-1.5 block" style={{ color: colors.ink }}>Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" color="rgba(33,31,22,0.4)" />
                <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" className="auth-input w-full pl-10 pr-11 py-3 rounded-xl text-[14px] outline-none border" style={{ borderColor: errors.password ? "#D9534F" : "rgba(0,0,0,0.1)" }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff size={16} color="rgba(33,31,22,0.4)" /> : <Eye size={16} color="rgba(33,31,22,0.4)" />}
                </button>
              </div>

              {form.password.length > 0 && (
                <div className="mt-2">
                  <div className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(0,0,0,0.08)" }}>
                    <div className="strength-bar h-full rounded-full" style={{ width: `${(strength.score / 3) * 100}%`, backgroundColor: strength.color }} />
                  </div>
                  <span className="text-[11px] mt-1 block" style={{ color: strength.color }}>{strength.label} password</span>
                </div>
              )}
              {errors.password && <p className="text-[11.5px] mt-1" style={{ color: "#D9534F" }}>{errors.password}</p>}
            </motion.div>

            <motion.label variants={fadeUp} custom={4} initial="hidden" animate="show" className="flex items-start gap-2.5 cursor-pointer mt-1">
              <div onClick={() => setForm({ ...form, agree: !form.agree })} className="custom-checkbox rounded-md border flex items-center justify-center shrink-0 mt-0.5" style={{ width: 18, height: 18, backgroundColor: form.agree ? colors.forest : "transparent", borderColor: form.agree ? colors.forest : "rgba(0,0,0,0.25)" }}>
                {form.agree && <Check size={12} color="#fff" strokeWidth={3} />}
              </div>
              <span className="text-[12.5px] leading-snug" style={{ color: "rgba(33,31,22,0.65)" }}>
                I agree to the <a href="/terms" className="font-semibold" style={{ color: colors.forest }}>Terms of Service</a> and <a href="/privacy" className="font-semibold" style={{ color: colors.forest }}>Privacy Policy</a>
              </span>
            </motion.label>
            {errors.agree && <p className="text-[11.5px] -mt-2" style={{ color: "#D9534F" }}>{errors.agree}</p>}

            <motion.button variants={fadeUp} custom={5} initial="hidden" animate="show" type="submit" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} disabled={loading} className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-semibold mt-1" style={{ backgroundColor: colors.ochre, color: colors.cream, opacity: loading ? 0.7 : 1 }}>
              {loading ? "Creating account..." : "Create account"}
              {!loading && <ArrowRight size={15} strokeWidth={2} />}
            </motion.button>
          </form>

          <motion.div variants={fadeUp} custom={6} initial="hidden" animate="show" className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />
            <span className="text-[11.5px]" style={{ color: "rgba(33,31,22,0.4)" }}>or sign up with</span>
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />
          </motion.div>

          <motion.div variants={fadeUp} custom={7} initial="hidden" animate="show" className="grid grid-cols-1 gap-3">
            <button type="button" onClick={handleGoogleSignIn} disabled={googleLoading} className="flex px-4 w-full items-center justify-center mx-auto gap-2 py-2.5 rounded-xl text-[13px] font-medium border transition-colors hover:bg-gray-50" style={{ borderColor: "rgba(0,0,0,0.1)", color: colors.ink, opacity: googleLoading ? 0.6 : 1 }}>
              <svg width="16" height="16" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34 5.1 29.3 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.4-.4-3.5z" />
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34 5.1 29.3 3 24 3c-7.6 0-14.1 4.3-17.7 11.7z" />
                <path fill="#4CAF50" d="M24 45c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.4-4.5 2.4-7.2 2.4-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.8 40.5 16.3 45 24 45z" />
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.2 5.2C40.9 36 44 30.6 44 24c0-1.4-.1-2.4-.4-3.5z" />
              </svg>
              {googleLoading ? "Connecting..." : "Google"}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}