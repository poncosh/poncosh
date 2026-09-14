import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRightIcon, SocialIcon } from "@/components/icons";
import { getPortfolioData } from "@/data/portfolio";
import { absoluteUrl, serializeJsonLd } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About",
  description: "Mini-autobiografi Satrio Ponco Sushadi—software engineer di BNI, storyteller, dan pembelajar sepanjang hayat.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const data = await getPortfolioData();
  const { profile } = data;
  const linkedin = data.socials.find((social) => social.platform === "linkedin");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `About ${profile.fullName}`,
    url: absoluteUrl("/about"),
    mainEntity: {
      "@type": "Person",
      name: profile.fullName,
      jobTitle: "Software Engineer",
      description: profile.biography,
      image: absoluteUrl(profile.portraitPath),
      worksFor: { "@type": "Organization", name: "BNI" },
      sameAs: data.socials.filter((social) => social.url.startsWith("https://")).map((social) => social.url),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
      <main className="page-main">
        <section className="about-hero shell" aria-labelledby="about-title">
          <div className="about-heading">
            <p className="section-index">About / Ora et labora</p>
            <h1 id="about-title">Engineering with<br /><em>curiosity.</em></h1>
            <p>{profile.tagline}</p>
          </div>
          <div className="about-portrait">
            <Image
              src={profile.portraitPath}
              alt={`Potret ${profile.fullName}`}
              fill
              priority
              sizes="(max-width: 760px) 92vw, 36vw"
            />
          </div>
        </section>

        <section className="about-story shell" aria-labelledby="story-title">
          <div className="about-aside">
            <p className="section-index">The short story</p>
            <span>01 — 04</span>
          </div>
          <div className="biography" id="story-title">
            {profile.biography.split(/\n\s*\n/).map((paragraph, index) => (
              <p key={`${index}-${paragraph.slice(0, 20)}`}>{paragraph}</p>
            ))}
          </div>
          <aside className="about-facts" aria-label="Ringkasan profil">
            <dl>
              <div><dt>Currently</dt><dd>Software Engineer at BNI</dd></div>
              <div><dt>Based in</dt><dd>{profile.location}</dd></div>
              <div><dt>Working on</dt><dd>Digital banking & reliable delivery</dd></div>
              <div><dt>Beyond code</dt><dd>Stories, exploration & fun football</dd></div>
            </dl>
            {linkedin && (
              <a className="linkedin-card" href={linkedin.url} target="_blank" rel="noreferrer">
                <SocialIcon platform="linkedin" />
                <span>Continue on LinkedIn</span>
                <ArrowUpRightIcon />
              </a>
            )}
          </aside>
        </section>
      </main>

      <footer className="article-footer"><div className="shell">© {new Date().getFullYear()} {profile.fullName}</div></footer>
    </>
  );
}
