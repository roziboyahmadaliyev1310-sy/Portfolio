/* =========================================================
   EDIT THIS FILE ONLY. Everything on the site comes from here.
   Search for "EDIT" to find the things you must change.
   ========================================================= */

// EDIT: your GitHub username (used for live site / repo / commits links and the GitHub API).
const GITHUB_USER = "roziboyahmadaliyev1310-sy";

const PROFILE = {
  name: "Ruziboy Akhmadaliev",                         // EDIT: taken from your LinkedIn URL, fix the spelling if needed
  log: "observing: a new portfolio online",            // typed line at the top of the hero
  roles: ["web developer in training", "curious builder", "fast learner"],  // EDIT
  tagline: "I build small, practical web projects and I'm learning how to make them better with every commit.", // EDIT
  photo: "photo.jpg",                                  // put your picture next to index.html with this name
  resume: "resume.pdf",                                // put your resume PDF next to index.html
  email: "you@example.com",                            // EDIT
  linkedin: "https://www.linkedin.com/in/ruziboy-akhmadaliev-3b481b3a1",
  location: "Your city, Country",                      // EDIT
  mainRepo: "portfolio",                               // EDIT: the name of THIS portfolio repository
  formEndpoint: "",                                    // optional: a Formspree URL. Empty = opens your email app
  stickers: ["Open to learn", "Est. 2026"],
  footer: "Built by hand with HTML, CSS and JavaScript."
};

const ABOUT = {
  title: "Engineer in the making",
  // Each string is one paragraph. EDIT all of them.
  paragraphs: [
    "I'm a student with a strong interest in building things for the web. I enjoy solving problems and turning ideas into practical solutions.",
    "It started small: simple pages, then JavaScript, then real apps that talk to APIs. Each homework taught me how to break a problem into parts and finish it.",
    "Right now I'm learning Git and GitHub Pages, so that everything I build is public, versioned and easy to review."
  ]
};

// The fake terminal on the About section. Add or change commands freely.
const CONSOLE = {
  whoami:    ["Ruziboy Akhmadaliev, student and web developer in training.", "HTML · CSS · JavaScript · Git."],
  education: ["Your University, Your Country.", "Major: Your Major.", "Year: 1."],            // EDIT
  languages: ["English (fluent)", "Add your languages here."],                                // EDIT
  interests: ["Web apps, APIs, clean UI, learning in public."],                               // EDIT
  goals:     ["Ship one real project every month.", "Learn backend and databases next."],     // EDIT
  "ls projects": ["portfolio/", "webpro-w9/", "webpro-book-search/"]
};

const TIMELINE = [   // EDIT: your milestones, newest first or oldest first, as you like
  { when: "2026", title: "Started Web Programming", text: "First HTML pages, Git and GitHub Pages." },
  { when: "2026", title: "Published my first site", text: "Pushed index.html and published it with GitHub Pages." },
  { when: "2026", title: "Built Book Search", text: "A search app using the Open Library API, deployed to Pages." },
  { when: "2026", title: "This portfolio", text: "A decorative, creative portfolio in its own repository." }
];

const CLASSES = {    // EDIT: your real classes
  sub: "This term I'm taking these classes. Progress bars are my own honest estimate.",
  list: [
    { code: "WEBPRO", name: "Web Programming", term: "Fall 2026", what: "HTML, CSS, JavaScript, Git, GitHub Pages, APIs.", progress: 55 },
    { code: "CLASS-2", name: "Your second class", term: "Fall 2026", what: "What you learn in it.", progress: 40 },
    { code: "CLASS-3", name: "Your third class", term: "Fall 2026", what: "What you learn in it.", progress: 30 }
  ]
};

// Only list a skill if at least one project uses it. usedIn = project ids from PROJECTS below.
const SKILLS = [
  { name: "HTML",            cat: "Languages", note: "Semantic pages and forms. My starting point for everything.", usedIn: ["portfolio", "w9", "book-search"] },
  { name: "CSS",             cat: "Languages", note: "Layout with grid and flexbox, themes with custom properties.", usedIn: ["portfolio", "book-search"] },
  { name: "JavaScript",      cat: "Languages", note: "DOM, events and fetch. It makes the pages come alive.", usedIn: ["portfolio", "book-search"] },
  { name: "Open Library API",cat: "Web & APIs", note: "Search books by title or author with one fetch call.", usedIn: ["book-search"] },
  { name: "Git & GitHub",    cat: "Tools", note: "Small commits with clear messages, pushed often.", usedIn: ["portfolio", "w9", "book-search"] },
  { name: "GitHub Pages",    cat: "Tools", note: "Free hosting for every project, deployed from the repo root.", usedIn: ["portfolio", "w9", "book-search"] }
  // EDIT: add more, e.g. { name: "Python", cat: "Languages", note: "...", usedIn: ["your-project-id"] }
];

const PROJECTS = [   // EDIT: id must be unique; repo = the GitHub repository name
  { id: "portfolio", title: "This portfolio", repo: "portfolio", tags: ["HTML", "CSS", "JavaScript", "Canvas"],
    text: "A night-sky portfolio with an animated star field, theme switch, live GitHub commit counts and an in-page resume.", big: true },
  { id: "book-search", title: "Book Search", repo: "webpro-book-search", tags: ["JavaScript", "Open Library API", "Pages"],
    text: "Search millions of books by title or author using the Open Library API. Deployed to GitHub Pages." },
  { id: "w9", title: "webpro-w9", repo: "webpro-w9", tags: ["HTML", "Git", "Pages"],
    text: "My first published page: index.html with my name and the date, plus the 404 exercises." }
];

const RESUME = {     // EDIT everything: shown in the Resume section and printable
  headline: "Computer student · Web developer in training",
  summary: "Motivated student who learns by building. Comfortable with HTML, CSS, JavaScript and Git, and publishing every project with GitHub Pages.",
  education: [
    { what: "Your Major, Your University", when: "2024 – present", more: "Relevant classes: Web Programming, ..." }
  ],
  experience: [
    { what: "Personal projects", when: "2026", more: "Portfolio, Book Search app, GitHub Pages deployments." }
  ],
  certs: [
    // { issuer: "Coursera", title: "Course title", when: "May 2026", url: "https://..." }
  ]
};

const HOMEWORK = [   // The three cards. desc may contain simple HTML like <code>.
  { title: "Personal portfolio", repo: "portfolio",
    desc: "The Git homework: a portfolio repository on GitHub Pages with my name, photo, bio, skills and project links, built up over many commits with clear messages." },
  { title: "webpro-w9", repo: "webpro-w9",
    desc: "The Monday homework: a repo with an <code>index.html</code> that has my name and the date, pushed to GitHub and published with Pages. It also holds the Friday 404 exercises." },
  { title: "webpro-book-search", repo: "webpro-book-search",
    desc: "The Friday homework: my Book Search app (Open Library API) deployed to GitHub Pages, with <code>index.html</code> in the repo root and no absolute paths or debug logging." }
];
