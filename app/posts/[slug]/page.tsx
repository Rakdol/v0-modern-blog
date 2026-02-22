import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { ArrowLeft } from 'lucide-react'
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts'
import { Navbar } from '@/components/blog/navbar'
import { TagChip } from '@/components/blog/tag-chip'
import { RelatedPosts } from '@/components/blog/related-posts'

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} — The Void`,
    description: post.excerpt,
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const relatedPosts = getRelatedPosts(post.slug, post.tags, 3)

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-28">
        {/* Back link */}
        <Link
          href="/"
          className="animate-fade-up animated-underline mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} />
          Back to articles
        </Link>

        {/* Hero block */}
        <header className="animate-fade-up mb-12" style={{ animationDelay: '100ms' }}>
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagChip key={tag} tag={tag} variant="glow" />
            ))}
          </div>

          <time
            dateTime={post.date}
            className="mb-3 block text-xs font-medium uppercase tracking-widest text-muted-foreground"
          >
            {post.date ? format(new Date(post.date), 'MMMM dd, yyyy') : ''}
          </time>

          <h1 className="font-serif text-4xl font-bold leading-[1.15] tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
            {post.title}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            {post.excerpt}
          </p>
        </header>

        {/* Cover image */}
        {post.coverImage && (
          <div
            className="animate-fade-up relative mb-12 aspect-[16/9] overflow-hidden rounded-xl"
            style={{ animationDelay: '200ms' }}
          >
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 750px"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="animate-fade-up prose-blog"
          style={{ animationDelay: '300ms' }}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Related posts */}
        <RelatedPosts posts={relatedPosts} currentTags={post.tags} />
      </main>
    </>
  )
}
