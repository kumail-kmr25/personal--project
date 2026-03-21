'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Github, Sparkles, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Invalid credentials. Please try again.');
      } else {
        toast.success('Welcome back!');
        router.push('/admin');
      }
    } catch {
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030712] flex items-center justify-center p-4">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -80, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-[10%] -right-[10%] w-[45%] h-[45%] rounded-full bg-accent-purple/20 blur-[130px]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-accent-teal/5 blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="backdrop-blur-2xl bg-white/3 border border-white/8 rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden relative group">
          {/* Subtle light streak */}
          <div className="absolute -inset-x-20 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-50" />
          
          <div className="mb-10 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-accent-purple p-0.5 mb-6"
            >
              <div className="w-full h-full bg-[#030712] rounded-[0.9rem] flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary shrink-0" />
              </div>
            </motion.div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Enter your credentials to access your workspace</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500 group-focus-within/input:text-primary transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder:text-gray-500 outline-none focus:border-primary/50 focus:bg-white/10 transition-all scheme-dark"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <button type="button" className="text-xs text-primary hover:text-primary-hover transition-colors font-medium">
                  Forgot password?
                </button>
              </div>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500 group-focus-within/input:text-primary transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder:text-gray-500 outline-none focus:border-primary/50 focus:bg-white/10 transition-all scheme-dark"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-linear-to-r from-primary to-accent-purple hover:scale-[1.02] active:scale-[0.98] text-white font-semibold rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:scale-100"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/8"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0b101d] px-4 text-gray-500 tracking-widest">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full h-14 bg-white/3 border border-white/8 hover:bg-white/6 text-white font-medium rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              <Github className="w-5 h-5" />
              GitHub
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <button type="button" className="text-primary hover:text-primary-hover font-semibold transition-colors">
              Create one
            </button>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-gray-600">
          <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
          <div className="w-1 h-1 rounded-full bg-gray-800" />
          <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
        </div>
      </motion.div>
    </div>
  );
}
