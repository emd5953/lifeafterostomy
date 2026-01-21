// src/types/database.ts
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          ostomy_type: 'colostomy' | 'ileostomy' | 'urostomy' | 'universal' | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          ostomy_type?: 'colostomy' | 'ileostomy' | 'urostomy' | 'universal' | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          ostomy_type?: 'colostomy' | 'ileostomy' | 'urostomy' | 'universal' | null
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          category: 'care-kit' | 'book' | 'individual-item'
          ostomy_type: 'colostomy' | 'ileostomy' | 'urostomy' | 'universal'
          kit_type: 'complete' | 'individual' | null
          stock_quantity: number
          images: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          category: 'care-kit' | 'book' | 'individual-item'
          ostomy_type: 'colostomy' | 'ileostomy' | 'urostomy' | 'universal'
          kit_type?: 'complete' | 'individual' | null
          stock_quantity: number
          images: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          description?: string
          price?: number
          category?: 'care-kit' | 'book' | 'individual-item'
          ostomy_type?: 'colostomy' | 'ileostomy' | 'urostomy' | 'universal'
          kit_type?: 'complete' | 'individual' | null
          stock_quantity?: number
          images?: string[]
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          total_amount: number
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total_amount: number
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          total_amount?: number
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          price_at_time: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          price_at_time: number
          created_at?: string
        }
        Update: {
          quantity?: number
          price_at_time?: number
        }
      }
      content: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string
          type: 'news' | 'knowledge' | 'event'
          author: string
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt: string
          type: 'news' | 'knowledge' | 'event'
          author: string
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          slug?: string
          content?: string
          excerpt?: string
          type?: 'news' | 'knowledge' | 'event'
          author?: string
          published?: boolean
          updated_at?: string
        }
      }
    }
  }
}

export type User = Database['public']['Tables']['users']['Row']
export type Product = Database['public']['Tables']['products']['Row']
export type Order = Database['public']['Tables']['orders']['Row']
export type OrderItem = Database['public']['Tables']['order_items']['Row']
export type Content = Database['public']['Tables']['content']['Row']