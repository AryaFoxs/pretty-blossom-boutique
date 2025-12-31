import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Flower, Calendar, Clock, User, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { blogPosts } from "@/lib/data/blog"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug)

  if (!post) {
    return { title: "Artikel Tidak Ditemukan" }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogArticlePage({ params }: Props) {
  const resolvedParams = await params
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 2)

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-rose-50 py-4">
        <div className="container">
          <Link href="/blog" className="text-warm-500 hover:text-rose-500 flex items-center gap-1 text-sm">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-12 bg-rose-50">
        <div className="container max-w-3xl">
          <Badge variant="secondary" className="mb-4">{post.category}</Badge>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-warm-800 mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-warm-500">
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readTime} menit baca
            </span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="container max-w-4xl -mt-8">
        <div className="aspect-video rounded-3xl bg-gradient-to-br from-rose-100 to-pink-100 overflow-hidden shadow-xl">
          <div className="w-full h-full flex items-center justify-center">
            <Flower className="h-24 w-24 text-rose-300" />
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="section">
        <div className="container max-w-3xl">
          <div className="prose prose-lg max-w-none">
            {/* Render content - In production, you'd use a markdown renderer */}
            <div 
              className="space-y-6 text-warm-700 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: post.content
                  .split('\n')
                  .map(line => {
                    if (line.startsWith('# ')) {
                      return `<h1 class="font-display text-3xl font-bold text-warm-800 mt-8 mb-4">${line.slice(2)}</h1>`
                    }
                    if (line.startsWith('## ')) {
                      return `<h2 class="font-display text-2xl font-bold text-warm-800 mt-8 mb-4">${line.slice(3)}</h2>`
                    }
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return `<p class="font-semibold text-warm-800">${line.slice(2, -2)}</p>`
                    }
                    if (line.startsWith('---')) {
                      return `<hr class="my-8 border-warm-200" />`
                    }
                    if (line.trim() === '') {
                      return ''
                    }
                    return `<p class="mb-4">${line}</p>`
                  })
                  .join('')
              }}
            />
          </div>
        </div>
      </article>

      {/* Share & Navigation */}
      <div className="py-8 border-t border-warm-200">
        <div className="container max-w-3xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button variant="outline" asChild>
              <Link href="/blog" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Semua Artikel
              </Link>
            </Button>
            <Button asChild>
              <Link href="/katalog" className="gap-2">
                Lihat Katalog
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="section bg-rose-50">
          <div className="container max-w-4xl">
            <h2 className="font-display text-2xl font-bold text-warm-800 mb-8 text-center">
              Artikel Lainnya
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <Card className="group overflow-hidden card-hover h-full">
                    <div className="aspect-video bg-gradient-to-br from-rose-100 to-pink-100 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Flower className="h-12 w-12 text-rose-300 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <Badge variant="secondary" className="mb-2">{relatedPost.category}</Badge>
                      <h3 className="font-display text-lg font-semibold text-warm-800 group-hover:text-rose-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
