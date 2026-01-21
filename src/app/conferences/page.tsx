'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Content } from '@/types/database'

export default function ConferencesPage() {
  const [events, setEvents] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('type', 'event')
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (!error && data) {
        setEvents(data)
      }
      setLoading(false)
    }
    fetchEvents()
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
        <h1 className="font-serif text-4xl font-semibold mb-2">Conferences & Events</h1>
        <p className="text-foreground/60 mb-10">Upcoming events and support group meetings</p>

        {events.length === 0 ? (
          <p className="text-foreground/50">No upcoming events.</p>
        ) : (
          <div className="space-y-8">
            {events.map((event) => (
              <article key={event.id} className="card-botanical p-6">
                <h2 className="font-serif text-2xl font-semibold mb-2">{event.title}</h2>
                <p className="text-sm text-foreground/50 mb-3">
                  Organized by {event.author}
                </p>
                <p className="text-foreground/70">{event.excerpt}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
