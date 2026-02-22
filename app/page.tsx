import { getAllPosts } from '@/lib/posts'
import { Navbar } from '@/components/blog/navbar'
import { Hero } from '@/components/blog/hero'
import { PostCard } from '@/components/blog/post-card'

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6">
        <Hero />

        <section className="pb-24">
          <div className="mb-10 flex items-center gap-4">
            <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
              Latest Articles
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} priority={i === 0} />
            ))}
          </div>

          {posts.length === 0 && (
            <p className="py-20 text-center text-muted-foreground">
              No posts yet. Add markdown files to{' '}
              <code className="rounded-md bg-secondary px-2 py-1 text-sm text-primary font-mono">
                /content/posts
              </code>{' '}
              to get started.
            </p>
          )}
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>
          Built with intention.{' '}
          <span className="text-primary">thevoid</span> &copy;{' '}
          {new Date().getFullYear()}
        </p>
      </footer>
    </>
  )
}
