'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Content } from '@/types/database'

export default function NewsPage() {
  const [articles, setArticles] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNews() {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('type', 'news')
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (!error && data) {
        setArticles(data)
      }
      setLoading(false)
    }
    fetchNews()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-foreground/60">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-serif text-4xl font-semibold mb-2">News</h1>
        <p className="text-foreground/60 mb-10">Latest updates from Life After Ostomy</p>

        {articles.length === 0 ? (
          <p className="text-foreground/50">No news articles yet.</p>
        ) : (
          <div className="space-y-8">
            {articles.map((article) => (
              <article key={article.id} className="card-botanical p-6">
                <h2 className="font-serif text-2xl font-semibold mb-2">{article.title}</h2>
                <p className="text-sm text-foreground/50 mb-3">
                  By {article.author} • {new Date(article.created_at).toLocaleDateString()}
                </p>
                <p className="text-foreground/70">{article.excerpt}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
