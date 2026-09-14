import type { PortfolioData } from "./types";

const skill = (
  id: number,
  name: string,
  slug: string,
  iconKey: string,
  accent: string,
) => ({ id, name, slug, iconKey, accent });

const skillCatalog = {
  weblogic: skill(1, "Oracle WebLogic", "oracle-weblogic", "oracle", "#ef4135"),
  jdk: skill(2, "JDK 8", "jdk-8", "java", "#e76f00"),
  oracle: skill(3, "Oracle Database 19c", "oracle-database-19c", "database", "#ef4135"),
  next: skill(4, "Next.js", "nextjs", "next", "#111111"),
  typescript: skill(5, "TypeScript", "typescript", "typescript", "#3178c6"),
  go: skill(6, "Go", "golang", "go", "#00add8"),
  dotnet: skill(7, "Legacy ASP.NET", "aspnet", "dotnet", "#512bd4"),
  sqlserver: skill(8, "Microsoft SQL Server Management Studio", "ssms", "sqlserver", "#cc2927"),
  docker: skill(9, "Docker", "docker", "docker", "#2496ed"),
  openshift: skill(10, "OpenShift Container Platform", "openshift", "openshift", "#ee0000"),
  jenkins: skill(11, "Jenkins", "jenkins", "jenkins", "#d33833"),
  harbor: skill(12, "Harbor", "harbor", "harbor", "#60b932"),
};

export const fallbackData: PortfolioData = {
  profile: {
    fullName: "Satrio Ponco Sushadi",
    eyebrow: "Software engineer · Jakarta, Indonesia",
    tagline: "A storyteller and software engineer.",
    description:
      "Saya adalah software engineer di BNI yang senang mengubah ide menjadi produk digital yang sederhana, tangguh, dan berguna. Di sela membangun sistem, saya gemar mengeksplorasi teknologi baru, mencatat cerita dari proses belajar, serta bertukar perspektif dengan orang-orang di sekitar. Di luar layar, saya rutin bermain fun football—ruang kecil untuk bergerak, tertawa, dan menjaga keseimbangan hidup.",
    portraitPath: "/front-photo.png",
    location: "Jakarta, Indonesia",
    availability: "Building reliable digital banking experiences at BNI.",
  },
  socials: [
    { platform: "github", label: "GitHub", url: "https://github.com/poncosh" },
    { platform: "instagram", label: "Instagram", url: "https://instagram.com/satriopo" },
    { platform: "email", label: "Email", url: "mailto:satrioppp98@gmail.com" },
  ],
  photos: [
    { id: 1, src: "/list-photo/1.jpeg", alt: "Satrio bersama keponakan di rumah", caption: "Small joys", width: 1201, height: 1600 },
    { id: 2, src: "/list-photo/2.jpeg", alt: "Satrio berkunjung ke kantor AWS", caption: "Keep exploring", width: 1200, height: 1600 },
    { id: 3, src: "/list-photo/3.jpeg", alt: "Satrio berenang bersama keluarga", caption: "Weekend stories", width: 900, height: 1600 },
    { id: 4, src: "/list-photo/4.jpeg", alt: "Potret keluarga Satrio", caption: "My people", width: 1201, height: 1600 },
    { id: 5, src: "/list-photo/5.jpeg", alt: "Satrio bermain fun football", caption: "Play the long game", width: 992, height: 1600 },
  ],
  projects: [
    {
      id: 1,
      title: "BNIdirect Bisnis",
      slug: "bnidirect-bisnis",
      kicker: "Digital banking · BNI",
      summary: "Platform digital banking untuk membantu nasabah bisnis mengelola kebutuhan transaksi dan aktivitas finansial perusahaan secara terintegrasi.",
      url: "https://directbisnis.bni.co.id",
      skills: [skillCatalog.weblogic, skillCatalog.jdk, skillCatalog.oracle, skillCatalog.next, skillCatalog.typescript, skillCatalog.go],
    },
    {
      id: 2,
      title: "OASE BNI",
      slug: "oase-bni",
      kicker: "Internal platform · BNI",
      summary: "Aplikasi internal yang mendukung alur kerja operasional BNI, dibangun dan dipelihara dengan fondasi teknologi Microsoft yang stabil.",
      url: null,
      skills: [skillCatalog.dotnet, skillCatalog.sqlserver],
    },
  ],
  experiences: [
    {
      id: 1,
      title: "Shipping with confidence",
      kicker: "CI/CD & platform engineering",
      summary: "Merancang alur delivery yang konsisten dari source code hingga container registry dan deployment di cluster enterprise.",
      skills: [skillCatalog.docker, skillCatalog.openshift, skillCatalog.jenkins, skillCatalog.harbor],
    },
  ],
  posts: [
    {
      slug: "manifesting-2026",
      title: "Manifesting 2026",
      excerpt: "Tentang target untuk menguasai skill baru, menjaga rasa ingin tahu, dan terus bertumbuh—satu langkah kecil yang konsisten setiap hari.",
      body: `2026 bukan tentang mengejar sebanyak mungkin pencapaian. Tahun ini adalah tentang membangun kapasitas: belajar lebih dalam, bekerja lebih tenang, dan memberi ruang untuk hal-hal yang membuat hidup terasa utuh.

Target utama saya adalah menguasai skill baru yang memperkuat fondasi sebagai software engineer. Saya ingin lebih tajam dalam system design, memahami praktik cloud-native secara menyeluruh, dan semakin percaya diri membangun produk dari ide hingga berjalan stabil di production.

Saya juga ingin terus berkembang sebagai storyteller. Pengalaman teknis menjadi lebih berarti ketika dapat dijelaskan dengan sederhana, dibagikan, dan membantu orang lain mengambil langkah pertamanya.

Di luar pekerjaan, saya ingin hadir lebih penuh untuk keluarga, menjaga tubuh tetap aktif lewat fun football, serta tetap membuka diri terhadap tempat, orang, dan perspektif baru.

Manifestasi ini bukan janji tentang hasil yang sempurna. Ini adalah kompas: belajar dengan sengaja, membuat sesuatu yang berguna, dan menjadi sedikit lebih baik setiap hari.`,
      publishedAt: new Date("2026-01-05T02:00:00.000Z"),
      readingMinutes: 3,
    },
  ],
};
