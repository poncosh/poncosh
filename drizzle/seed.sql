BEGIN;

INSERT INTO portfolio.profiles
  (id, full_name, eyebrow, tagline, description, biography, portrait_path, location, availability)
VALUES
  (1, 'Satrio Ponco Sushadi', 'Software engineer · Jakarta, Indonesia', 'A storyteller and software engineer.',
   'Saya adalah software engineer di BNI yang senang mengubah ide menjadi produk digital yang sederhana, tangguh, dan berguna. Di sela membangun sistem, saya gemar mengeksplorasi teknologi baru, mencatat cerita dari proses belajar, serta bertukar perspektif dengan orang-orang di sekitar. Di luar layar, saya rutin bermain fun football—ruang kecil untuk bergerak, tertawa, dan menjaga keseimbangan hidup.',
   'Saya Satrio Ponco Sushadi, seorang software developer yang memegang prinsip “ora et labora”: menyatukan keyakinan, kerja yang tekun, dan kemauan untuk terus belajar. Bagi saya, teknologi bukan sekadar kumpulan tools, melainkan cara untuk menyederhanakan persoalan dan membangun pengalaman yang benar-benar berguna.\n\nHari ini saya berkarya di BNI dan bertumbuh di lingkungan digital banking yang menuntut ketelitian, ketangguhan, serta rasa tanggung jawab. Dari merawat sistem enterprise hingga membangun antarmuka dan layanan modern, saya belajar bahwa software yang baik lahir dari pemahaman terhadap manusia, proses bisnis, dan konsekuensi dari setiap keputusan teknis.\n\nPerjalanan tersebut membawa saya melintasi Java, Oracle, dan .NET, lalu berkembang bersama TypeScript, Next.js, Go, container, serta praktik CI/CD. Saya menikmati proses menjembatani teknologi lama dan baru—menjaga sistem tetap dapat diandalkan sembari membuka ruang untuk perubahan yang lebih baik.\n\nDi luar pekerjaan, saya adalah seorang pencerita yang senang merekam pelajaran dari proses, mengeksplorasi perspektif baru, dan menjaga hidup tetap seimbang lewat keluarga serta fun football. Saya ingin terus membuat sesuatu yang berguna, membagikan apa yang saya pelajari, dan menjadi sedikit lebih baik dari hari sebelumnya.',
   '/front-photo.png', 'Jakarta, Indonesia', 'Building reliable digital banking experiences at BNI.')
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  eyebrow = EXCLUDED.eyebrow,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  biography = EXCLUDED.biography,
  portrait_path = EXCLUDED.portrait_path,
  location = EXCLUDED.location,
  availability = EXCLUDED.availability,
  updated_at = now();

INSERT INTO portfolio.social_links (id, profile_id, platform, label, url, sort_order) VALUES
  (1, 1, 'github', 'GitHub', 'https://github.com/poncosh', 1),
  (2, 1, 'instagram', 'Instagram', 'https://instagram.com/satriopo', 3),
  (3, 1, 'email', 'Email', 'mailto:satrioppp98@gmail.com', 4),
  (4, 1, 'linkedin', 'LinkedIn', 'https://www.linkedin.com/in/satrio-ponco-sushadi', 2)
ON CONFLICT (id) DO UPDATE SET
  profile_id = EXCLUDED.profile_id, platform = EXCLUDED.platform, label = EXCLUDED.label,
  url = EXCLUDED.url, sort_order = EXCLUDED.sort_order;

INSERT INTO portfolio.photos (id, src, alt, caption, width, height, sort_order) VALUES
  (1, '/list-photo/1.jpeg', 'Satrio bersama anak di rumah', 'Small joys', 1201, 1600, 1),
  (2, '/list-photo/2.jpeg', 'Satrio berkunjung ke kantor AWS', 'Keep exploring', 1200, 1600, 2),
  (3, '/list-photo/3.jpeg', 'Satrio berenang bersama keluarga', 'Weekend stories', 900, 1600, 3),
  (4, '/list-photo/4.jpeg', 'Potret keluarga Satrio', 'My people', 1201, 1600, 4),
  (5, '/list-photo/5.jpeg', 'Satrio bermain fun football', 'Play the long game', 992, 1600, 5)
ON CONFLICT (id) DO UPDATE SET
  src = EXCLUDED.src, alt = EXCLUDED.alt, caption = EXCLUDED.caption,
  width = EXCLUDED.width, height = EXCLUDED.height, sort_order = EXCLUDED.sort_order;

INSERT INTO portfolio.skills (id, name, slug, category, icon_key, accent) VALUES
  (1, 'Oracle WebLogic', 'oracle-weblogic', 'backend', 'oracle', '#ef4135'),
  (2, 'JDK 8', 'jdk-8', 'backend', 'java', '#e76f00'),
  (3, 'Oracle Database 19c', 'oracle-database-19c', 'database', 'database', '#ef4135'),
  (4, 'Next.js', 'nextjs', 'frontend', 'next', '#111111'),
  (5, 'TypeScript', 'typescript', 'language', 'typescript', '#3178c6'),
  (6, 'Go', 'golang', 'language', 'go', '#00add8'),
  (7, 'Legacy ASP.NET', 'aspnet', 'backend', 'dotnet', '#512bd4'),
  (8, 'Microsoft SQL Server Management Studio', 'ssms', 'database', 'sqlserver', '#cc2927'),
  (9, 'Docker', 'docker', 'platform', 'docker', '#2496ed'),
  (10, 'OpenShift Container Platform', 'openshift', 'platform', 'openshift', '#ee0000'),
  (11, 'Jenkins', 'jenkins', 'cicd', 'jenkins', '#d33833'),
  (12, 'Harbor', 'harbor', 'cicd', 'harbor', '#60b932')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, slug = EXCLUDED.slug, category = EXCLUDED.category,
  icon_key = EXCLUDED.icon_key, accent = EXCLUDED.accent;

