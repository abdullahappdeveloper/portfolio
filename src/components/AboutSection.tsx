import React, { useState } from 'react';
import { JOURNEY_MILESTONES } from '../data/portfolioData';
import { soundFx } from '../utils/audio';
import { Monitor, Cpu, Trophy, Compass, Headphones, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<string>('monitors');

  const hotspots = [
    {
      id: 'monitors',
      title: 'Dual 4K Development Rig',
      icon: Monitor,
      desc: 'Dual calibrated displays running Unity 6, Visual Studio / Rider, and RenderDoc for deep GPU frame debugging.',
      specs: 'RTX 4090 · 64GB RAM · Multi-threaded shader compiling',
    },
    {
      id: 'journey',
      title: '5 Years Experience',
      icon: Trophy,
      desc: 'Specialized in character controllers, custom physics mechanics, and aggressive mobile optimization.',
      specs: '250,000+ total mobile players · Sub-16ms latency',
    },
    {
      id: 'audio',
      title: 'Audio & Sound Integration',
      icon: Headphones,
      desc: 'Interactive audio integration using FMOD and Unity Audio. Dynamic combat music stems and procedural sound synthesis.',
      specs: 'Binaural 3D audio occlusion · Ambisonic environment reverb',
    },
    {
      id: 'testing',
      title: 'Mobile Optimization Lab',
      icon: Cpu,
      desc: 'Rigorous profiling on low-end Android & iOS devices, Steam Deck, and standalone VR.',
      specs: 'Strict 60 FPS mobile target with zero-alloc garbage loops',
    },
  ];

  return (
    <section id="about" className="relative py-24 bg-[#090d16] border-t border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: ABOUT */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 flex items-center gap-2">
            <Compass className="w-4 h-4" />
            <span>Developer Profile</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white drop-shadow-[0_2px_12px_rgba(6,182,212,0.4)]">
            ABOUT
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-4 leading-relaxed">
            Turning imagination into interactive worlds through disciplined game engineering, tactile physics,
            and cutting-edge mobile optimization.
          </p>
        </div>

        {/* Split Layout: 3D Isometric Studio Room Environment on Left + Professional Bio on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: 3D Isometric Studio / Office Room Graphic & Hotspots */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-[#07090e] border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            {/* Diorama Graphic from Reference Board */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-800/80 mb-6 bg-slate-950">
              <img
                src="/public/assets/aistudio/image_7194b8a2.png"
                alt="Abdullah Khan 3D Isometric Game Dev Studio Office"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-bottom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-slate-900/90 border border-cyan-500/40 text-[11px] font-mono text-cyan-300 backdrop-blur-sm">
                ✦ Abdullah Khan's 3D Studio Environment
              </div>
            </div>

            {/* Interactive Hotspot Buttons */}
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase text-slate-400 mb-2">
                Click Workstation Hotspot to Inspect:
              </div>
              <div className="grid grid-cols-2 gap-2">
                {hotspots.map((spot) => {
                  const Icon = spot.icon;
                  const isActive = activeHotspot === spot.id;
                  return (
                    <button
                      key={spot.id}
                      onClick={() => {
                        soundFx.playClick();
                        setActiveHotspot(spot.id);
                      }}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer flex items-center gap-2 ${
                        isActive
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-semibold'
                          : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0 text-cyan-400" />
                      <span className="truncate">{spot.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hotspot Detailed Callout */}
            {(() => {
              const current = hotspots.find((h) => h.id === activeHotspot) || hotspots[0];
              return (
                <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-xs">
                  <div className="font-semibold text-white mb-1">{current.title}</div>
                  <p className="text-slate-300 leading-relaxed">{current.desc}</p>
                  <div className="mt-2 text-[11px] font-mono text-cyan-400">{current.specs}</div>
                </div>
              );
            })()}
          </div>

          {/* Right Column: Professional Bio & Visual Journey Board */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            {/* Bio Content: 5 Years Professional Experience */}
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                Hello, I'm <strong className="text-white">Abdullah Khan</strong>, a dedicated <strong className="text-cyan-400">Unity Game Developer and Software Engineer</strong> with over <strong className="text-cyan-300">5 years of professional experience</strong> bringing original game worlds and mechanical systems to life.
              </p>
              <p>
                My core specializations focus on <strong className="text-cyan-400">responsive character controllers</strong>, <strong className="text-purple-400">custom physics mechanics</strong>, and <strong className="text-emerald-400">aggressive mobile optimization</strong>. I bridge the gap between creative visual artistry and rock-solid engine performance, ensuring titles maintain 60 FPS across both desktop and resource-constrained mobile hardware.
              </p>
            </div>

            {/* Visual Journey Board: Milestone Tracker & Roadmap */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  <span>JOURNEY BOARD // ROADMAP</span>
                </h3>
                <span className="text-xs font-mono text-slate-500">CAREER PROGRESSION</span>
              </div>

              <div className="space-y-3">
                {JOURNEY_MILESTONES.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="text-cyan-400 font-semibold">{m.year}</span>
                      <span className="text-slate-400">{m.company}</span>
                    </div>
                    <div className="text-sm font-semibold text-white">{m.role}</div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{m.highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Philosophy Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 to-purple-950/40 border border-cyan-500/30 text-xs text-cyan-200 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>
                "Every frame counts. Great game design blends tactile kinetic response with lightweight architectural elegance."
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
