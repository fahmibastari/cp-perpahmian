const PROJECTS = [
  {
    id: "sicater",
    name: "SiCater Ultimate",
    category: "Enterprise Systems",
    filters: ["enterprise", "mobile", "web"],
    year: "2026",
    role: "Full-stack product delivery",
    type: "Client work",
    timeline: "Ongoing",
    summary: "A three-tier utility management ecosystem connecting field meter operations with executive oversight.",
    description: "SiCater brings offline-first mobile inspections, AI-assisted OCR, NFC validation, route tracking, revenue estimation, abnormal-consumption analysis, and operational reporting into one connected system for water utilities.",
    cover: "image/sicater/Sicater Thumb Black.png",
    tech: ["NestJS", "React Native", "Expo", "TypeORM", "MySQL", "AI OCR", "NFC"],
    images: ["image/sicater/Thumbnail-Sicater.png", "image/sicater/Web-Dashboard.png", "image/sicater/Web-Revenue.png", "image/sicater/Web-MeterMap.png", "image/sicater/Mobile-DashboardStats.jpg", "image/sicater/Mobile-ScanNFC.jpg"]
  },
  {
    id: "magicpin",
    name: "Magic Pin",
    category: "AI & Mobile Ecosystem",
    filters: ["ai", "mobile", "web"],
    year: "2026",
    role: "Full-stack developer",
    type: "Collaborative work",
    timeline: "6 months",
    summary: "A multi-platform ecosystem for Disney pin collectors with AI-assisted scanning, maps, trading, and messaging.",
    description: "The product spans Android and iOS, a web dashboard, real-time messaging, subscription workflows, AI segmentation with PyTorch, and custom park maps rendered from high-resolution geographic tiles.",
    cover: "image/magicpin/MP Thumb Black.png",
    url: "https://www.magicpinapp.com/",
    linkLabel: "Product website",
    publicLinks: [
      { label: "App Store", url: "https://apps.apple.com/us/app/magicpin-disney-pin-collector/id1554341677", platform: "iOS" },
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=freshworks.io.magicpintrading", platform: "Android" }
    ],
    linkNote: "Published by S&P Holbrook, LLC. Store availability may vary by region and device.",
    tech: ["NestJS", "React Native", "Python", "PyTorch", "Socket.io", "PostgreSQL", "Leaflet"],
    images: ["image/magicpin/DashboardGuest3.png", "image/magicpin/Web - Map Tiles - List Map.png", "image/magicpin/Mobile - FullMapTiles.png", "image/magicpin/Mobile - Pin Detail.png"]
  },
  {
    id: "worldofbooth",
    name: "World of Booth",
    category: "3D Browser Experience",
    filters: ["3d", "web"],
    year: "2026",
    role: "Solo developer",
    type: "R&D project",
    timeline: "2 weeks",
    summary: "A browser-based 3D city where visitors explore, discover themed booths, and create local-first photostrips.",
    description: "Built with React Three Fiber and Three.js, the experience combines character and vehicle controls, BVH-accelerated collision, custom camera behaviour, webcam capture, and IndexedDB storage without requiring an account or backend upload.",
    cover: "image/worldOfBooth/MainMenu.png",
    url: "https://world-of-booth.vercel.app/",
    tech: ["React Three Fiber", "Three.js", "TypeScript", "Vite", "IndexedDB"],
    images: ["image/worldOfBooth/MainMenu.png", "image/worldOfBooth/Gameplay1.png", "image/worldOfBooth/Gameplay - Car Driving.png", "image/worldOfBooth/Booth - Cam Timer.png", "image/worldOfBooth/Booth - Result Review.png", "image/worldOfBooth/Booth - Gallery.png"]
  },
  {
    id: "flamboys",
    name: "Flamboys Roaster Ecosystem",
    category: "Operations & IoT",
    filters: ["enterprise", "mobile", "web"],
    year: "2026",
    role: "Lead developer",
    type: "Client work",
    timeline: "3 months",
    summary: "A connected operations system for coffee production, from roasting logs to live inventory intelligence.",
    description: "The mobile workflow captures precise roasting activity while the administrative platform centralizes inventory, production records, roaster management, and analysis.",
    cover: "image/flamboys/Flambo Thumb Black.png",
    url: "https://drive.google.com/file/d/1aQOnqPLuiHevr6noDFuJ0I9fySmNS4ZF/view?usp=sharing",
    linkLabel: "View project file",
    linkNote: "External file hosted on Google Drive.",
    tech: ["React Native", "Supabase", "Laravel", "Vue.js", "PostgreSQL", "Firebase"],
    images: ["image/flamboys/Mobile - HomeMenu.png", "image/flamboys/Mobile - RoastingSession.png", "image/flamboys/Admin - DashboardAnalytics.png", "image/flamboys/Admin - InventoryList.png", "image/flamboys/Admin - LogRORDetails.png", "image/flamboys/Admin - RoasterManagement.png"]
  },
  {
    id: "ubmstorage",
    name: "UBM Storage 3D",
    category: "Immersive Commerce",
    filters: ["3d", "web"],
    year: "2026",
    role: "Front-end developer",
    type: "Client work",
    timeline: "6 weeks",
    summary: "An interactive virtual store expressed through a playable retro-handheld interface in the browser.",
    description: "React Three Fiber, custom GLSL shaders, and a purpose-built interface turn a product catalogue into an explorable digital object rather than a conventional storefront.",
    cover: "image/ubmstorage/UBM Thumb Black.png",
    url: "https://console-rafyragah.netlify.app/",
    linkLabel: "Open browser demo",
    linkNote: "Interactive 3D demo. Requires a browser and device with WebGL support.",
    tech: ["React", "Three.js", "React Three Fiber", "GLSL", "Vite", "Zustand"],
    images: ["image/ubmstorage/Thumbnail.png", "image/ubmstorage/LP - 3D PSP.png", "image/ubmstorage/PSP - Boot Logo UBM.png", "image/ubmstorage/PSP - Menu Custom UI.png", "image/ubmstorage/PSP - Product Catalog.png"]
  },
  {
    id: "digivass",
    name: "DIGIVASS Field Ops",
    category: "Field Operations",
    filters: ["enterprise", "mobile", "web"],
    year: "2026",
    role: "Full-stack developer",
    type: "Client work",
    timeline: "4 months",
    summary: "An offline-first command centre connecting office managers with distributed field survey teams.",
    description: "The system combines mobile survey capture, geolocation validation, team coordination, data review, and real-time administrative analytics across one operational workflow.",
    cover: "image/digivass/Digivass Thumb Black.png",
    tech: ["React Native", "NestJS", "PostgreSQL", "Supabase", "Expo"],
    images: ["image/digivass/MobileMockup.png", "image/digivass/AdminDashboard.png", "image/digivass/AdminCreateSurvey.png", "image/digivass/AdminManageTeam.png", "image/digivass/AdminSurveyDetail.png", "image/digivass/AdminValidation.png"]
  },
  {
    id: "spekhp",
    name: "SpekHP",
    category: "Content Platform",
    filters: ["web", "enterprise"],
    year: "2026",
    role: "Full-stack developer",
    type: "Client work",
    timeline: "10 weeks",
    summary: "An Indonesian phone-specification portal with structured discovery, comparison, SEO, and custom CMS tooling.",
    description: "Built with Leaf MVC and Eloquent ORM, the platform combines device search, side-by-side comparison, structured content ingestion, advertising controls, sitemaps, and technical SEO metadata.",
    cover: "image/spekhp/Thumb Black.png",
    url: "https://perpahmian-dev.lovestoblog.com/",
    tech: ["Leaf MVC", "PHP", "Alpine.js", "MySQL", "Eloquent ORM", "Vite"],
    images: ["image/spekhp/Main.png", "image/spekhp/Main2.png", "image/spekhp/Dashboard-SearchHP.png", "image/spekhp/Dashboard-HPCompare.png", "image/spekhp/Admin-Dashboard.png"]
  },
  {
    id: "justspeak",
    name: "JustSpeak IELTS",
    category: "Education Platform",
    filters: ["web", "enterprise"],
    year: "2026",
    role: "Back-end developer",
    type: "Client work",
    timeline: "2 months",
    summary: "A synchronized classroom platform for IELTS practice, assessment, resources, and administrative analysis.",
    description: "Laravel and Inertia.js coordinate a responsive learning experience using optimized REST strategies for live practice, quiz delivery, assessment workflows, and progress analytics.",
    cover: "image/justspeak/Thumb Black.png",
    url: "https://justspeak.co.id/",
    linkNote: "Client-managed website. The current site may differ from the delivery documented here.",
    tech: ["Laravel", "Inertia.js", "Vue.js", "MySQL", "Tailwind CSS"],
    images: ["image/justspeak/Dashboard.png", "image/justspeak/Quiz.png", "image/justspeak/Resources.png", "image/justspeak/Admin - Dashboard.png", "image/justspeak/Admin - Analytics.png", "image/justspeak/Admin - Assessment.png"]
  },
  {
    id: "duzz",
    name: "DUZZ Analog Camera Lab",
    category: "Creative Product",
    filters: ["mobile", "web"],
    year: "2026",
    role: "Solo developer",
    type: "R&D project",
    timeline: "2 weeks",
    summary: "A mobile-first camera PWA with eighteen original film recipes and a privacy-first local photo library.",
    description: "A custom Canvas 2D pipeline handles exposure, grain, halation, dust, date stamps, and light leaks. IndexedDB provides local storage while optional private cloud backup runs behind anonymous-auth access controls.",
    cover: "image/duzz/Thumbnail.png",
    url: "https://duzz-sigma.vercel.app/",
    tech: ["Next.js", "React", "Canvas 2D", "Supabase", "IndexedDB", "PWA"],
    images: ["image/duzz/Thumbnail.png", "image/duzz/Gallery.png", "image/duzz/Camera.png", "image/duzz/Filter Menu 1.png", "image/duzz/Main + Studio.png"]
  },
  {
    id: "mental",
    name: "Mental Healing ID",
    category: "HealthTech",
    filters: ["web"],
    year: "2025",
    role: "Front-end developer",
    type: "Client work",
    timeline: "1 month",
    summary: "A psychology and counselling platform connecting service discovery, registration, and psychologist selection.",
    description: "The responsive platform brings together counselling information, service discovery, registration flows, psychologist profiles, and operational views for the care team.",
    cover: "image/mentalhealing/Thumb Black.png",
    url: "https://mentalhealing.id/home",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Chart.js"],
    images: ["image/mentalhealing/Dashboard.png", "image/mentalhealing/Layanan.png", "image/mentalhealing/ListPsikolog.png"]
  },
  {
    id: "2watuju",
    name: "2Watuju Architecture",
    category: "Architecture & VR",
    filters: ["3d", "web"],
    year: "2025",
    role: "Front-end developer",
    type: "Client work",
    timeline: "3 weeks",
    summary: "A fast architectural portfolio pairing technical SEO with immersive 360° project views.",
    description: "The Svelte build presents project catalogues, detailed case pages, and Panolens.js VR experiences while keeping the public site lightweight and discoverable.",
    cover: "image/2watuju/Thumb Black.png",
    url: "https://2watuju.com/",
    linkNote: "Client-managed website. The current site may differ from the delivery documented here.",
    tech: ["Svelte", "Panolens.js", "Three.js", "Vite", "Technical SEO"],
    images: ["image/2watuju/DashboardCatalog.png", "image/2watuju/About.png", "image/2watuju/ProjectDetail.png", "image/2watuju/ProjectReview.png"]
  },
  {
    id: "examlent",
    name: "Examlent",
    category: "Assessment SaaS",
    filters: ["web", "enterprise"],
    year: "2025",
    role: "Full-stack developer",
    type: "Product project",
    timeline: "2 months",
    summary: "A complete exam simulator for token-based entry, mixed question types, review, grading, and CSV reporting.",
    description: "Students move from access token to test completion in one guided flow, while administrators create packages, manage question types and passages, review attempts, and export results.",
    cover: "image/examlent/StudentLandingPage.png",
    tech: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "CSV Export"],
    images: ["image/examlent/StudentLandingPage.png", "image/examlent/StudentJoinPortal.png", "image/examlent/StudentJoinExam.png", "image/examlent/AdminPackageList.png", "image/examlent/AdminReviewStudentAttempt.png", "image/examlent/AdminExamResult.png"]
  },
  {
    id: "cced",
    name: "CCED Hiring Portal",
    category: "Public Sector",
    filters: ["enterprise", "web"],
    year: "2025",
    role: "Full-stack developer",
    type: "Client work",
    timeline: "3 months",
    summary: "A role-based job marketplace connecting university students, companies, and career-centre administrators.",
    description: "Separate journeys for candidates, employers, and administrators cover vacancy publishing, applications, profile management, and operational review.",
    cover: "image/cced/Thumb Black.png",
    tech: ["Laravel", "Vue.js", "MySQL", "Tailwind CSS", "RBAC"],
    images: ["image/cced/LandingPage.png", "image/cced/JobSeekerDashboard.png", "image/cced/CompanyDashboard.png", "image/cced/CompanyProfile.png", "image/cced/AdminDashboard.png"]
  },
  {
    id: "gamestation",
    name: "PERPAHMIAN Game Station",
    category: "Browser Gaming",
    filters: ["web"],
    year: "2025",
    role: "Solo developer",
    type: "R&D project",
    timeline: "2 months",
    summary: "A collection of ten playable browser games built without a game engine.",
    description: "Vanilla JavaScript, Canvas API, Web Audio, and Tone.js power a compact game platform spanning arcade, rhythm, puzzle, and action mechanics.",
    cover: "image/perpahmian-gamestation/Dashboard.png",
    url: "https://perpahmian-gamestation.netlify.app/",
    tech: ["Vanilla JavaScript", "Tone.js", "Canvas API", "Web Audio", "CSS"],
    images: ["image/perpahmian-gamestation/Dashboard.png", "image/perpahmian-gamestation/DashboardListGame.png", "image/perpahmian-gamestation/Game1.png", "image/perpahmian-gamestation/Game3.png", "image/perpahmian-gamestation/Game6.png"]
  },
  {
    id: "navaraprofile",
    name: "Navara City Park Profile",
    category: "Corporate CMS",
    filters: ["web"],
    year: "2025",
    role: "Full-stack developer",
    type: "Client work",
    timeline: "6 weeks",
    summary: "A corporate identity platform whose public content is managed through a custom administrative workflow.",
    description: "Every major section is editable through a Supabase-backed content system with responsive previews for consistent publishing.",
    cover: "image/navaraprofile/Navara.png",
    url: "https://navara-invitation.vercel.app/",
    tech: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    images: ["image/navaraprofile/1.png", "image/navaraprofile/2.png", "image/navaraprofile/3.png", "image/navaraprofile/4.png", "image/navaraprofile/5.png", "image/navaraprofile/6.png"]
  },
  {
    id: "navaraopening",
    name: "Navara Opening Invitation",
    category: "Event System",
    filters: ["web"],
    year: "2025",
    role: "Full-stack developer",
    type: "Client work",
    timeline: "2 weeks",
    summary: "A personalized event invitation system with guest-link generation and live RSVP tracking.",
    description: "Google Sheets integration connects guest records with unique invitation links, QR access, and response monitoring for event operations.",
    cover: "image/navaraopening/Navara.png",
    url: "https://navaraopening.netlify.app/",
    tech: ["Google Sheets API", "Laravel", "QR Code", "MySQL"],
    images: ["image/navaraopening/1.png", "image/navaraopening/2.png", "image/navaraopening/3.png", "image/navaraopening/4.png", "image/navaraopening/5.png", "image/navaraopening/6.png"]
  },
  {
    id: "freelance",
    name: "Freelancer Tracker",
    category: "Productivity Tool",
    filters: ["web"],
    year: "2025",
    role: "Solo developer",
    type: "Product project",
    timeline: "2 weeks",
    summary: "A local-first client, session, fee, timezone, and payment tracker for independent work.",
    description: "The application coordinates weekly activity across clients, multi-currency billing, payment status, and automatic timezone conversion without requiring a hosted account.",
    cover: "image/freelance/1.png",
    tech: ["Vanilla JavaScript", "IndexedDB", "LocalStorage", "CSS"],
    images: ["image/freelance/1.png", "image/freelance/2.png", "image/freelance/3.png", "image/freelance/4.png", "image/freelance/5.png", "image/freelance/6.png"]
  },
  {
    id: "wakaf",
    name: "SILAWAK Service",
    category: "Civic Technology",
    filters: ["web"],
    year: "2025",
    role: "Full-stack developer",
    type: "Client work",
    timeline: "2 months",
    summary: "A clear digital service for land-office waqf requirements, maps, documents, and public information.",
    description: "The service organizes requirements and guidance into accessible flows with interactive maps, expandable references, and connected document resources.",
    cover: "image/wakaf/BPN.png",
    tech: ["Laravel", "MySQL", "Tailwind CSS", "Alpine.js"],
    images: ["image/wakaf/1.png", "image/wakaf/2.png", "image/wakaf/3.png"]
  }
];

