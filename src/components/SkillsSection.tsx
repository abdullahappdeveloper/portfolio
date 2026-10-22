import React, { useState } from 'react';
import { SKILL_PILLARS } from '../data/portfolioData';
import { soundFx } from '../utils/audio';
import { Code, Flame, Box, Zap, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const activePillar = SKILL_PILLARS[activeCategoryIndex];

  const pillarIcons = [Code, Flame, Box];

  return (
    <section id="skills" className="relative py-24 bg-[#07090e] border-t border-slate-900 overflow-hidden">
      {/* Background Radial Celestial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: SKILLS */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Interactive Skill Platform</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white drop-shadow-[0_2px_12px_rgba(6,182,212,0.4)]">
            SKILLS
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            Categorized skill-platform spanning multi-language programming, game engines, and technical art pipelines.
          </p>
        </div>

        {/* Categorized Platform Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3 Categorized Platform Pedestals */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 px-1 mb-1">
              Select Skill Platform:
            </div>
            {SKILL_PILLARS.map((pillar, idx) => {
              const Icon = pillarIcons[idx];
              const isSelected = activeCategoryIndex === idx;

              return (
                <button
                  key={pillar.id}
                  onClick={() => {
                    soundFx.playCrystal();
                    setActiveCategoryIndex(idx);
                  }}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? 'bg-slate-900/90 border-cyan-400 shadow-lg shadow-cyan-950/50 translate-x-1'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                          : 'bg-slate-900 text-slate-500 group-hover:text-slate-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3
                        className={`text-sm font-bold transition-colors ${
                          isSelected ? 'text-white' : 'text-slate-300'
                        }`}
                      >
                        {pillar.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {pillar.skills.map((s) => s.name).join(', ')}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-mono px-2 py-0.5 rounded transition-colors ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                        : 'text-slate-500'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </button>
              );
            })}

            {/* Certifications & Tooling Box */}
            <div className="mt-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold font-mono">
                <Shield className="w-4 h-4" />
                <span>Certified Proficiencies</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Unity Engine Certified · Mobile 60 FPS Profiling · Physics & Character Kinematics · Git LFS
              </p>
            </div>
          </div>

          {/* Right Column: Holographic Platform Display */}
          <div className="lg:col-span-7 bg-[#0b0f19] border border-cyan-500/35 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Top Status Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono text-cyan-300 font-semibold tracking-wider">
                  PLATFORM 0{activeCategoryIndex + 1} // {activePillar.name.toUpperCase()}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-500">
                STATUS: VERIFIED ACTIVE
              </span>
            </div>

            {/* Platform Title & Tagline */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold font-display text-white">
                {activePillar.name}
              </h3>
              <p className="text-xs sm:text-sm text-cyan-300/90 mt-1 font-mono">
                {activePillar.tagline}
              </p>
            </div>

            {/* Explicit Skills Grid */}
            <div className="space-y-4">
              {activePillar.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                        <span>{skill.name}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">
                          {skill.level}
                        </span>
                      </h4>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono text-slate-400 font-semibold">
                        {skill.experience}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Platform Footer */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Zero-Alloc Memory Architecture</span>
              </div>
              <div className="text-cyan-400 font-semibold">
                Battery-Friendly Mobile Optimization
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
