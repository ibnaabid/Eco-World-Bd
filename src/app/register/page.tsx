"use client";

import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";
import toast from "react-hot-toast";

function getStrength(password: string): { label: string; score: number; color: string } {
  let score = 0;
  if (!password) return { label: "Weak", score: 0, color: "#D9534F" };
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { label: "Weak", score: 1, color: "#D9534F" };
  if (score <= 3) return { label: "Fair", score: 2, color: "#C9922F" };
  return { label: "Strong", score: 3, color: "#7FA36A" };
}

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", agree: false });
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; agree?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  
  const strength = getStrength(form.password || "");

  const validate = () => {
    const next: typeof errors = {};
    if (!form.name || form.name.trim().length < 2) next.name = "Enter your full name";
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address";
    if (!form.password || form.password.length < 6) next.password = "Password must be at least 6 characters";
    if (!form.agree) next.agree = "You must accept the terms to continue";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});

    try {
      const { data, error } = await authClient.signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      console.log(data);

      if (error) {
        setErrors({ general: error.message || "Failed to create account" });
        return;
      }

      toast.success("SignUp successfully Done!....");
      router.push("/login"); 
    } catch (err: any) {
      setErrors({ general: err?.message || "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("Google sign-in failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold mb-1">Create account</h1>
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-emerald-700 font-medium hover:underline">Sign in</a>
          </p>
        </div>

        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl mb-5 text-center text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium block mb-1.5">Full name</label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Abid Hasan"
                className="w-full pl-11 py-3 border border-gray-300 rounded-xl focus:border-emerald-600 outline-none"
              />
            </div>
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="text-sm font-medium block mb-1.5">Email address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full pl-11 py-3 border border-gray-300 rounded-xl focus:border-emerald-600 outline-none"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-sm font-medium block mb-1.5">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl focus:border-emerald-600 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {form.password && (
              <div className="mt-2">
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all"
                    style={{ width: `${(strength.score / 3) * 100}%`, backgroundColor: strength.color }}
                  />
                </div>
                <p className="text-xs mt-1" style={{ color: strength.color }}>{strength.label} password</p>
              </div>
            )}
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="agree"
              checked={form.agree}
              onChange={(e) => setForm(prev => ({ ...prev, agree: e.target.checked }))}
              className="mt-1"
            />
            <label htmlFor="agree" className="text-sm text-gray-600 cursor-pointer select-none">
              I agree to the{" "}
              <a href="/terms" className="text-emerald-700 hover:underline">Terms</a> and{" "}
              <a href="/privacy" className="text-emerald-700 hover:underline">Privacy Policy</a>
            </label>
          </div>
          {errors.agree && <p className="text-red-500 text-xs -mt-1">{errors.agree}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-700 disabled:opacity-70 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition"
          >
            {loading ? "Creating account..." : "Create account"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-full py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 disabled:opacity-70 font-medium"
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34 5.1 29.3 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.4-.4-3.5z" />
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34 5.1 29.3 3 24 3c-7.6 0-14.1 4.3-17.7 11.7z" />
            <path fill="#4CAF50" d="M24 45c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.4-4.5 2.4-7.2 2.4-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.8 40.5 16.3 45 24 45z" />
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.2 5.2C40.9 36 44 30.6 44 24c0-1.4-.1-2.4-.4-3.5z" />
          </svg>
          {googleLoading ? "Connecting..." : "Continue with Google"}
        </button>
      </div>
    </div>
  );
}