import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { ArrowRight } from 'lucide-react'
import { TagChip } from './tag-chip'
import type { PostMeta } from '@/lib/posts'

interface PostCardProps {
  post: PostMeta
  index?: number
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  return (
    <article
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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </Link>
      )}

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <time
            dateTime={post.date}
            className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
          >
            {post.date ? format(new Date(post.date), 'MMM dd, yyyy') : ''}
          </time>

          <h2 className="font-serif text-xl font-semibold leading-tight text-foreground transition-colors group-hover:text-primary lg:text-2xl">
            <Link href={`/posts/${post.slug}`} className="focus:outline-none">
              {post.title}
            </Link>
          </h2>

          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        </div>

        <Link
          href={`/posts/${post.slug}`}
          className="animated-underline mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-glow-coral"
        >
          Read article
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}
