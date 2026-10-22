import React from 'react';
import { soundFx } from '../utils/audio';
import { ArrowDown, Gamepad2 } from 'lucide-react';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onContactMe: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreProjects, onContactMe }) => {
  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#07090e]">
      {/* Background Starfield & Subtle Nebulae */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(6,182,212,0.22),rgba(147,51,234,0.18),rgba(7,9,14,0.95))]" />

      {/* Floating Island Hero Artwork */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
          <img
            src="/public/assets/aistudio/image_30f4c2cb.png"
            alt="Abdullah Khan Unity Game Developer Floating Island"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-95 transition-opacity duration-500 scale-100 hover:scale-[1.01] transition-transform duration-1000"
          />
          {/* Soft Ambient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-[#07090e]/60" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#07090e]/50 pointer-events-none" />
        </div>
      </div>

      {/* Hero Content Overlay Layer */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 sm:pt-14 pointer-events-none">
        {/* Main Heading: ABDULLAH KHAN | UNITY GAME DEVELOPER */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white mb-3 text-balance drop-shadow-[0_4px_16px_rgba(6,182,212,0.6)]">
          ABDULLAH KHAN{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">
            | UNITY GAME DEVELOPER
          </span>
        </h1>

        {/* Subtitle: Crafting Immersive Worlds & Experiences */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-cyan-200 font-medium tracking-wide drop-shadow mb-8 text-balance">
          Crafting Immersive Worlds & Experiences
        </p>

        {/* Call-to-Action Glowing Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
          <button
            onClick={() => {
              soundFx.playWarp();
              onExploreProjects();
            }}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm uppercase tracking-widest transition-all shadow-[0_0_24px_rgba(6,182,212,0.6)] hover:shadow-[0_0_36px_rgba(6,182,212,0.9)] hover:-translate-y-0.5 flex items-center gap-2.5 cursor-pointer"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>EXPLORE PROJECTS</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onContactMe();
            }}
            className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-cyan-400 font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all backdrop-blur-md cursor-pointer"
          >
            <span>LET'S CONNECT</span>
          </button>
        </div>
      </div>

      {/* Bottom KPI Bar & Scroll Indicator */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 w-full mt-auto pt-6 pointer-events-none">
        {/* Quantified Adjacency Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-3 px-5 rounded-xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-md pointer-events-auto shadow-xl">
          <div className="text-center">
            <div className="text-lg sm:text-xl font-bold font-mono text-cyan-400">5+ Yrs</div>
            <div className="text-[11px] text-slate-400">Professional Game Dev</div>
          </div>
          <div className="text-center border-l border-slate-800">
            <div className="text-lg sm:text-xl font-bold font-mono text-purple-400">250k+</div>
            <div className="text-[11px] text-slate-400">Mobile & Web Players</div>
          </div>
          <div className="text-center border-l border-slate-800">
            <div className="text-lg sm:text-xl font-bold font-mono text-cyan-400">60 FPS</div>
            <div className="text-[11px] text-slate-400">Mobile Optimization</div>
          </div>
          <div className="text-center border-l border-slate-800">
            <div className="text-lg sm:text-xl font-bold font-mono text-emerald-400">4+ Engines</div>
            <div className="text-[11px] text-slate-400">Unity, Godot, Cocos, WebGL</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => {
              soundFx.playHover();
              onExploreProjects();
            }}
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-cyan-400 text-xs font-mono transition-colors pointer-events-auto cursor-pointer"
          >
            <span>SCROLL TO WORK</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
