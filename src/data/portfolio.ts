export type ProjectComponent = {
  name: string
  description: string
  technologies: string[]
  screenshots?: string[]
}

export type Project = {
  id: string
  title: string
  description: string
  fullDescription?: string
  tech: string[]
  category: string
  featured: boolean
  image: string
  screenshots?: string[]
  components?: ProjectComponent[]
  url?: string
  liveUrl?: string
  githubUrl?: string
}

export type NavItem = {
  id: string
  label: string
}

export const portfolio = {
  initials: 'EB',
  name: 'Erick Boyle',
  brandName: 'Erick Boyle',
  role: 'Full Stack & Mobile App Developer',
  tagline:
    'Passionate about creating exceptional digital experiences through innovative web development and thoughtful design. I specialize in building scalable applications that make a difference.',
  available: true,
  availableLabel: 'Available for freelance work',
  avatar: '/images/avatar.jpg',
  cvUrl: '/Zwe_Mhan_Htet_Resume.pdf',
  videoSrc: '/videos/hero-loop.orig.mp4',
  social: {
    github: 'https://github.com/HaShiRaMaReiZo',
    linkedin: 'https://www.linkedin.com/in/zwe-mann-htet',
    email: 'mailto:zwemhanhtet2004@gmail.com',
    telegram: 'https://t.me/erickboyle',
    instagram: 'https://www.instagram.com/erick_boyle_2004',
    viber: 'viber://chat?number=+959792627041',
  },
  contact: {
    email: 'zwemhanhtet2004@gmail.com',
    phone: '+95 9792627041',
    location: 'Yangon, Myanmar',
  },
  about: {
    title: 'About Me',
    subtitle: 'Get to know more about my background and expertise',
    storyTitle: 'My Story',
    story: [
      "I'm a passionate full-stack developer with over 2 years of experience in creating digital solutions that make a difference. My journey began with a curiosity about how websites work, and it has evolved into a deep passion for crafting exceptional user experiences.",
      'I specialize in modern web technologies and have a strong foundation in both frontend and backend development. I love turning complex problems into simple, beautiful, and intuitive solutions. Passionate about creating exceptional digital experiences through innovative web development and thoughtful design.',
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
    { value: '2+', label: 'Years Experience', tone: 'green' as const },
    { value: '20+', label: 'Projects Completed', tone: 'purple' as const },
    { value: '10+', label: 'Happy Clients', tone: 'gold' as const },
    { value: '2', label: 'Countries Served', tone: 'blue' as const },
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
      id: 'delivery',
      title: 'Delivery Service Project',
      description:
        'A full-stack delivery service platform with Laravel backend, web dashboard, and two Flutter mobile applications for riders and clients.',
      fullDescription:
        'A comprehensive delivery service platform consisting of a Laravel REST API and web dashboard for administration, along with two Flutter mobile applications: one for delivery riders and another for clients. The system enables real-time order tracking, payment processing, and efficient delivery management.',
      tech: ['Laravel', 'PHP', 'Flutter', 'Dart', 'REST API', 'MySQL', 'Mobile Development'],
      category: 'Full Stack',
      featured: true,
      image: '/web-ss/web-1.jpg',
      screenshots: [
        '/web-ss/web-1.jpg',
        '/web-ss/web-2.jpg',
        '/web-ss/web-3.jpg',
        '/web-ss/web-5.jpg',
        '/web-ss/web-6.jpg',
        '/web-ss/web-7.jpg',
        '/rider-ss/rider-1.jpg',
        '/rider-ss/rider-2.jpg',
        '/rider-ss/rider-3.jpg',
        '/rider-ss/rider-4.jpg',
        '/rider-ss/rider-5.jpg',
        '/rider-ss/rider-6.jpg',
        '/client-ss/client-1.jpg',
        '/client-ss/client-2.jpg',
        '/client-ss/client-3.jpg',
        '/client-ss/client-4.jpg',
        '/client-ss/client-5.jpg',
        '/client-ss/client-6.jpg',
        '/client-ss/client-7.jpg',
      ],
      components: [
        {
          name: 'Laravel API & Web Dashboard',
          description:
            'Backend REST API and administrative web interface built with Laravel for managing orders, users, and deliveries.',
          technologies: ['Laravel', 'PHP', 'MySQL', 'REST API'],
          screenshots: [
            '/web-ss/web-1.jpg',
            '/web-ss/web-2.jpg',
            '/web-ss/web-3.jpg',
            '/web-ss/web-5.jpg',
            '/web-ss/web-6.jpg',
            '/web-ss/web-7.jpg',
          ],
        },
        {
          name: 'Rider App',
          description:
            'Flutter mobile application for delivery riders to receive orders, navigate to locations, and update delivery status.',
          technologies: ['Flutter', 'Dart', 'Mobile Development'],
          screenshots: [
            '/rider-ss/rider-1.jpg',
            '/rider-ss/rider-2.jpg',
            '/rider-ss/rider-3.jpg',
            '/rider-ss/rider-4.jpg',
            '/rider-ss/rider-5.jpg',
            '/rider-ss/rider-6.jpg',
          ],
        },
        {
          name: 'Client App',
          description:
            'Flutter mobile application for clients to place orders, track deliveries in real-time, and make payments.',
          technologies: ['Flutter', 'Dart', 'Mobile Development'],
          screenshots: [
            '/client-ss/client-1.jpg',
            '/client-ss/client-2.jpg',
            '/client-ss/client-3.jpg',
            '/client-ss/client-4.jpg',
            '/client-ss/client-5.jpg',
            '/client-ss/client-6.jpg',
            '/client-ss/client-7.jpg',
          ],
        },
      ],
    },
    {
      id: 'apk-manager',
      title: 'APK Manager',
      description:
        'A Laravel-based application management platform that allows developers to upload APK files and provides a client interface for users to browse, download, and install applications.',
      fullDescription:
        'A comprehensive Laravel web application that serves as a platform for managing Android APK files. The system features a developer interface where developers can upload, manage, and organize their applications. The client interface provides end-users with an intuitive way to browse available applications, view details, and download/install APK files directly to their devices.',
      tech: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'File Upload', 'Web Development'],
      category: 'Web Development',
      featured: true,
      image: '/apk-manager/am-1.jpg',
      screenshots: [
        '/apk-manager/am-1.jpg',
        '/apk-manager/developer-interface/di-1.jpg',
        '/apk-manager/developer-interface/di-2.jpg',
        '/apk-manager/developer-interface/di-3.jpg',
        '/apk-manager/developer-interface/di-4.jpg',
        '/apk-manager/client-interface/ci-1.jpg',
        '/apk-manager/client-interface/ci-2.jpg',
        '/apk-manager/client-interface/ci-3.jpg',
        '/apk-manager/client-interface/ci-4.jpg',
      ],
      components: [
        {
          name: 'Developer Interface',
          description:
            'Administrative interface for developers to upload, manage, and organize APK files. Includes file upload functionality, app metadata management, and developer dashboard.',
          technologies: ['Laravel', 'PHP', 'Bootstrap', 'File Upload'],
          screenshots: [
            '/apk-manager/developer-interface/di-1.jpg',
            '/apk-manager/developer-interface/di-2.jpg',
            '/apk-manager/developer-interface/di-3.jpg',
            '/apk-manager/developer-interface/di-4.jpg',
          ],
        },
        {
          name: 'Client Interface',
          description:
            'User-friendly interface for end-users to browse available applications, view app details, and download/install APK files directly to their devices.',
          technologies: ['Laravel', 'PHP', 'Bootstrap', 'JavaScript'],
          screenshots: [
            '/apk-manager/client-interface/ci-1.jpg',
            '/apk-manager/client-interface/ci-2.jpg',
            '/apk-manager/client-interface/ci-3.jpg',
            '/apk-manager/client-interface/ci-4.jpg',
          ],
        },
      ],
    },
    {
      id: 'expense-tracker',
      title: 'Expense Tracker App',
      description:
        'A React Native mobile application with Node.js backend for tracking personal expenses. Built as a learning project to practice React Native fundamentals.',
      fullDescription:
        'A React Native mobile application with Node.js backend for tracking personal expenses. This was my first React Native project, built for learning and training purposes. The app allows users to add, view, and manage their expenses. While the UI is basic, it demonstrates understanding of React Native core concepts, state management, and API integration with a Node.js backend.',
      tech: ['React Native', 'Node.js', 'JavaScript', 'Mobile Development', 'REST API'],
      category: 'Mobile Apps',
      featured: true,
      image: '/expense-tracker-ss/et1.jpg',
      screenshots: [
        '/expense-tracker-ss/et1.jpg',
        '/expense-tracker-ss/et2.jpg',
        '/expense-tracker-ss/et3.jpg',
        '/expense-tracker-ss/et4.jpg',
        '/expense-tracker-ss/et5.jpg',
        '/expense-tracker-ss/et6.jpg',
        '/expense-tracker-ss/et7.jpg',
        '/expense-tracker-ss/et8.jpg',
        '/expense-tracker-ss/et9.jpg',
      ],
      components: [
        {
          name: 'React Native Mobile App',
          description:
            'Mobile application built with React Native for tracking expenses. Includes features for adding, viewing, and managing expenses.',
          technologies: ['React Native', 'JavaScript', 'Mobile Development'],
          screenshots: [
            '/expense-tracker-ss/et1.jpg',
            '/expense-tracker-ss/et2.jpg',
            '/expense-tracker-ss/et3.jpg',
            '/expense-tracker-ss/et4.jpg',
            '/expense-tracker-ss/et5.jpg',
            '/expense-tracker-ss/et6.jpg',
            '/expense-tracker-ss/et7.jpg',
            '/expense-tracker-ss/et8.jpg',
            '/expense-tracker-ss/et9.jpg',
          ],
        },
        {
          name: 'Node.js Backend',
          description:
            'RESTful API backend built with Node.js to handle expense data, user authentication, and data persistence.',
          technologies: ['Node.js', 'JavaScript', 'REST API'],
        },
      ],
    },
  ] satisfies Project[],
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
        'Erick delivered a polished Flutter app and a solid Laravel backend. Communication was clear and deadlines were met.',
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
  nav: [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ] satisfies NavItem[],
}

export type Portfolio = typeof portfolio
