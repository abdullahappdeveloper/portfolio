export interface WorkProject {
  id: string;
  title: string;
  tagline: string;
  category: 'Mobile' | 'All';
  platform: string;
  company: string;
  duration: string;
  image: string;
  role: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  metrics: {
    label: string;
    value: string;
  }[];
}

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: 'stick-man-fight',
    title: 'Stick Man Fight',
    tagline: 'Fast-paced mobile stickman combat game with dynamic AI and physics feedback',
    category: 'Mobile',
    platform: 'Unity | Mobile',
    company: 'Abmira Gamers Studios, Lahore',
    duration: 'Jul 2023 – May 2025',
    image: './assets/aistudio/stick_fight_thumbnail_61ccd20b.jpg',
    role: 'Unity Developer',
    description: 'Designed and implemented core combat mechanics, intelligent enemy AI, and mobile runtime optimizations for a hit mobile action stickman battler.',
    responsibilities: [
      'Designed and implemented core gameplay systems including player movement, Enemy AI, scoring, and in-game economy using C#.',
      'Built dynamic camera systems (follow + shake) to enhance combat feedback and player immersion.',
      'Integrated level progression, particle effects, and sound systems, improving gameplay clarity and responsiveness.',
      'Optimized runtime performance to maintain stable 60 FPS across low-to-mid range Android devices.',
    ],
    technologies: ['Unity Engine', 'C#', 'Mobile URP', 'Enemy AI', 'Camera Shake', 'Particle Systems', 'Android Optimization'],
    metrics: [
      { label: 'Framerate Target', value: 'Stable 60 FPS' },
      { label: 'Target Platforms', value: 'Low-to-Mid Android' },
      { label: 'Core Systems', value: 'Enemy AI & Economy' },
    ],
  },
  {
    id: 'gun-sprint',
    title: 'Gun Sprint',
    tagline: 'Hyper-engaging mobile weapon runner with physics recoil & modular game modes',
    category: 'Mobile',
    platform: 'Unity | Mobile',
    company: 'Abmira Gamers Studios, Lahore',
    duration: 'Jul 2023 – May 2025',
    image: './assets/aistudio/image_b46847f5.png',
    role: 'Unity Developer',
    description: 'Developed dual endless and level-based game modes, responsive gun physics kinematics, and scalable monetization shop systems.',
    responsibilities: [
      'Developed both Endless and Level-based game modes, increasing Replay ability and session length.',
      'Implemented weapon mechanics, bullet physics, and responsive gun movement systems.',
      'Designed and integrated shop and currency systems, enabling scalable monetization mechanics.',
      'Improved visual polish using particle effects and camera feedback, contributing to stronger user engagement.',
    ],
    technologies: ['Unity Engine', 'C#', 'Weapon Kinematics', 'Bullet Physics', 'Shop & Economy', 'Mobile Profiler'],
    metrics: [
      { label: 'Game Modes', value: 'Endless & Level-Based' },
      { label: 'Retention Boost', value: 'Extended Session Length' },
      { label: 'Monetization', value: 'Scalable Shop & Currency' },
    ],
  },
];

export interface SkillPillar {
  id: string;
  name: string;
  iconName: string;
  tagline: string;
  skills: {
    name: string;
    level: string;
    experience: string;
    description: string;
  }[];
}

export const SKILL_PILLARS: SkillPillar[] = [
  {
    id: 'programming',
    name: 'Programming',
    iconName: 'Code',
    tagline: 'Clean, robust code engineered for high-performance game loops and physics',
    skills: [
      { name: 'C#', level: 'Expert', experience: '5+ Years', description: 'Deep gameplay architecture, memory optimization, zero-alloc patterns, async systems' },
      { name: 'C++', level: 'Advanced', experience: '3 Years', description: 'Low-level engine programming, memory management, native plugin integrations' },
      { name: 'Python', level: 'Proficient', experience: '4 Years', description: 'Automation scripts, pipeline tooling, data processing, Blender Python API' },
      { name: 'GDScript', level: 'Proficient', experience: '2 Years', description: 'Godot 4 game mechanics, lightweight rapid prototyping, signal architectures' },
    ],
  },
  {
    id: 'engines-tools',
    name: 'Engines & Tools',
    iconName: 'Flame',
    tagline: 'Comprehensive engine mastery across major game development platforms',
    skills: [
      { name: 'Unity Engine (URP/HDRP)', level: 'Mastery', experience: '5+ Years', description: 'Complete pipeline mastery: Physics, Profiler, Shader Graph, Addressables, UI Toolkit' },
      { name: 'Godot 4', level: 'Advanced', experience: '2 Years', description: 'Scene tree architectures, node compositions, Vulkan mobile renderer deployment' },
      { name: 'Cocos2d-x', level: 'Proficient', experience: '2 Years', description: '2D mobile games, high-throughput sprite batching, cross-platform compilation' },
      { name: 'Git & Version Control', level: 'Expert', experience: '5 Years', description: 'Git LFS, branching strategies, automated CI/CD builds, Perforce collaboration' },
    ],
  },
  {
    id: 'art-design',
    name: 'Art & Design',
    iconName: 'Box',
    tagline: 'Artistic vision backed by technical asset pipeline expertise',
    skills: [
      { name: '3D Modeling & Retopology', level: 'Advanced', experience: '4 Years', description: 'Blender hard surface modeling, clean low-poly topologies, UV unwrapping' },
      { name: 'UI / UX for Games', level: 'Expert', experience: '5 Years', description: 'Diegetic HUD design, mobile touch feedback, responsive canvas scaling' },
      { name: 'Animation & Rigging', level: 'Advanced', experience: '4 Years', description: 'Humanoid blend trees, inverse kinematics (IK), procedural secondary motion' },
      { name: 'AI Asset Generation', level: 'Advanced', experience: '2 Years', description: 'Texture synthesis, concept ideation pipelines, AI-assisted sprite workflows' },
    ],
  },
];

export const JOURNEY_MILESTONES = [
  {
    year: 'Jul 2023 — May 2025',
    role: 'Unity Developer',
    company: 'Abmira Gamers Studios, Lahore',
    highlight: 'Shipped Stick Man Fight and Gun Sprint. Developed core gameplay, enemy AI, weapon recoil kinematics, in-game economy, and sustained 60 FPS mobile optimization.',
  },
  {
    year: '2022 — 2023',
    role: 'Gameplay & Physics Programmer',
    company: 'Freelance & Game Studios',
    highlight: 'Engineered responsive character controllers, camera follow-shake systems, and mobile touch feedback across diverse hyper-casual and action titles.',
  },
  {
    year: '2020 — 2022',
    role: 'Unity Game Developer',
    company: 'Indie Game Projects',
    highlight: 'Developed level progression pipelines, particle effects, UI/UX systems, and published mobile arcade games on Google Play.',
  },
];