const PROJECT_DETAILS = {
  sicater: {
    kind: "Client work",
    workstream: "Operational systems",
    context: "A connected product ecosystem used within the operations of a regional water utility (PDAM/BUMD).",
    challenge: "Field meter work, validation, route activity, and management reporting needed to operate as one dependable workflow—even across uneven connectivity and different device capabilities.",
    response: "We connected an offline-first mobile application with administrative and management platforms, adding OCR-assisted capture, NFC and QR validation, route visibility, audit history, and operational reporting.",
    outcome: "A production-oriented system that gives field officers, administrators, and management a shared operational picture without forcing every role into the same interface.",
    proof: "Used in a regional water utility operating environment.",
    status: "Operational deployment"
  },
  magicpin: {
    kind: "Client work",
    workstream: "Digital platforms",
    context: "A production product for an overseas client serving the global Disney pin-collecting community.",
    challenge: "Collectors needed one coherent experience for discovering pins, organizing collections, navigating park maps, trading, messaging, and identifying items from mobile devices.",
    response: "The engagement connected native-feeling mobile workflows, a web platform, real-time messaging, geographic map tiles, subscriptions, and AI-assisted image processing.",
    outcome: "A multi-platform product released for public use on iOS and Android, supported by a connected web ecosystem.",
    proof: "Live production product available through the App Store and Google Play.",
    status: "Live product"
  },
  worldofbooth: {
    kind: "Independent R&D",
    workstream: "Immersive experiences",
    context: "An independent product experiment exploring how a photobooth can become a place visitors move through rather than a single utility screen.",
    challenge: "The experience needed to combine real-time 3D exploration, vehicle and character control, webcam capture, and a private local photo library inside the browser.",
    response: "A compact 3D city, multiple themed booths, accelerated collision detection, custom cameras, and local-first image storage were designed as one continuous journey.",
    outcome: "A playable browser experience that demonstrates production-minded interaction design without accounts or mandatory cloud uploads.",
    proof: "Publicly accessible interactive prototype.",
    status: "Independent release"
  },
  flamboys: {
    kind: "Client work",
    workstream: "Operational systems",
    context: "An internal product built to support the day-to-day operation of a coffee roasting business.",
    challenge: "Roasting activity, inventory, production history, and equipment records needed to move from fragmented handling into a traceable operational flow.",
    response: "We paired a focused mobile workflow for recording roasting sessions with an administrative system for inventory, production records, roaster management, and analysis.",
    outcome: "A purpose-built operational tool shaped around the work of the roasting team rather than a generic inventory template.",
    proof: "Built for use inside an active coffee roasting operation.",
    status: "Internal product"
  },
  ubmstorage: {
    kind: "Client work",
    workstream: "Immersive experiences",
    context: "A client product catalogue reimagined as an interactive browser-based object.",
    challenge: "The catalogue needed to feel distinctive and memorable while still allowing visitors to browse products without learning a complicated interaction model.",
    response: "We used a playable retro-handheld metaphor, spatial UI, custom shaders, a music layer, and a clear catalogue flow built with React Three Fiber.",
    outcome: "A branded product showcase that uses 3D interaction as a functional part of discovery rather than visual decoration.",
    proof: "Commissioned immersive catalogue delivered as client work.",
    status: "Client delivery"
  },
  digivass: {
    kind: "Client work",
    workstream: "Operational systems",
    context: "A field data collection platform for teams operating across multiple locations in Lampung province.",
    challenge: "Distributed teams needed a consistent way to submit location-aware records while coordinators needed clearer validation, assignment, and oversight from the office.",
    response: "We connected mobile-first survey capture, geolocation checks, team management, structured review, and administrative analytics in one operational system.",
    outcome: "A field operations tool capable of coordinating distributed data collection and organizing submissions across Lampung province.",
    proof: "Deployed to support field data collection across Lampung province.",
    status: "Operational deployment"
  },
  spekhp: {
    kind: "Client work",
    workstream: "Digital platforms",
    context: "An Indonesian client platform for finding, understanding, and comparing mobile-phone specifications.",
    challenge: "A large and changing device catalogue needed to remain searchable, comparable, manageable by editors, and discoverable through search engines.",
    response: "We created structured device pages, comparison tools, brand and search journeys, content ingestion workflows, advertising controls, and a custom administration area.",
    outcome: "A focused specification platform with both a consumer-facing discovery experience and the editorial tooling needed to operate it.",
    proof: "Commissioned platform with a dedicated content-management workflow.",
    status: "Client delivery"
  },
  justspeak: {
    kind: "Client work",
    workstream: "Digital platforms",
    context: "A company and learning platform for JustSpeak, an English-language institution.",
    challenge: "The institution needed its services, activities, blog, learning resources, and assessments to live in one manageable system, including quizzes with multiple question types and scoring rules.",
    response: "We combined a public company profile and content platform with resource publishing, quiz delivery, assessment workflows, scoring logic, and administrative analysis.",
    outcome: "A unified institutional platform that supports both public communication and the more complex mechanics of language assessment.",
    proof: "Live platform used by an operating language institution.",
    status: "Live platform"
  },
  duzz: {
    kind: "Independent R&D",
    workstream: "Digital products",
    context: "An independent exploration of tactile analog-camera behaviour inside a mobile-first web application.",
    challenge: "The product needed to make original visual recipes feel immediate while keeping captured photos private and useful without a mandatory account.",
    response: "A custom Canvas pipeline applies exposure, grain, halation, dust, date stamps, and light leaks, while IndexedDB manages a local photo library.",
    outcome: "A polished installable camera experiment with eighteen original recipes and a privacy-first storage model.",
    proof: "Publicly accessible independent product.",
    status: "Independent release"
  },
  mental: {
    kind: "Client work",
    workstream: "Digital platforms",
    context: "A company and service platform for a psychology and counselling provider.",
    challenge: "People needed a calmer path from understanding the available services to registering and selecting a suitable psychologist, while the organization needed clear operational views.",
    response: "We brought service discovery, psychologist profiles, registration journeys, and responsive operational interfaces into a coherent product surface.",
    outcome: "A clearer digital front door for counselling services, supported by practical selection and registration flows.",
    proof: "Live client platform for psychology and counselling services.",
    status: "Live platform"
  },
  "2watuju": {
    kind: "Client work",
    workstream: "Immersive experiences",
    context: "A company profile and project showcase for an interior and architectural design practice.",
    challenge: "Conventional project thumbnails could not fully communicate the spatial quality of completed homes and interiors.",
    response: "We combined a fast portfolio and catalogue with project detail pages and Panolens-powered 360° walkthroughs for spatial exploration.",
    outcome: "A discoverable company profile that lets prospective clients inspect selected environments beyond static imagery.",
    proof: "Live company profile with interactive 360° project views.",
    status: "Live platform"
  },
  examlent: {
    kind: "Independent R&D",
    workstream: "Digital products",
    context: "An independent product exploring the full operational workflow behind online examinations.",
    challenge: "Mixed question types, reading passages, token-based access, scoring, attempt review, and reporting needed to remain understandable for both students and administrators.",
    response: "We designed connected student and administrator journeys covering package creation, assessment delivery, grading, review, and CSV reporting.",
    outcome: "A complete assessment-system prototype that demonstrates deeper workflow and data-model thinking beyond a simple quiz interface.",
    proof: "Functional independent assessment product.",
    status: "Independent product"
  },
  cced: {
    kind: "Client work",
    workstream: "Digital platforms",
    context: "A role-based employment platform for the career-development unit at Universitas Lampung.",
    challenge: "Students and fresh graduates needed a trustworthy place to find opportunities while employers and university administrators required separate publishing and review workflows.",
    response: "We created tailored journeys for candidates, employers, and administrators, including profiles, vacancy publishing, applications, and operational review.",
    outcome: "A university-connected hiring platform designed to help Universitas Lampung students and graduates access employment opportunities.",
    proof: "Built for an academic service unit at Universitas Lampung.",
    status: "Institutional platform"
  },
  gamestation: {
    kind: "Independent R&D",
    workstream: "Digital products",
    context: "An independent collection exploring browser-native game mechanics without a game engine.",
    challenge: "Ten different games needed to share a coherent platform while handling animation, sound, input, state, and distinct gameplay rules using browser APIs.",
    response: "We built the collection with JavaScript, Canvas, Web Audio, and Tone.js, creating reusable platform patterns around varied arcade, rhythm, puzzle, and action mechanics.",
    outcome: "A compact playable game station demonstrating interaction engineering across multiple genres.",
    proof: "Publicly accessible independent game collection.",
    status: "Independent release"
  },
  navaraprofile: {
    kind: "Client work",
    workstream: "Company platforms",
    context: "A company profile and managed project showcase for Navara City Park.",
    challenge: "The organization needed consistent public presentation without requiring developers for routine content updates.",
    response: "We paired responsive public pages with a Supabase-backed content workflow and previews for major editable sections.",
    outcome: "A maintainable company platform that gives the internal team direct control over its published content.",
    proof: "Commissioned company profile with custom content management.",
    status: "Client delivery"
  },
  navaraopening: {
    kind: "Client work",
    workstream: "Company platforms",
    context: "A personalized digital invitation and RSVP tool for a company opening event.",
    challenge: "Guest information, individual links, access, and attendance responses needed to remain coordinated during event preparation.",
    response: "We connected spreadsheet-based guest records with personalized invitation links, QR access, and live response tracking.",
    outcome: "A focused event tool that brings invitation distribution and RSVP monitoring into one coordinated workflow.",
    proof: "Delivered for a real company opening event.",
    status: "Event delivery"
  },
  freelance: {
    kind: "Independent R&D",
    workstream: "Digital products",
    context: "An independent utility built around the recurring administrative work of freelancers.",
    challenge: "Client activity, sessions, fees, currencies, time zones, and payment status were easy to lose across unrelated tools.",
    response: "A local-first application centralizes weekly work records, billing context, payment state, and timezone conversion without requiring a hosted account.",
    outcome: "A compact productivity product shaped around a real independent-work workflow.",
    proof: "Functional local-first product experiment.",
    status: "Independent product"
  },
  wakaf: {
    kind: "Client work",
    workstream: "Company platforms",
    context: "A focused public-information page commissioned by BPN Sukoharjo for its waqf land service.",
    challenge: "Requirements, supporting documents, maps, and service guidance needed to be easier for the public to find and understand in one place.",
    response: "We organized the service into accessible information flows with expandable references, interactive maps, and connected document resources.",
    outcome: "A single-purpose civic page that makes a specialized public service more legible and accessible.",
    proof: "Commissioned for BPN Sukoharjo.",
    status: "Public service delivery"
  }
};

