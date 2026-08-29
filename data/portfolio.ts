// ============================================================
// DATA PORTOFOLIO — semua konten placeholder di satu tempat.
// Edit di sini untuk ganti nama, bio, proyek, skills, link.
// ============================================================

export const site = {
  name: "Sacha Ahsan",
  firstName: "Sacha",
  lastName: "Ahsan",
  role: "Frontend Developer",
  email: "sachas4f@gmail.com",
  location: "Bali, Indonesia",
  availability: "Available for work",
};

export const navLinks = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const aboutParas = [
  "Hi, I'm Sacha Ahsan, a Frontend Developer based in Bali. I focus on building clean, responsive, and user-friendly web interfaces using React and Next.js.",
  "I bring a strong drive to learn and genuine curiosity about everything in the web development world, always looking for better ways to solve problems and write cleaner code. Looking ahead, I'm working toward becoming a Fullstack Developer, deepening my understanding of the backend so I can build applications end to end.",
  "To me, every project is a chance to learn something new — whether it's a technique, a tool, or a different way of thinking through a problem.",
];

export const quoteText = "Every project is a lesson, every bug is a teacher.";

export type Project = {
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  link?: string;
};

export const projects: Project[] = [
  {
    title: "Sikozy",
    category: "Audio App",
    year: "2026",
    description: "Lofi hiphop player with focus timer, todo list & ambient visuals",
    image: "/projects/p2.svg",
    link: "https://sikozy.vercel.app/",
  },
  {
    title: "SICKS",
    category: "E-commerce",
    year: "2026",
    description: "Streetwear sneaker store with weekly drops, cart & secure checkout",
    image: "/projects/p3.svg",
    link: "https://sicks-store.vercel.app/",
  },
  {
    title: "Café Leblanc",
    category: "POS System",
    year: "2026",
    description: "Point of sale terminal with fast checkout, live stock & reports",
    image: "/projects/p1.svg",
    link: "https://cafeleblanc.vercel.app/",
  },
];

export const certifications = [
  {
    name: "Front-End Developer Expert",
    issuer: "Dicoding",
    year: "2024",
    link: "https://www.dicoding.com/certificates/L4PQ5VY92ZO1",
  },
  {
    name: "Back-End JavaScript Development",
    issuer: "Dicoding",
    year: "2024",
    link: "https://www.dicoding.com/certificates/MRZMYM400ZYQ",
  },
  {
    name: "Full Stack Next JS",
    issuer: "WPU Course",
    year: "2026",
    link: "https://learn.wpucourse.id/certificate/URC46HDR",
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/Sikoo54" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sacha-ahsan/" },
  { label: "Instagram", href: "https://instagram.com/sacha.af" },
];
