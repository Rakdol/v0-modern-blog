import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowRight } from 'lucide-react'
import { getAllPosts } from '@/lib/posts'
import { Navbar } from '@/components/blog/navbar'
import { TagChip } from '@/components/blog/tag-chip'

export const metadata = {
  title: 'Preview — The Void',
  description: 'Quick scan of all published articles.',
}

export default function PreviewPage() {
  const posts = getAllPosts()

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-28">
        <header className="animate-fade-up mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Quick Scan
          </p>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            All Articles
          </h1>
          <p className="mt-3 text-muted-foreground">
            Fast scanning layout. Click any article to dive in.
          </p>
        </header>

        <div className="flex flex-col gap-4">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="animate-fade-up glass-card glow-hover group flex flex-col gap-3 rounded-xl p-6 transition-colors md:flex-row md:items-center md:gap-6"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Left: date */}
              <time
                dateTime={post.date}
                className="shrink-0 text-xs font-medium uppercase tracking-widest text-muted-foreground md:w-28"
              >
                {post.date ? format(new Date(post.date), 'MMM dd, yyyy') : ''}
              </time>

              {/* Center: content */}
              <div className="flex flex-1 flex-col gap-2">
                <h2 className="font-serif text-lg font-semibold text-foreground transition-colors group-hover:text-primary md:text-xl">
                  {post.title}
                </h2>
                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.map((tag) => (
                    <TagChip key={tag} tag={tag} />
                  ))}
                </div>
              </div>

              {/* Right: arrow */}
              <ArrowRight
                size={18}
                className="shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary"
              />
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="py-20 text-center text-muted-foreground">
            No posts yet.
          </p>
        )}
      </main>
    </>
  )
}
