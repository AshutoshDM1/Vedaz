import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Auth() {
  const [signingIn, setSigningIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setSigningIn(true);
      setErrorMsg(null);
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: `${window.location.origin}/chat`,
      });
    } catch (err: any) {
      console.error('Sign in failed:', err);
      setErrorMsg(err.message || 'An authentication error occurred. Please try again.');
      setSigningIn(false);
    }
  };

  return (
    <div className="h-screen w-full bg-zinc-950 text-zinc-100 flex font-sans overflow-hidden select-none">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container: Split-screen Grid (full height and width, no outer rounded corners) */}
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-12 bg-zinc-950 relative z-10 overflow-hidden p-0 gap-0">
        {/* Left Side: Auth Logic Control Panel (6 cols on md) */}
        <div className="md:col-span-6 flex flex-col justify-center items-center p-8 md:p-16 lg:p-24 relative h-full w-full">
          {/* Top Brand Logo */}
          <div className="absolute top-8 left-8 md:top-12 md:left-12 flex items-center space-x-3">
            <img src="/favicon.svg" alt="Vedaz Logo" className="size-6 object-contain" />
            <span className="text-lg font-bold tracking-wider bg-linear-to-b from-white to-zinc-300 bg-clip-text text-transparent">
              VEDAZ Chat
            </span>
          </div>

          {/* Central SSO Panel */}
          <div className="space-y-8 max-w-md w-full flex flex-col items-center text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold tracking-tight text-white">Welcome back</h2>
              <p className="text-sm text-zinc-400">Log in to access your secure workspace.</p>
            </div>

            {/* Google OAuth Button */}
            <div className="space-y-4 w-full flex flex-col items-center">
              <Button
                onClick={handleGoogleSignIn}
                disabled={signingIn}
                variant="outline"
                size="lg"
                className="py-5 px-8 rounded-md font-semibold text-sm flex items-center justify-center bg-white hover:bg-zinc-100 text-zinc-950 shadow-md transition-all duration-300 hover:shadow-indigo-500/10 active:scale-98 cursor-pointer disabled:opacity-50 disabled:pointer-events-none border-zinc-200"
              >
                {signingIn ? (
                  <Loader2 className="h-5 w-5 animate-spin text-zinc-800 mr-2" />
                ) : (
                  <svg
                    className="w-5 h-5 mr-3 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-5.29-4.53-5.29-4.53z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                )}
                <span className="text-zinc-950">
                  {signingIn ? 'Authenticating...' : 'Log in with Google'}
                </span>
              </Button>

              {errorMsg && (
                <div className="flex items-start space-x-2 text-xs text-red-400 bg-red-950/20 border border-red-900/50 p-4 rounded-xl animate-in fade-in duration-300">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>
          </div>

          {/* Bottom compliance terms */}
          <div className="absolute bottom-8 text-center text-[10px] text-zinc-500">
            Secured link. Powered by Better Auth & Enterprise Single Sign-On.
          </div>
        </div>

        {/* Right Side: Image Illustration with rounded corners (6 cols on md) */}
        <div className="md:col-span-6 relative hidden md:block p-6 h-full w-full">
          <div className="relative h-full w-full rounded-[2rem] overflow-hidden bg-zinc-950 border border-zinc-800/80">
            <img
              src="/auth-hero.png"
              alt="Vedaz Sunset Terraces Illustration"
              className="w-full h-full object-cover object-center absolute inset-0 select-none pointer-events-none scale-100 hover:scale-105 transition-transform duration-1000"
            />
            {/* subtle gradient over the image */}
            <div className="absolute inset-0 bg-linear-to-t from-zinc-950/30 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
