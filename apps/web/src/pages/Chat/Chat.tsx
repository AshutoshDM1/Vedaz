import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { Send, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

export default function Chat() {
  const { data: session } = authClient.useSession();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'System',
      text: 'Secure decentralized connection established.',
      isSystem: true,
      time: '12:00 PM',
    },
    {
      id: 2,
      sender: 'Vedaz Bot',
      text: 'Welcome to Vedaz Workspace. Ready for secure transactions and high-fidelity chat.',
      isSystem: false,
      time: '12:01 PM',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: session?.user?.name || 'You',
        text: inputValue,
        isSystem: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setInputValue('');
  };

  return (
    <div className="flex flex-col h-full bg-zinc-900/5 backdrop-blur-sm z-10 overflow-hidden relative">
      {/* Top Header bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/40">
        <div>
          <h1 className="text-sm font-semibold text-zinc-200"># global-workspace</h1>
          <p className="text-[10px] text-zinc-500">Secure end-to-end encrypted hub</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-500" />
            <Input
              placeholder="Search portal..."
              className="pl-8 h-8.5 w-48 text-xs bg-zinc-900/50 border-zinc-850 rounded-lg focus-visible:ring-1 focus-visible:ring-zinc-700"
            />
          </div>
        </div>
      </header>

      {/* Messages view list */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${msg.isSystem ? 'opacity-70' : ''}`}
          >
            <Avatar className="h-8.5 w-8.5 border border-zinc-800 mt-0.5">
              {msg.isSystem ? (
                <AvatarFallback className="bg-zinc-800 text-zinc-400 text-[10px] font-bold">
                  SYS
                </AvatarFallback>
              ) : (
                <AvatarFallback className="bg-indigo-950 text-indigo-400 text-xs">
                  {msg.sender.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-baseline space-x-2">
                <span
                  className={`text-xs font-semibold ${msg.isSystem ? 'text-zinc-400' : 'text-zinc-200'}`}
                >
                  {msg.sender}
                </span>
                <span className="text-[9px] text-zinc-650">{msg.time}</span>
              </div>
              <div
                className={`text-sm leading-relaxed p-3.5 rounded-2xl border ${
                  msg.isSystem
                    ? 'bg-zinc-950/40 border-zinc-900/80 text-zinc-400 font-mono text-xs'
                    : 'bg-zinc-900/60 border-zinc-800/50 text-zinc-200'
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Message panel */}
      <footer className="p-4 border-t border-zinc-800/80 bg-zinc-950/20">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center space-x-3 max-w-4xl mx-auto"
        >
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type secure message..."
            className="flex-1 bg-zinc-900/40 border-zinc-800 text-zinc-200 focus-visible:ring-1 focus-visible:ring-zinc-700 rounded-xl h-11 px-4 text-sm"
          />
          <Button
            type="submit"
            className="h-11 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors flex items-center justify-center cursor-pointer shadow-lg shadow-indigo-600/10"
          >
            <Send className="h-4 w-4 mr-1.5" />
            Send
          </Button>
        </form>
      </footer>
    </div>
  );
}
