export const portfolio = {
  initials: 'EB',
  name: 'Erick Boyle',
  brandName: 'Erick Boyle',
  role: 'Flutter & Full Stack Developer',
  tagline:
    'I build exceptional digital experiences with Flutter, Laravel & modern technologies.',
  available: true,
  availableLabel: 'Available for freelance work',
  avatar: '/images/avatar.jpg',
  cvUrl: '/cv.pdf',
  videoSrc: '/videos/hero-loop.mp4?v=4',
  social: {
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/',
    email: 'mailto:zwemannhtet65@gmail.com',
    website: 'https://erickboyle.website/',
  },
  contact: {
    email: 'zwemannhtet65@gmail.com',
    phone: '+95 9792627041',
    location: 'Yangon, Myanmar',
  },
  about: {
    title: 'About Me',
    subtitle: 'Get to know more about my background and expertise',
    storyTitle: 'My Story',
    story: [
      "I'm a passionate full-stack developer with over 3 years of experience in creating digital solutions that make a difference. My journey began with a curiosity about how websites work, and it has evolved into a deep passion for crafting exceptional user experiences.",
      'I specialize in modern web technologies and have a strong foundation in both frontend and backend development. I love turning complex problems into simple, beautiful, and intuitive solutions.',
    ],
    highlights: [
      {
        title: 'Clean Code',
        description:
          'I write maintainable, scalable, and well-documented code following industry best practices.',
      },
      {
        title: 'Responsive Design',
        description:
          'Creating beautiful, responsive interfaces that work perfectly across all devices and screen sizes.',
      },
      {
        title: 'Performance',
        description:
          'Optimizing applications for speed and efficiency to deliver the best user experience possible.',
      },
    ],
  },
  stats: [
    { value: '3+', label: 'Years Experience', tone: 'green' as const },
    { value: '25+', label: 'Projects Completed', tone: 'purple' as const },
    { value: '15+', label: 'Happy Clients', tone: 'gold' as const },
    { value: '3', label: 'Countries Served', tone: 'blue' as const },
  ],
  skills: [
    { name: 'Flutter', level: 80 },
    { name: 'JavaScript / TypeScript', level: 70 },
    { name: 'HTML / CSS', level: 70 },
    { name: 'React / Next.js', level: 65 },
    { name: 'Node.js', level: 65 },
    { name: 'Bootstrap / Tailwind', level: 65 },
    { name: 'PHP / Laravel', level: 65 },
    { name: 'MySQL', level: 60 },
    { name: 'PostgreSQL', level: 60 },
  ],
  projects: [
    {
      id: 'merchant-app',
      title: 'Merchant App',
      description:
        'Merchant-facing mobile experience for order management and store operations, built with Flutter and a Laravel API.',
      tech: ['Flutter', 'Laravel', 'MySQL'],
      category: 'Mobile Apps',
      featured: true,
      image: '/images/projects/merchant.jpg',
      url: '#',
    },
    {
      id: 'tracking-system',
      title: 'Tracking System',
      description:
        'Real-time tracking and monitoring platform with Flutter clients, Laravel APIs, and Socket.io live updates.',
      tech: ['Flutter', 'Laravel', 'Socket.io'],
      category: 'Full Stack',
      featured: true,
      image: '/images/projects/tracking.jpg',
      url: '#',
    },
    {
      id: 'ecommerce-app',
      title: 'E-Commerce App',
      description:
        'Fashion e-commerce experience with Flutter storefront and Laravel/Bagisto backend for catalog and checkout.',
      tech: ['Flutter', 'Laravel', 'Bagisto'],
      category: 'Mobile Apps',
      featured: true,
      image: '/images/projects/ecommerce.jpg',
      url: '#',
    },
    {
      id: 'analytics-dashboard',
      title: 'Analytics Dashboard',
      description:
        'Dark-themed analytics dashboard with charts, activity feeds, and role-based views powered by Flutter and Node.js.',
      tech: ['Flutter', 'Node.js', 'MongoDB'],
      category: 'Web Development',
      featured: true,
      image: '/images/projects/analytics.jpg',
      url: '#',
    },
    {
      id: 'delivery',
      title: 'Delivery Service Project',
      description:
        'A full-stack delivery service platform with Laravel backend, web dashboard, and two Flutter mobile applications for riders and clients.',
      tech: ['Laravel', 'PHP', 'Flutter', 'Dart', 'REST API', 'MySQL'],
      category: 'Full Stack',
      featured: false,
      image: '/images/projects/merchant.jpg',
      url: '#',
    },
    {
      id: 'apk-manager',
      title: 'APK Manager',
      description:
        'A Laravel-based application management platform that allows developers to upload APK files and provides a client interface for users to browse, download, and install applications.',
      tech: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
      category: 'Web Development',
      featured: false,
      image: '/images/projects/analytics.jpg',
      url: '#',
    },
  ],
  experience: [
    {
      role: 'Full Stack Developer',
      company: 'Freelance / Client Projects',
      period: '2023 — Present',
      description:
        'Building web dashboards, Laravel APIs, and Flutter apps for clients across delivery, app distribution, and business tools.',
    },
    {
      role: 'Mobile & Web Developer',
      company: 'Personal & Learning Projects',
      period: '2022 — 2023',
      description:
        'Focused on Flutter, React Native, and modern frontend foundations while shipping portfolio and practice applications.',
    },
  ],
  testimonials: [
    {
      quote:
        'Zwe delivered a polished Flutter app and a solid Laravel backend. Communication was clear and deadlines were met.',
      author: 'Client Partner',
      role: 'Product Owner',
    },
    {
      quote:
        'Reliable, detail-oriented, and great at turning requirements into clean, usable interfaces.',
      author: 'Collaborator',
      role: 'Project Lead',
    },
  ],
  blog: [
    {
      title: 'Building delivery apps with Flutter & Laravel',
      excerpt:
        'Notes from shipping rider and client apps backed by a shared Laravel API.',
      date: '2025',
      tag: 'Mobile',
    },
    {
      title: 'APK distribution without the friction',
      excerpt:
        'How a simple upload-and-browse flow helps teams share internal Android builds.',
      date: '2025',
      tag: 'Web',
    },
    {
      title: 'Clean code habits that stick',
      excerpt:
        'Small practices that keep Flutter and Laravel codebases maintainable as they grow.',
      date: '2024',
      tag: 'Engineering',
    },
  ],
  nav: [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ],
} as const

export type Portfolio = typeof portfolio
export type NavItem = (typeof portfolio.nav)[number]
export type Project = (typeof portfolio.projects)[number]
