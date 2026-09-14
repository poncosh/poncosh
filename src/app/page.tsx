import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon, SkillIcon, SocialIcon } from "@/components/icons";
import { SiteHeader } from "@/components/site-header";
import { getPortfolioData } from "@/data/portfolio";
import { absoluteUrl, serializeJsonLd } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const rotations = ["-3deg", "2deg", "-1deg", "3deg", "-2deg"];

export default async function Home() {
  const data = await getPortfolioData();
  const { profile } = data;
  const emailUrl = data.socials.find((social) => social.platform === "email")?.url ?? "mailto:satrioppp98@gmail.com";
  const personId = absoluteUrl("/#person");
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: `${profile.fullName} — Portfolio`,
        inLanguage: "id-ID",
        author: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": absoluteUrl("/#profile"),
        url: absoluteUrl("/"),
        name: `${profile.fullName} — Software Engineer`,
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: profile.fullName,
        url: absoluteUrl("/"),
        image: absoluteUrl(profile.portraitPath),
        jobTitle: "Software Engineer",
        description: profile.description,
        email: emailUrl.replace("mailto:", ""),
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jakarta",
          addressCountry: "ID",
        },
        worksFor: { "@type": "Organization", name: "BNI" },
        sameAs: data.socials.filter((social) => social.url.startsWith("https://")).map((social) => social.url),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
      <SiteHeader emailUrl={emailUrl} />
      <main>
        <section className="hero shell" id="about" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span />{profile.eyebrow}</p>
            <h1 id="hero-title">{profile.tagline}</h1>
            <p className="intro">{profile.description}</p>
            <div className="social-row" aria-label="Tautan sosial">
              {data.socials.map((social) => (
                <a key={social.platform} href={social.url} target={social.url.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  <SocialIcon platform={social.platform} />
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="portrait-wrap">
            <div className="portrait-halo" />
            <div className="portrait-frame">
              <Image
                src={profile.portraitPath}
                alt={`Potret ${profile.fullName}`}
                fill
                priority
                sizes="(max-width: 760px) 82vw, 42vw"
                className="portrait-image"
              />
            </div>
            <p className="portrait-note">Currently <span>↘</span><br />{profile.availability}</p>
          </div>
          <div className="hero-name" aria-label={profile.fullName}>
            <span>{profile.fullName.split(" ").slice(0, 2).join(" ")}</span>
            <span>{profile.fullName.split(" ").slice(2).join(" ")}</span>
          </div>
        </section>

        <section className="photo-story" aria-labelledby="photo-title">
          <div className="shell section-heading photo-heading">
            <p className="section-index">01 / Life lately</p>
            <h2 id="photo-title">A few frames<br />between the code.</h2>
            <p>People, places, and the small moments that keep me curious.</p>
          </div>
          <div className="photo-ribbon">
            {data.photos.map((photo, index) => (
              <figure key={photo.id} style={{ transform: `rotate(${rotations[index % rotations.length]})` }}>
                <div className="photo-card">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 58vw, 22vw"
                    className="story-image"
                  />
                </div>
                <figcaption>{String(index + 1).padStart(2, "0")} — {photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="work-section shell" id="projects" aria-labelledby="work-title">
          <div className="section-heading work-heading">
            <p className="section-index">02 / Selected work</p>
            <h2 id="work-title">Building systems<br />that move business.</h2>
            <p>Enterprise engineering, thoughtful interfaces, and dependable delivery.</p>
          </div>

          <div className="project-list">
            {data.projects.map((project, index) => (
              <article className="project" key={project.id}>
                <div className="project-number">0{index + 1}</div>
                <div className="project-copy">
                  <p>{project.kicker}</p>
                  <h3>{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                  {project.url ? (
                    <a className="text-link" href={project.url} target="_blank" rel="noreferrer">
                      Visit project <ArrowUpRightIcon />
                    </a>
                  ) : <span className="private-label">Internal project · no public link</span>}
                </div>
                <ul className="skill-list" aria-label={`Teknologi untuk ${project.title}`}>
                  {project.skills.map((item) => (
                    <li key={item.id}>
                      <SkillIcon iconKey={item.iconKey} name={item.name} accent={item.accent} />
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {data.experiences.map((experience) => (
            <article className="cicd-card" key={experience.id}>
              <div className="pipeline-visual" aria-hidden="true">
                <span>CODE</span><i /><span>BUILD</span><i /><span>SHIP</span>
              </div>
              <div className="cicd-copy">
                <p>{experience.kicker}</p>
                <h3>{experience.title}</h3>
                <p>{experience.summary}</p>
              </div>
              <ul className="skill-list compact" aria-label="Tool CI/CD">
                {experience.skills.map((item) => (
                  <li key={item.id}>
                    <SkillIcon iconKey={item.iconKey} name={item.name} accent={item.accent} />
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="journal-section" id="journal" aria-labelledby="journal-title">
          <div className="shell">
            <div className="section-heading journal-heading">
              <p className="section-index">03 / Field notes</p>
              <h2 id="journal-title">Stories on learning<br />and becoming.</h2>
              <p>Catatan dari perjalanan membangun, belajar, dan bertumbuh.</p>
            </div>
            <div className="post-list">
              {data.posts.map((post, index) => (
                <article className="post-row" key={post.slug}>
                  <span className="post-number">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="post-meta">
                      {new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" }).format(post.publishedAt)} · {post.readingMinutes} menit baca
                    </p>
                    <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                    <p>{post.excerpt}</p>
                  </div>
                  <Link className="post-arrow" href={`/blog/${post.slug}`} aria-label={`Baca ${post.title}`}>
                    <ArrowRightIcon />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="shell footer-grid">
          <div>
            <p className="footer-kicker">Have a story to build?</p>
            <a className="footer-email" href={emailUrl}>Let&apos;s make it happen. <ArrowUpRightIcon /></a>
          </div>
          <div className="footer-small">
            <p>{profile.location}</p>
            <p>© {new Date().getFullYear()} {profile.fullName}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
