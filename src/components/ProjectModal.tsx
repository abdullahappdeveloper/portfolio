import React from 'react';
import { WorkProject } from '../data/portfolioData';
import { soundFx } from '../utils/audio';
import { X, CheckCircle2, Building2, Calendar, Smartphone, Sparkles, ShieldCheck } from 'lucide-react';

interface ProjectModalProps {
  project: WorkProject | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0b0f19] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden my-auto text-slate-200">
        {/* Modal Banner Media */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-950">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain sm:object-cover bg-black/90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/50 to-transparent" />

          {/* Close Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            title="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title and Studio Metadata */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800 text-[11px] font-mono font-semibold">
                {project.platform}
              </span>
              <span className="px-2.5 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800 text-[11px] font-mono">
                {project.role}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">{project.tagline}</p>
          </div>
        </div>

        {/* Studio & Tenure Ribbon */}
        <div className="bg-[#090d16] px-6 py-3 border-y border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2 text-cyan-400">
            <Building2 className="w-4 h-4" />
            <span className="text-slate-200">{project.company}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span>{project.duration}</span>
          </div>
        </div>

        {/* Modal Body: Responsibilities & Impact */}
        <div className="p-6 space-y-6 max-h-[55vh] overflow-y-auto">
          {/* Key Deliverables & Responsibilities */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Core Deliverables & Engineering Impact</span>
            </h3>
            <div className="space-y-2.5">
              {project.responsibilities.map((resp, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 text-xs sm:text-sm text-slate-300 flex items-start gap-3 leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance & Metrics Grid */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Optimization & Benchmarks</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.metrics.map((m) => (
                <div key={m.label} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[11px] text-slate-400">{m.label}</div>
                  <div className="text-sm font-bold font-mono text-cyan-300 mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Technologies & Systems
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 text-xs font-mono border border-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#090d16] border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="text-slate-400 font-mono text-[11px]">
            Platform: <span className="text-slate-200">{project.platform}</span>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