INSERT INTO portfolio.projects (id, title, slug, kicker, summary, url, sort_order) VALUES
  (1, 'BNIdirect Bisnis', 'bnidirect-bisnis', 'Digital banking · BNI',
   'Platform digital banking untuk membantu nasabah bisnis mengelola kebutuhan transaksi dan aktivitas finansial perusahaan secara terintegrasi.',
   'https://directbisnis.bni.co.id', 1),
  (2, 'OASE BNI', 'oase-bni', 'Internal platform · BNI',
   'Aplikasi internal yang mendukung alur kerja operasional BNI, dibangun dan dipelihara dengan fondasi teknologi Microsoft yang stabil.',
   NULL, 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, slug = EXCLUDED.slug, kicker = EXCLUDED.kicker,
  summary = EXCLUDED.summary, url = EXCLUDED.url, sort_order = EXCLUDED.sort_order;

INSERT INTO portfolio.project_skills (project_id, skill_id, sort_order) VALUES
  (1, 1, 1), (1, 2, 2), (1, 3, 3), (1, 4, 4), (1, 5, 5), (1, 6, 6),
  (2, 7, 1), (2, 8, 2)
ON CONFLICT (project_id, skill_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

INSERT INTO portfolio.experiences (id, title, kicker, summary, sort_order) VALUES
  (1, 'Shipping with confidence', 'CI/CD & platform engineering',
   'Merancang alur delivery yang konsisten dari source code hingga container registry dan deployment di cluster enterprise.', 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, kicker = EXCLUDED.kicker,
  summary = EXCLUDED.summary, sort_order = EXCLUDED.sort_order;

INSERT INTO portfolio.experience_skills (experience_id, skill_id, sort_order) VALUES
  (1, 9, 1), (1, 10, 2), (1, 11, 3), (1, 12, 4)
ON CONFLICT (experience_id, skill_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

INSERT INTO portfolio.posts
  (id, slug, title, excerpt, body, status, featured, reading_minutes, published_at)
VALUES
  (1, 'manifesting-2026', 'Manifesting 2026',
   'Tentang target untuk menguasai skill baru, menjaga rasa ingin tahu, dan terus bertumbuh—satu langkah kecil yang konsisten setiap hari.',
   E'2026 bukan tentang mengejar sebanyak mungkin pencapaian. Tahun ini adalah tentang membangun kapasitas: belajar lebih dalam, bekerja lebih tenang, dan memberi ruang untuk hal-hal yang membuat hidup terasa utuh.\n\nTarget utama saya adalah menguasai skill baru yang memperkuat fondasi sebagai software engineer. Saya ingin lebih tajam dalam system design, memahami praktik cloud-native secara menyeluruh, dan semakin percaya diri membangun produk dari ide hingga berjalan stabil di production.\n\nSaya juga ingin terus berkembang sebagai storyteller. Pengalaman teknis menjadi lebih berarti ketika dapat dijelaskan dengan sederhana, dibagikan, dan membantu orang lain mengambil langkah pertamanya.\n\nDi luar pekerjaan, saya ingin hadir lebih penuh untuk keluarga, menjaga tubuh tetap aktif lewat fun football, serta tetap membuka diri terhadap tempat, orang, dan perspektif baru.\n\nManifestasi ini bukan janji tentang hasil yang sempurna. Ini adalah kompas: belajar dengan sengaja, membuat sesuatu yang berguna, dan menjadi sedikit lebih baik setiap hari.',
   'published', true, 3, '2026-01-05 09:00:00+07')
ON CONFLICT (id) DO UPDATE SET
  slug = EXCLUDED.slug, title = EXCLUDED.title, excerpt = EXCLUDED.excerpt,
  body = EXCLUDED.body, status = EXCLUDED.status, featured = EXCLUDED.featured,
  reading_minutes = EXCLUDED.reading_minutes, published_at = EXCLUDED.published_at,
  updated_at = now();

SELECT setval(pg_get_serial_sequence('portfolio.profiles', 'id'), GREATEST((SELECT MAX(id) FROM portfolio.profiles), 1));
SELECT setval(pg_get_serial_sequence('portfolio.social_links', 'id'), GREATEST((SELECT MAX(id) FROM portfolio.social_links), 1));
SELECT setval(pg_get_serial_sequence('portfolio.photos', 'id'), GREATEST((SELECT MAX(id) FROM portfolio.photos), 1));
SELECT setval(pg_get_serial_sequence('portfolio.skills', 'id'), GREATEST((SELECT MAX(id) FROM portfolio.skills), 1));
SELECT setval(pg_get_serial_sequence('portfolio.projects', 'id'), GREATEST((SELECT MAX(id) FROM portfolio.projects), 1));
SELECT setval(pg_get_serial_sequence('portfolio.experiences', 'id'), GREATEST((SELECT MAX(id) FROM portfolio.experiences), 1));
SELECT setval(pg_get_serial_sequence('portfolio.posts', 'id'), GREATEST((SELECT MAX(id) FROM portfolio.posts), 1));

COMMIT;
