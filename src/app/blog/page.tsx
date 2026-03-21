import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blog-posts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Insights on Web Development & Business Growth - Kumail Kmr',
  description:
    'Insights on web development, performance optimization, business growth, and client success. Practical advice from a full-stack developer.',
};

export default function BlogPage() {
  const [featured, ...posts] = BLOG_POSTS;

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Blog</h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Insights on web development, business growth, and client success
          </p>
        </div>

        {/* Featured Post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="block mb-16 group"
        >
          <article className="rounded-3xl overflow-hidden bg-surface border border-border shadow-lg hover:shadow-xl transition-all">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="aspect-video md:aspect-auto md:min-h-[400px] relative">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className="absolute top-6 left-6 px-4 py-1.5 bg-primary text-white text-xs font-bold uppercase rounded-full">
                  Featured
                </span>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="text-primary text-sm font-bold uppercase tracking-widest mb-2">
                  {featured.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {featured.title}
                </h2>
                <p className="text-text-secondary mb-6 line-clamp-2">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-text-muted">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(featured.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {featured.readingTime} min read
                  </span>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                  Read Article →
                </span>
              </div>
            </div>
          </article>
        </Link>

        {/* Post Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <article className="rounded-2xl overflow-hidden bg-surface border border-border shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all h-full flex flex-col">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur rounded-full text-xs font-bold text-white">
                    {post.category}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4 line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readingTime} min
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
