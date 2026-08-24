import { useState } from 'react';
import { Compass, LogOut, Plus, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onAddClick }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '';

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-amber">
            <Compass size={18} strokeWidth={2.25} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            Pathway
          </span>
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 sm:flex">
          <button
            onClick={onAddClick}
            className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition hover:bg-inkSoft active:scale-[0.98]"
          >
            <Plus size={16} />
            Log application
          </button>
          <div className="flex items-center gap-2 rounded-full border border-ink/10 py-1 pl-1 pr-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber/20 font-mono text-xs font-medium text-amberDark">
              {initials}
            </span>
            <span className="text-sm font-medium text-inkSoft">{user?.name}</span>
          </div>
          <button
            onClick={logout}
            aria-label="Log out"
            className="flex h-9 w-9 items-center justify-center rounded-full text-inkSoft transition hover:bg-ink/5 hover:text-ink"
          >
            <LogOut size={18} />
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink sm:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-ink/10 bg-paper px-4 pb-4 pt-3 sm:hidden">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber/20 font-mono text-xs font-medium text-amberDark">
              {initials}
            </span>
            <span className="text-sm font-medium text-inkSoft">{user?.name}</span>
          </div>
          <button
            onClick={() => {
              setMenuOpen(false);
              onAddClick();
            }}
            className="mb-2 flex w-full items-center justify-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper"
          >
            <Plus size={16} />
            Log application
          </button>
          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-1.5 rounded-full border border-ink/10 px-4 py-2.5 text-sm font-medium text-inkSoft"
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      )}
    </header>
  );
}
