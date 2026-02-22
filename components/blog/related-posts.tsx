import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { ArrowRight } from 'lucide-react'
import { TagChip } from './tag-chip'
import type { PostMeta } from '@/lib/posts'

interface RelatedPostsProps {
  posts: PostMeta[]
  currentTags: string[]
}

export function RelatedPosts({ posts, currentTags }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="mt-20 border-t border-border pt-12">
      <h2 className="mb-8 font-serif text-2xl font-semibold text-foreground md:text-3xl">
        Related Articles
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post, index) => {
          const sharedTags = post.tags.filter((t) => currentTags.includes(t))

          return (
            <article
              key={post.slug}
              className="animate-fade-up glass-card glow-hover group flex flex-col overflow-hidden rounded-xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {post.coverImage && (
                <Link href={`/posts/${post.slug}`} className="relative block aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </Link>
              )}

              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <TagChip
                      key={tag}
                      tag={tag}
                      variant={sharedTags.includes(tag) ? 'glow' : 'default'}
                    />
                  ))}
                </div>

                <time
                  dateTime={post.date}
                  className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
                >
                  {post.date ? format(new Date(post.date), 'MMM dd, yyyy') : ''}
                </time>

                <h3 className="font-serif text-lg font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>

                <Link
                  href={`/posts/${post.slug}`}
                  className="animated-underline mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold text-primary transition-colors hover:text-glow-coral"
                >
                  Read
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
