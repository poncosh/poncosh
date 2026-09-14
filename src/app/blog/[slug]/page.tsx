import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightIcon } from "@/components/icons";
import { SiteHeader } from "@/components/site-header";
import { getPortfolioData, getPostBySlug } from "@/data/portfolio";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const data = await getPortfolioData();
  return data.posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const [post, data] = await Promise.all([getPostBySlug(slug), getPortfolioData()]);
  if (!post) notFound();
  const emailUrl = data.socials.find((social) => social.platform === "email")?.url ?? "mailto:satrioppp98@gmail.com";

  return (
    <>
      <SiteHeader emailUrl={emailUrl} />
      <main className="article-shell">
        <Link className="back-link" href="/#journal"><ArrowRightIcon /> Back to journal</Link>
        <article>
          <header className="article-header">
            <p className="section-index">Journal / {post.readingMinutes} min read</p>
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
            <time dateTime={post.publishedAt.toISOString()}>
              {new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" }).format(post.publishedAt)}
            </time>
          </header>
          <div className="article-body">
            {post.body.split(/\n\s*\n/).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </article>
      </main>
      <footer className="article-footer"><div className="shell">© {new Date().getFullYear()} {data.profile.fullName}</div></footer>
    </>
  );
}
