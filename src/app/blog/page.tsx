import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { getPortfolioData } from "@/data/portfolio";
import { absoluteUrl, serializeJsonLd } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog",
  description: "Catatan Satrio Ponco Sushadi tentang software engineering, proses belajar, dan pertumbuhan.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const data = await getPortfolioData();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Field notes by ${data.profile.fullName}`,
    url: absoluteUrl("/blog"),
    description: "Catatan tentang software engineering, proses belajar, dan pertumbuhan.",
    author: {
      "@type": "Person",
      name: data.profile.fullName,
      url: absoluteUrl("/about"),
    },
    blogPost: data.posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.publishedAt.toISOString(),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
      <main className="page-main">
        <section className="page-hero shell" aria-labelledby="blog-title">
          <p className="section-index">Field notes / Blog</p>
          <h1 id="blog-title">Stories on learning<br />and becoming.</h1>
          <p>Catatan dari perjalanan membangun sistem, memahami proses, dan tumbuh melalui pekerjaan maupun kehidupan sehari-hari.</p>
        </section>

        <section className="blog-index shell" aria-label="Daftar tulisan">
          <div className="post-list">
            {data.posts.map((post, index) => (
              <article className="post-row" key={post.slug}>
                <span className="post-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p className="post-meta">
                    {new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" }).format(post.publishedAt)} · {post.readingMinutes} menit baca
                  </p>
                  <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
                  <p>{post.excerpt}</p>
                </div>
                <Link className="post-arrow" href={`/blog/${post.slug}`} aria-label={`Baca ${post.title}`}>
                  <ArrowRightIcon />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="article-footer"><div className="shell">© {new Date().getFullYear()} {data.profile.fullName}</div></footer>
    </>
  );
}
