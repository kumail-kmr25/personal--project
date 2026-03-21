import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { getBlogPost, BLOG_POSTS } from '@/data/blog-posts';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} | Blog - Kumail Kmr`,
    description: post.excerpt.slice(0, 155),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.id !== post.id && (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <header className="mb-12">
          <span className="text-primary text-sm font-bold uppercase tracking-widest">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-2 mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-text-secondary">
            <div className="flex items-center gap-3">
              <Image
                src={post.author.photo}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-semibold text-text-primary">{post.author.name}</span>
            </div>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readingTime} min read
            </span>
          </div>
        </header>

        <div className="relative aspect-video rounded-2xl overflow-hidden mb-12">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>

        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-p:text-text-secondary prose-li:text-text-secondary prose-strong:text-text-primary">
          {post.content.split('\n').map((block, i) => {
            if (block.startsWith('## ')) {
              return (
                <h2 key={i} className="text-2xl font-bold mt-12 mb-4 text-text-primary">
                  {block.replace('## ', '')}
                </h2>
              );
            }
            if (block.startsWith('### ')) {
              return (
                <h3 key={i} className="text-xl font-bold mt-8 mb-3 text-text-primary">
                  {block.replace('### ', '')}
                </h3>
              );
            }
            if (block.startsWith('- ')) {
              const items = block.split('\n').filter((b) => b.startsWith('- '));
              return (
                <ul key={i} className="list-disc pl-6 space-y-2 my-4">
                  {items.map((item, j) => (
                    <li key={j}>{item.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            if (block.startsWith('| ')) {
              const rows = block.split('\n').filter((r) => r.includes('|'));
              return (
                <div key={i} className="overflow-x-auto my-6">
                  <table className="w-full border-collapse border border-border rounded-lg">
                    <tbody>
                      {rows.map((row, j) => {
                        const cells = row.split('|').filter((c) => c.trim());
                        return (
                          <tr key={j} className={j === 0 ? 'bg-surface' : ''}>
                            {cells.map((cell, k) => (
                              <td
                                key={k}
                                className="border border-border px-4 py-2 text-text-primary"
                              >
                                {cell.trim()}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            }
            if (block.startsWith('- [ ]')) {
              return (
                <div key={i} className="my-4 space-y-2">
                  {block.split('\n').map((line, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <input type="checkbox" readOnly className="rounded" />
                      <span>{line.replace('- [ ] ', '')}</span>
                    </div>
                  ))}
                </div>
              );
            }
            if (block.trim() === '') return null;
            return (
              <p key={i} className="my-4 leading-relaxed">
                {block}
              </p>
            );
          })}
        </div>

        {/* Author Box */}
        <div className="mt-16 p-6 bg-surface border border-border rounded-2xl">
          <div className="flex items-center gap-4">
            <Image
              src={post.author.photo}
              alt={post.author.name}
              width={64}
              height={64}
              className="rounded-full"
            />
            <div>
              <p className="font-bold text-text-primary">{post.author.name}</p>
              <p className="text-sm text-text-secondary">
                Full-stack developer helping businesses grow through performant web applications.
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group block"
                >
                  <div className="aspect-video relative rounded-xl overflow-hidden mb-4">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="200px"
                    />
                  </div>
                  <h3 className="font-bold group-hover:text-primary transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-sm text-text-muted mt-1">
                    {related.readingTime} min read
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
