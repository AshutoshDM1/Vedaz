import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { LogOut, MessageSquare, User, Loader2, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Dasboard() {
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const [signingOut, setSigningOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      await authClient.signOut();
      navigate('/');
    } catch (err) {
      console.error('Sign out failed:', err);
      setSigningOut(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 font-sans overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Sidebar navigation for Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-zinc-800 bg-zinc-900/20 backdrop-blur-md z-20">
        {/* Brand header using favicon.svg */}
        <div className="flex items-center space-x-3 p-6 border-b border-zinc-800/80">
          <img src="/favicon.svg" alt="Vedaz Logo" className="h-7 w-7 object-contain" />
          <span className="text-lg font-bold tracking-wider bg-linear-to-b from-white to-zinc-300 bg-clip-text text-transparent">
            VEDAZ
          </span>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          <Link
            to="/chat"
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg font-medium transition-all ${
              location.pathname === '/chat'
                ? 'bg-indigo-500/10 text-indigo-400'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
          >
            <MessageSquare className="h-4.5 w-4.5" />
            <span className="text-sm">Secure Chat</span>
          </Link>
          <Link
            to="/profile"
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg font-medium transition-all ${
              location.pathname === '/profile'
                ? 'bg-indigo-500/10 text-indigo-400'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
          >
            <User className="h-4.5 w-4.5" />
            <span className="text-sm">Profile</span>
          </Link>
        </nav>

        {/* User profile bottom footer */}
        <div className="p-4 border-t border-zinc-800/80 bg-zinc-900/10">
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="h-9 w-9 border border-zinc-800">
              <AvatarImage src={session?.user?.image || undefined} />
              <AvatarFallback className="bg-indigo-950 text-indigo-400">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-zinc-200 truncate">
                {session?.user?.name || 'Loading User...'}
              </p>
              <p className="text-[10px] text-zinc-500 truncate">{session?.user?.email}</p>
            </div>
          </div>

          <Button
            onClick={handleSignOut}
            disabled={signingOut}
            variant="ghost"
            size="sm"
            className="w-full justify-start text-xs text-zinc-400 hover:text-red-400 hover:bg-red-950/20 border border-transparent hover:border-red-900/40 rounded-lg cursor-pointer"
          >
            {signingOut ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin mr-2" />
            ) : (
              <LogOut className="h-3.5 w-3.5 mr-2" />
            )}
            Disconnect Portal
          </Button>
        </div>
      </aside>

      {/* Mobile Drawer (Overlay and Menu) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="relative flex flex-col w-64 bg-zinc-950 border-r border-zinc-800 h-full p-6 space-y-6">
            <div className="flex items-center space-x-3 pb-6 border-b border-zinc-800">
              <img src="/favicon.svg" alt="Vedaz Logo" className="h-7 w-7 object-contain" />
              <span className="text-lg font-bold tracking-wider text-white">VEDAZ</span>
            </div>

            <nav className="flex-1 space-y-1.5">
              <Link
                to="/chat"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg font-medium transition-all ${
                  location.pathname === '/chat'
                    ? 'bg-indigo-500/10 text-indigo-400'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <MessageSquare className="h-4.5 w-4.5" />
                <span className="text-sm">Secure Chat</span>
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg font-medium transition-all ${
                  location.pathname === '/profile'
                    ? 'bg-indigo-500/10 text-indigo-400'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <User className="h-4.5 w-4.5" />
                <span className="text-sm">Profile</span>
              </Link>
            </nav>

            <div className="pt-4 border-t border-zinc-800">
              <Button
                onClick={handleSignOut}
                disabled={signingOut}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs text-zinc-400 hover:text-red-400 hover:bg-red-950/20 rounded-lg cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5 mr-2" />
                Disconnect Portal
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* Main layout container */}
      <div className="flex-1 flex flex-col h-full bg-zinc-900/5 backdrop-blur-sm z-10 overflow-hidden relative">
        {/* Mobile Header bar (visible on mobile only) */}
        <header className="md:hidden flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/40">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon-xs"
              className="text-zinc-400 hover:text-zinc-100 cursor-pointer"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <img src="/favicon.svg" alt="Vedaz Logo" className="h-6 w-6 object-contain" />
            <span className="text-sm font-bold tracking-wider text-white">VEDAZ</span>
          </div>
        </header>

        {/* Outlet for Nested Pages */}
        <div className="flex-1 h-full overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
