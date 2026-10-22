import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Terminal, ArrowUpRight } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextState = !audioEnabled;
    soundFx.enabled = nextState;
    setAudioEnabled(nextState);
    if (nextState) {
      soundFx.playClick();
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'projects', label: 'Works' },
    { id: 'skills', label: 'Skills' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    soundFx.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07090e]/90 border-b border-slate-800/80 backdrop-blur-md py-3 shadow-xl shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-Zone Contract */}
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Single text element Brand Wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
            className="flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group cursor-pointer"
          >
            {/* Stylized Unity Engine Emblem */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.2l6.8 3.8v7.6L12 19.4 5.2 15.6V8L12 4.2zM12 7l-4 2.3v4.6l4 2.3 4-2.3V9.3L12 7z" />
              </svg>
            </div>
            <span className="font-display tracking-wider">
              ABDULLAH KHAN <span className="text-cyan-400 text-xs font-mono font-normal">/ UNITY DEV</span>
            </span>
          </a>

          {/* Zone 2: 4-5 Clean single-line text Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? 'text-cyan-400 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action + Utility */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Procedural Audio Mute Switch */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                audioEnabled
                  ? 'bg-slate-900/80 border-slate-700 text-cyan-400 hover:border-cyan-500/60'
                  : 'bg-slate-900/80 border-slate-800 text-slate-500 hover:text-slate-400'
              }`}
              title={audioEnabled ? 'Mute Procedural Web Audio' : 'Enable Audio Synthesizer'}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden lg:inline text-[11px] font-mono">
                {audioEnabled ? 'AUDIO ON' : 'MUTED'}
              </span>
            </button>

            {/* Availability Badge */}
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span className="whitespace-nowrap">OPEN FOR ROLES</span>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick('contact')}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg transition-all shadow-md shadow-cyan-900/30 whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Let's Build</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-[#0d121c] border border-slate-800 rounded-xl shadow-2xl flex flex-col gap-3 text-sm">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-cyan-500/10 text-cyan-400 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
