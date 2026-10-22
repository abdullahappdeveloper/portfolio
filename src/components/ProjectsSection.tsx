import React, { useState } from 'react';
import { WORK_PROJECTS, WorkProject } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { soundFx } from '../utils/audio';
import { Briefcase, Building2, Calendar, CheckCircle2, ChevronRight, Info, Sparkles } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<WorkProject | null>(null);

  const openProjectModal = (project: WorkProject) => {
    soundFx.playCrystal();
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="relative py-24 bg-[#07090e] border-t border-slate-900 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: WORK EXPERIENCE & PROJECTS */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>Studio Work Experience</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white drop-shadow-[0_2px_12px_rgba(6,182,212,0.4)]">
              WORK & SHIPPED TITLES
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Commercial mobile titles developed and optimized as Unity Developer at{' '}
              <strong className="text-slate-200">Abmira Gamers Studios, Lahore (Jul 2023 – May 2025)</strong>.
            </p>
          </div>

          {/* Studio Badge */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-center gap-2.5">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Abmira Gamers Studios, Lahore</span>
          </div>
        </div>

        {/* Project Grid: Stick Man Fight & Gun Sprint */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {WORK_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group relative bg-[#0b0f19] border border-slate-800/80 hover:border-cyan-500/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/40 flex flex-col justify-between"
            >
              {/* Screenshot Preview */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain sm:object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-black/30" />

                {/* Platform Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-slate-950/85 border border-cyan-500/40 text-[11px] font-mono text-cyan-300 backdrop-blur-md font-semibold">
                  {project.platform}
                </div>

                {/* Studio & Tenure Chip */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-slate-950/85 border border-purple-500/40 text-[10px] font-mono text-purple-300 backdrop-blur-md hidden sm:block">
                  {project.duration}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                      {project.company}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-display text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Bullet Points from User's Brief */}
                  <div className="mt-4 space-y-2">
                    {project.responsibilities.slice(0, 3).map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Footer: [Details] Button */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-xs text-slate-400 font-mono">
                    Target: <span className="text-cyan-300 font-semibold">{project.metrics[0]?.value}</span>
                  </div>

                  <button
                    onClick={() => openProjectModal(project)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-950/40 transition-all cursor-pointer hover:scale-105"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>View Project Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Streamlined Project Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
