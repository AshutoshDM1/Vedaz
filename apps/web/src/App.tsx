import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { LogOut, ShieldCheck, Mail, User, Info, Loader2, Sparkles } from 'lucide-react';

function App() {
  const { data: session, isPending, error } = authClient.useSession();
  const [signingIn, setSigningIn] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setSigningIn(true);
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: window.location.origin,
      });
    } catch (err) {
      console.error('Sign in failed:', err);
      setSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
    } catch (err) {
      console.error('Sign out failed:', err);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-zinc-950 text-zinc-100 overflow-hidden font-sans select-none">
      {/* Decorative futuristic glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Glassmorphic Card Container */}
      <div className="w-full max-w-md mx-4 p-8 rounded-3xl bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 shadow-2xl relative z-10 transition-all duration-300">
        {/* Top brand header */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-4 animate-pulse">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight bg-linear-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            Vedaz Secure Auth
          </h1>
          <p className="text-sm text-zinc-500 mt-1">Powered by Better Auth & Drizzle</p>
        </div>

        {/* Dynamic content depending on Session state */}
        {isPending ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="h-8 w-8 text-indigo-500 animate-spin" />
            <p className="text-sm text-zinc-400 animate-pulse">Checking authentication status...</p>
          </div>
        ) : session ? (
          /* Profile view (User Signed In) */
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            {/* User Profile Overview */}
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/50">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className="w-14 h-14 rounded-xl object-cover ring-2 ring-indigo-500/20"
                />
              ) : (
                <div className="w-14 h-14 rounded-xl bg-indigo-950/50 flex items-center justify-center ring-2 ring-indigo-500/20">
                  <User className="h-6 w-6 text-indigo-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold truncate text-zinc-200">
                  {session.user.name}
                </p>
                <p className="text-xs text-zinc-400 truncate flex items-center mt-0.5">
                  <Mail className="h-3 w-3 mr-1 inline-block shrink-0" />
                  {session.user.email}
                </p>
              </div>
            </div>

            {/* Session Metadata Details */}
            <div className="space-y-3 p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800/30 text-xs">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 flex items-center mb-1">
                <Info className="h-3.5 w-3.5 mr-1" />
                Security Context
              </h3>
              <div className="flex justify-between items-center py-1 border-b border-zinc-800/30">
                <span className="text-zinc-500">Authenticated via</span>
                <span className="text-zinc-300 font-medium capitalize">Google</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-zinc-800/30">
                <span className="text-zinc-500">Status</span>
                <span className="text-emerald-400 font-medium flex items-center">
                  <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                  Active Session
                </span>
              </div>
              <div className="flex flex-col space-y-1 py-1">
                <span className="text-zinc-500">Session ID</span>
                <span className="font-mono text-[10px] text-zinc-400 truncate select-all cursor-pointer bg-zinc-950/40 p-1.5 rounded-md hover:bg-zinc-950/70 transition-colors">
                  {session.session.id}
                </span>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="w-full py-3.5 px-4 rounded-xl font-medium text-sm flex items-center justify-center space-x-2 bg-zinc-800 hover:bg-red-950/20 hover:text-red-400 hover:border-red-900/50 border border-zinc-700/50 text-zinc-300 transition-all duration-200 cursor-pointer active:scale-98"
            >
              <LogOut className="h-4 w-4" />
              <span>Disconnect Session</span>
            </button>
          </div>
        ) : (
          /* Sign In Screen */
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center space-y-2">
              <h2 className="text-lg font-medium text-zinc-300">Welcome back</h2>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                Access your secure decentralized portal. Connect with your corporate identity using
                Google SSO.
              </p>
            </div>

            {/* Google OAuth Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={signingIn}
              className="w-full py-3.5 px-4 rounded-xl font-medium text-sm flex items-center justify-center bg-white hover:bg-zinc-100 text-zinc-950 shadow-md transition-all duration-200 hover:shadow-indigo-500/10 active:scale-98 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
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
              <span>{signingIn ? 'Handshaking...' : 'Continue with Google'}</span>
            </button>

            {error && (
              <p className="text-xs text-red-400 text-center bg-red-950/20 border border-red-900/50 p-3 rounded-lg animate-in fade-in duration-200">
                {error.message || 'An authentication error occurred. Please try again.'}
              </p>
            )}
          </div>
        )}

        {/* Footer info/terms */}
        <div className="mt-8 text-center text-[10px] text-zinc-600">
          By signing in, you agree to secure data transmission terms.
        </div>
      </div>
    </div>
  );
}

export default App;
