/* =========================================================
   EDIT THIS FILE ONLY. Everything on the site comes from here.
   Search for "EDIT" to find the things you must change.
   ========================================================= */

const GITHUB_USER = "roziboyahmadaliyev1310-sy";

const PROFILE = {
  name: "Roziboy Ahmadaliyev",
  log: "cybersecurity student · portfolio online",
  roles: ["Cybersecurity learner", "Web developer", "Problem solver", "Team player"],
  tagline: "Cybersecurity is my future path, and I’m building strong technical foundations in coding, design, and problem solving while growing as a student and developer.",
  photo: "photo.jpg",
  resume: "resume.pdf",
  email: "roziboyahmadaliyev1310@gmail.com",
  linkedin: "",
  location: "South Korea, Songnam",
  mainRepo: "portfolio",
  formEndpoint: "",
  stickers: ["Cyber ready", "Est. 2026"],
  footer: "Built with passion, code, and constant learning."
};

const ABOUT = {
  title: "Computer engineering student with a cyber future",
  paragraphs: [
    "My name is Roziboy Ahmadaliyev, and I am a computer engineering student with a strong interest in cybersecurity, coding, and practical problem solving.",
    "I am currently in my second year of study, and I have completed about 70% of the program. I am doing well and continuing to improve every day through projects, homework, and hands-on learning.",
    "I enjoy learning languages and technologies such as Python, HTML, CSS, JavaScript, Java, PHP, and other coding tools. My long-term goal is to build a career in cybersecurity, while also strengthening my web development skills and communication abilities."
  ]
};

const CONSOLE = {
  whoami: ["Roziboy Ahmadaliyev, computer engineering student.", "Cybersecurity future · web developer in progress."],
  education: ["Computer Engineering, 2 years completed.", "Study progress: about 70%.", "Goal: build a professional career in cybersecurity."],
  languages: ["English (Advanced)", "Uzbek (Native)", "Korean (Intermediate)"],
  interests: ["Cybersecurity", "Web development", "Football", "Video games", "Team communication"],
  goals: ["Become a cybersecurity professional.", "Keep building real projects with clean code and strong logic."],
  "ls projects": ["portfolio/", "webpro-w9/", "webpro-book-search/", "python_tasks/", "weather-forecast/"]
};

const TIMELINE = [
  { when: "2026", title: "Focused on security and web skills", text: "Continuing my university studies while building projects in Python, web design, and cybersecurity foundations." },
  { when: "2026", title: "Learning by building", text: "I developed several small websites and coding projects to strengthen my HTML, CSS, JavaScript, and problem-solving skills." },
  { when: "2025", title: "Computer engineering journey", text: "Started my second year and continued improving my technical knowledge and study discipline." },
  { when: "2024", title: "Strong technical foundation", text: "Built my interest in programming, logic, software, and future career growth in technology." }
];

const CLASSES = {
  sub: "I am learning coding, web development, computer engineering fundamentals, and cybersecurity-related skills. My progress is strong and still growing.",
  list: [
    { code: "CENG", name: "Computer Engineering Fundamentals", term: "2024 – present", what: "Programming logic, systems thinking, and engineering problem solving.", progress: 70 },
    { code: "WEB", name: "Web Programming", term: "2026", what: "HTML, CSS, JavaScript, GitHub, Git, and project deployment.", progress: 88 },
    { code: "PY", name: "Python Programming", term: "2026", what: "Python logic, scripting, automation, and problem solving.", progress: 82 },
    { code: "SEC", name: "Cybersecurity Foundations", term: "2026", what: "Security mindset, network awareness, digital safety, and future career preparation.", progress: 76 }
  ]
};