// Editorial case notes: supplied client context + the existing project archive.
// These describe implementation, not independently measured business results.
// Screen numbers reference the public gallery, starting at 1.
const PROJECT_CASE_STUDIES = {
  sicater: {
    title: "Connecting meter work with utility oversight.",
    contribution: "Full-stack delivery across the mobile field application and office-facing systems. The work connects meter capture and validation with the records and reporting used by administrators and management.",
    decisions: [
      { title: "Keep field work mobile", body: "The field application brings operational information to the device used on site. Offline-first capture addresses work in areas where a continuous connection cannot be assumed.", screen: 5 },
      { title: "Make meter identity part of capture", body: "NFC verification sits alongside the meter-reading workflow. The interface makes the meter being checked an explicit part of the record, rather than relying on a reading alone.", screen: 6 },
      { title: "Give the office a different view", body: "The administrative dashboard organizes utility operations for review. Field capture and office oversight share a product ecosystem without needing the same interface.", screen: 2 }
    ],
    delivery: "Used by a regional water utility (PDAM/BUMD). The public material shows field and office interfaces; it does not publish utility records or quantify operational savings."
  },
  magicpin: {
    title: "A collecting experience across web and mobile.",
    contribution: "Full-stack development within a collaborative engagement for an overseas client. The contribution spans the connected web and mobile product, including collector workflows, map experiences, real-time communication, and AI-assisted image processing.",
    decisions: [
      { title: "Give the web product its own entry point", body: "The web presentation introduces the collector platform and its mobile experience. It gives visitors a way to understand the product before moving into individual collecting workflows.", screen: 1 },
      { title: "Start map exploration with a park", body: "Park selection and geographic map tiles form a dedicated discovery interface. The same mapping capability appears on mobile, where the available screen space is very different.", screen: 2 },
      { title: "Give each pin a dedicated detail view", body: "A mobile detail screen separates information about an individual pin from the wider collection. This keeps item-level interaction distinct from browsing and navigation.", screen: 4 }
    ],
    delivery: "Released for public use on iOS and Android, with a connected website. Selected web and mobile screens document the collector experience presented here."
  },
  flamboys: {
    title: "Software shaped around the roasting floor.",
    contribution: "Lead development of an internal operations tool: a mobile workflow for the roasting team and an administrative platform for production, inventory, and equipment records.",
    decisions: [
      { title: "Record a session where the work happens", body: "A focused mobile session view supports the act of recording roasting activity. It separates production input from the broader reporting workspace.", screen: 2 },
      { title: "Keep inventory in the operating system", body: "Inventory has a dedicated administrative view alongside production records. The product scope covers the materials around roasting, not just the roasting session itself.", screen: 4 },
      { title: "Keep detailed logs available for review", body: "A roasting-curve detail view lets the team inspect recorded activity beyond a dashboard summary. Equipment management is handled in a separate administrative view.", screen: 5 }
    ],
    delivery: "An internal tool built for a coffee-roasting business. The linked resource is a project file, not access to the company's operational application."
  },
  ubmstorage: {
    title: "A product catalogue you can explore.",
    contribution: "Front-end development of a commissioned 3D catalogue experience. The work combines a browser-rendered handheld object, a custom interface, and product browsing using React Three Fiber and GLSL.",
    decisions: [
      { title: "Make the catalogue an object", body: "The client wanted a distinctive way to present products. A retro-handheld form provides the visual setting for the catalogue rather than functioning as an unrelated decorative scene.", screen: 2 },
      { title: "Give the object a usable interface", body: "A custom menu bridges the 3D presentation and the catalogue. Visitors have a recognizable navigation surface within the handheld concept.", screen: 4 },
      { title: "Keep products at the destination", body: "The catalogue screen is the functional endpoint of the experience. The interaction leads back to the client's products instead of ending with the 3D effect.", screen: 5 }
    ],
    delivery: "A commissioned interactive catalogue. The public website and interface captures demonstrate the product presentation and front-end interaction; the scope described here is catalogue discovery."
  },
  digivass: {
    title: "From field submissions to coordinated review.",
    contribution: "Full-stack development of field-data tooling for work across Lampung province. The scope connects a mobile survey workflow with office tools for survey setup, team management, and record validation.",
    decisions: [
      { title: "Define the survey before collection", body: "An administrative survey-creation view gives coordinators a place to prepare the information to be collected. Survey setup is kept separate from day-to-day field submission.", screen: 3 },
      { title: "Make team coordination visible", body: "A dedicated team-management interface supports coordination across distributed field workers. It complements the mobile toolkit used to capture records on site.", screen: 4 },
      { title: "Give incoming records a review step", body: "Validation has its own administrative surface. Coordinators can work with submitted records as a review workflow, not only as totals on a dashboard.", screen: 6 }
    ],
    delivery: "Used for field data collection across Lampung province. Selected interfaces document survey setup, team coordination, and validation; the case study focuses on the operational tooling."
  },
  cced: {
    title: "One career platform, distinct responsibilities.",
    contribution: "Full-stack development of a hiring portal for CCED, an academic service unit at Universitas Lampung. The scope covers candidate, employer, and administrator journeys within one role-based platform.",
    decisions: [
      { title: "Give candidates their own workspace", body: "Students, fresh graduates, and other job seekers use a candidate-facing journey. Its dashboard is distinct from the tools used to publish and administer vacancies.", screen: 2 },
      { title: "Separate the employer's work", body: "Companies have a dedicated workspace and profile surface. Employer workflows sit within the same platform without exposing administrative tasks to job seekers.", screen: 3 },
      { title: "Provide an institutional oversight view", body: "The administrator dashboard supports operational review across the portal. Role separation is part of the product structure, not simply a different landing page for each audience.", screen: 5 }
    ],
    delivery: "Built for CCED at Universitas Lampung to support access to employment opportunities. The gallery documents the candidate, employer, and administrator interfaces rather than individual hiring outcomes."
  },
  justspeak: {
    title: "Beyond a profile: content, learning, assessment.",
    contribution: "Back-end development for a language institution's company and learning platform. The contribution includes content and resource workflows, quiz delivery, multiple question types, and assessment scoring logic.",
    decisions: [
      { title: "Connect the institution and its learning offer", body: "The public platform introduces the institution alongside its services and activities. Learning functionality belongs to the same product as its company profile and published content.", screen: 1 },
      { title: "Treat assessment as more than a form", body: "The quiz interface is backed by different question types and scoring rules. That scoring work is a distinct part of the implementation, beyond presenting questions on a page.", screen: 2 },
      { title: "Give assessment an administrative side", body: "Assessment management has a dedicated workspace alongside resources and analytics. The scope includes operating the learning content, not only taking a quiz.", screen: 6 }
    ],
    delivery: "A client platform for an English-language institution. Selected screens show the public platform, learning resources, quiz experience, and assessment administration."
  },
  '2watuju': {
    title: "Let prospective clients explore the space.",
    contribution: "Front-end development of the practice's company profile and project showcase. The work includes recommending and integrating Panolens-powered 360° views alongside the conventional project catalogue.",
    decisions: [
      { title: "Start with a readable project catalogue", body: "The catalogue gives visitors a conventional way to browse the practice's work before opening an individual home or interior project.", screen: 1 },
      { title: "Give each project its own context", body: "Project detail pages sit between the catalogue and deeper spatial exploration. They let individual work be presented as more than a thumbnail in a grid.", screen: 3 },
      { title: "Extend the showcase into 360°", body: "Panolens adds an interactive way to look around selected spaces. A screenshot records the interface; the spatial interaction itself is experienced on the project website.", screen: 4 }
    ],
    delivery: "A commissioned company profile and architectural showcase with 360° project exploration. The gallery provides still views; the linked website is the destination for the interactive experience."
  }
};