const SKILLS = [
  { name: "Python", cat: "Languages", note: "Strong logic, scripting, automation, and task solving using Python.", usedIn: ["portfolio", "python-tasks", "weather-forecast"] },
  { name: "HTML", cat: "Languages", note: "Semantic structure and clean page layouts for real websites.", usedIn: ["portfolio", "w9", "book-search", "weather-forecast"] },
  { name: "CSS", cat: "Languages", note: "Responsive design, visual styling, and creative modern layouts.", usedIn: ["portfolio", "book-search", "weather-forecast"] },
  { name: "JavaScript", cat: "Languages", note: "DOM interaction, functionality, and interactive user experiences.", usedIn: ["portfolio", "book-search", "weather-forecast"] },
  { name: "Java", cat: "Languages", note: "Object-oriented programming and structure-building practice.", usedIn: ["univer-project", "c-language"] },
  { name: "PHP", cat: "Languages", note: "Backend logic and dynamic web application basics.", usedIn: ["univer-project"] },
  { name: "SQL / Databases", cat: "Data", note: "Basic database management and data organization for web apps.", usedIn: ["univer-project"] },
  { name: "Cybersecurity", cat: "Security", note: "My future professional direction and growing interest in secure systems.", usedIn: ["portfolio", "security-practice"] },
  { name: "Git & GitHub", cat: "Tools", note: "Version control, publishing work publicly, and collaborating with clear project history.", usedIn: ["portfolio", "w9", "book-search", "python-tasks", "weather-forecast"] },
  { name: "GitHub Pages", cat: "Tools", note: "Simple and reliable deployment for static web projects.", usedIn: ["portfolio", "w9", "book-search", "weather-forecast"] },
  { name: "Communication", cat: "Soft Skills", note: "Working with others, explaining ideas clearly, and improving collaboration.", usedIn: ["portfolio", "univer-project"] },
  { name: "Problem Solving", cat: "Soft Skills", note: "Breaking problems into steps and building practical solutions with logic and creativity.", usedIn: ["portfolio", "book-search", "weather-forecast"] }
];

const PROJECTS = [
  { id: "portfolio", title: "This portfolio", repo: "portfolio", tags: ["HTML", "CSS", "JavaScript", "UI/UX"], text: "A modern personal portfolio with a black sky theme, animated background, project sections, contact links, and resume details.", big: true },
  { id: "book-search", title: "Book Search", repo: "webpro-book-search", tags: ["JavaScript", "API", "GitHub Pages"], text: "A book search app using the Open Library API to search by title or author and present results clearly.", big: false },
  { id: "w9", title: "webpro-w9", repo: "webpro-w9", tags: ["HTML", "Git", "Pages"], text: "A course-based assignment repository published to GitHub Pages with index.html and project work examples.", big: false },
  { id: "python-tasks", title: "Python Tasks", repo: "python_tasks", tags: ["Python", "Automation", "Logic"], text: "Python practice and problem-solving tasks focused on logic, scripting, and clean code.", big: false },
  { id: "weather-forecast", title: "Weather Forecast", repo: "weather-forecast", tags: ["JavaScript", "API", "UI"], text: "A weather app built with live data and a user-friendly interface for quick access to forecast information.", big: false },
  { id: "univer-project", title: "University Project", repo: "Univer_project", tags: ["PHP", "Java", "Database"], text: "Academic project work showing my ability to build functional solutions and manage code for university tasks.", big: false },
  { id: "c-language", title: "C Language Practice", repo: "C-language", tags: ["C", "Programming", "Algorithms"], text: "Programming practice in C with problem solving and algorithmic thinking.", big: false }
];

const RESUME = {
  headline: "Computer Engineering Student · Cybersecurity Future · Web Developer in Training",
  summary: "Computer engineering student with two years of study completed and about 70% of the program finished. Strong interest in cybersecurity, web development, and practical coding. Skilled in Python, HTML, CSS, JavaScript, Java, PHP, Git/GitHub, and project-based learning. Fluent in English and Uzbek, and able to communicate in Korean at an intermediate level.",
  education: [
    { what: "Computer Engineering", when: "2024 – present", more: "Currently studying computer engineering and building technical skills in programming, logic, and modern systems." },
    { what: "Academic progress", when: "2 years completed / 70% finished", more: "Doing well in studies and continuing to improve through coursework, labs, and personal projects." }
  ],
  experience: [
    { what: "Student and part-time worker", when: "Present", more: "Balancing university studies, practical work, and independent technical learning while developing discipline and communication skills." },
    { what: "Personal web and coding projects", when: "2025 – 2026", more: "Built sites and coding projects using HTML, CSS, JavaScript, Python, and GitHub Pages to strengthen my portfolio and technical skills." }
  ],
  certs: []
};