// Explicit public-facing captions. Keep these aligned with each project's images.
// Numbered source files use neutral labels until their individual screens are curated.
const PROJECT_GALLERY_TITLES = {
  sicater: ["The field-to-office ecosystem", "An overview of utility operations", "Revenue reporting", "Meter locations and field coverage", "Operational statistics on mobile", "NFC meter verification"],
  magicpin: ["The collector platform on the web", "Park selection and map exploration", "Park maps on mobile", "A pin's collection details"],
  worldofbooth: ["Entering the virtual city", "Exploring the city on foot", "Driving between locations", "The photobooth countdown", "Reviewing a photostrip", "The photo gallery"],
  flamboys: ["The roasting team's mobile workspace", "Recording a roasting session", "Production analytics", "Inventory records", "Reviewing a roasting curve", "Roaster management"],
  ubmstorage: ["The interactive catalogue concept", "A handheld-inspired browser experience", "The branded boot sequence", "Navigating the custom interface", "Exploring the product catalogue"],
  digivass: ["The field team's mobile toolkit", "An overview of field operations", "Creating a survey", "Managing field teams", "Reviewing a survey record", "Validating incoming records"],
  spekhp: ["The phone-specification platform", "Browsing the public website", "Finding a phone", "Comparing phone specifications", "The editorial workspace"],
  justspeak: ["The institution's public platform", "The quiz experience", "Learning resources", "The administration workspace", "Learning analytics", "Assessment management"],
  duzz: ["The analog camera concept", "The photo library", "The camera experience", "Choosing a film recipe", "The camera and editing studio"],
  mental: ["The counselling platform", "Exploring counselling services", "Choosing a psychologist"],
  '2watuju': ["The architectural project catalogue", "Introducing the practice", "An individual project", "Exploring a project in detail"],
  examlent: ["The student entry page", "Joining an examination", "Entering the exam session", "Managing exam packages", "Reviewing a student's attempt", "Exam results and reporting"],
  cced: ["The university careers platform", "The job seeker's workspace", "The employer's workspace", "A company profile", "The administrator's workspace"],
  gamestation: ["The browser game station", "Choosing a game", "A view inside the game collection", "Another playable experience", "Exploring the game collection"],
  navaraprofile: ["Company profile · screen 01", "Company profile · screen 02", "Company profile · screen 03", "Company profile · screen 04", "Company profile · screen 05", "Company profile · screen 06"],
  navaraopening: ["Event invitation · screen 01", "Event invitation · screen 02", "Event invitation · screen 03", "Event invitation · screen 04", "Event invitation · screen 05", "Event invitation · screen 06"],
  freelance: ["Freelancer workspace · screen 01", "Freelancer workspace · screen 02", "Freelancer workspace · screen 03", "Freelancer workspace · screen 04", "Freelancer workspace · screen 05", "Freelancer workspace · screen 06"],
  wakaf: ["Public service information · screen 01", "Public service information · screen 02", "Public service information · screen 03"]
};

const WORKSTREAM_FILTERS = {
  "Operational systems": "operations",
  "Digital platforms": "platforms",
  "Digital products": "platforms",
  "Company platforms": "platforms",
  "Immersive experiences": "immersive"
};

PROJECTS.forEach((project) => {
  Object.assign(project, PROJECT_DETAILS[project.id]);
  project.caseStudy = PROJECT_CASE_STUDIES[project.id] || null;
  project.gallery = project.images.map((src, index) => ({
    src, title: PROJECT_GALLERY_TITLES[project.id][index]
  }));
  project.filters = [...new Set([
    ...project.filters,
    project.kind === "Client work" ? "client" : "rd",
    WORKSTREAM_FILTERS[project.workstream]
  ].filter(Boolean))];
});

const FEATURED_PROJECT_IDS = ["sicater", "magicpin", "digivass", "flamboys", "cced", "ubmstorage"];

function getProject(id) {
  return PROJECTS.find((project) => project.id === id);
}
