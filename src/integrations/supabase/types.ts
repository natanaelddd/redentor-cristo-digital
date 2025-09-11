export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_settings: {
        Row: {
          created_at: string
          id: string
          setting_key: string
          setting_value: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          setting_key: string
          setting_value?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          setting_key?: string
          setting_value?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      asset_requests: {
        Row: {
          admin_notes: string | null
          asset_name: string
          created_at: string
          id: string
          image_url: string | null
          page_link: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          asset_name: string
          created_at?: string
          id?: string
          image_url?: string | null
          page_link?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          asset_name?: string
          created_at?: string
          id?: string
          image_url?: string | null
          page_link?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      auth_rate_limits: {
        Row: {
          attempt_count: number
          blocked_until: string | null
          created_at: string
          email: string | null
          first_attempt: string
          id: string
          ip_address: unknown
          last_attempt: string
        }
        Insert: {
          attempt_count?: number
          blocked_until?: string | null
          created_at?: string
          email?: string | null
          first_attempt?: string
          id?: string
          ip_address: unknown
          last_attempt?: string
        }
        Update: {
          attempt_count?: number
          blocked_until?: string | null
          created_at?: string
          email?: string | null
          first_attempt?: string
          id?: string
          ip_address?: unknown
          last_attempt?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          order_position: number | null
          parent_id: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          order_position?: number | null
          parent_id?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          order_position?: number | null
          parent_id?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          created_at: string
          id: string
          is_admin: boolean
          message: string
          session_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_admin?: boolean
          message: string
          session_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_admin?: boolean
          message?: string
          session_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      chat_sessions: {
        Row: {
          created_at: string | null
          id: string
          last_activity: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          last_activity?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_activity?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      church_hero_slides: {
        Row: {
          animation_duration: number | null
          animation_type: string | null
          background_color: string | null
          button_color: string | null
          button_hover_color: string | null
          button_link: string | null
          button_text: string
          category: string
          created_at: string | null
          description: string | null
          display_duration: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          order: number | null
          overlay_opacity: number | null
          subtitle: string | null
          text_alignment: string | null
          text_color: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          animation_duration?: number | null
          animation_type?: string | null
          background_color?: string | null
          button_color?: string | null
          button_hover_color?: string | null
          button_link?: string | null
          button_text: string
          category: string
          created_at?: string | null
          description?: string | null
          display_duration?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          order?: number | null
          overlay_opacity?: number | null
          subtitle?: string | null
          text_alignment?: string | null
          text_color?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          animation_duration?: number | null
          animation_type?: string | null
          background_color?: string | null
          button_color?: string | null
          button_hover_color?: string | null
          button_link?: string | null
          button_text?: string
          category?: string
          created_at?: string | null
          description?: string | null
          display_duration?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          order?: number | null
          overlay_opacity?: number | null
          subtitle?: string | null
          text_alignment?: string | null
          text_color?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      data_sources: {
        Row: {
          active: boolean | null
          campeonatos: string[] | null
          created_at: string
          id: string
          name: string
          priority: number | null
          updated_at: string
          url: string
        }
        Insert: {
          active?: boolean | null
          campeonatos?: string[] | null
          created_at?: string
          id?: string
          name: string
          priority?: number | null
          updated_at?: string
          url: string
        }
        Update: {
          active?: boolean | null
          campeonatos?: string[] | null
          created_at?: string
          id?: string
          name?: string
          priority?: number | null
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      download_logs: {
        Row: {
          created_at: string
          download_type: string
          id: string
          ip_address: unknown | null
          product_id: string
          product_title: string
          user_agent: string | null
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          download_type?: string
          id?: string
          ip_address?: unknown | null
          product_id: string
          product_title: string
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          download_type?: string
          id?: string
          ip_address?: unknown | null
          product_id?: string
          product_title?: string
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      event_appointments: {
        Row: {
          address: string
          appointment_date: string
          appointment_time: string
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string
          updated_at: string
        }
        Insert: {
          address: string
          appointment_date: string
          appointment_time: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          phone: string
          updated_at?: string
        }
        Update: {
          address?: string
          appointment_date?: string
          appointment_time?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          day_of_week: string | null
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          order: number | null
          time: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          day_of_week?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          order?: number | null
          time?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          day_of_week?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          order?: number | null
          time?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      fetch_logs: {
        Row: {
          campeonato: string
          created_at: string
          games_found: number | null
          id: string
          message: string | null
          source: string
          status: string
          timestamp: string
        }
        Insert: {
          campeonato: string
          created_at?: string
          games_found?: number | null
          id?: string
          message?: string | null
          source: string
          status: string
          timestamp?: string
        }
        Update: {
          campeonato?: string
          created_at?: string
          games_found?: number | null
          id?: string
          message?: string | null
          source?: string
          status?: string
          timestamp?: string
        }
        Relationships: []
      }
      games: {
        Row: {
          arbitro: string | null
          campeonato: string
          cartoes_amarelos_casa: number | null
          cartoes_amarelos_fora: number | null
          cartoes_vermelhos_casa: number | null
          cartoes_vermelhos_fora: number | null
          created_at: string
          data: string
          estadio: string
          fase: string | null
          hora: string
          id: string
          observacoes: string | null
          placar_casa: number | null
          placar_fora: number | null
          publico: number | null
          rodada: number | null
          serie: string | null
          status: string | null
          tempo_jogo: string | null
          time_casa: string
          time_casa_id: string | null
          time_fora: string
          time_fora_id: string | null
          transmissao: string[] | null
          updated_at: string
        }
        Insert: {
          arbitro?: string | null
          campeonato: string
          cartoes_amarelos_casa?: number | null
          cartoes_amarelos_fora?: number | null
          cartoes_vermelhos_casa?: number | null
          cartoes_vermelhos_fora?: number | null
          created_at?: string
          data: string
          estadio: string
          fase?: string | null
          hora: string
          id?: string
          observacoes?: string | null
          placar_casa?: number | null
          placar_fora?: number | null
          publico?: number | null
          rodada?: number | null
          serie?: string | null
          status?: string | null
          tempo_jogo?: string | null
          time_casa: string
          time_casa_id?: string | null
          time_fora: string
          time_fora_id?: string | null
          transmissao?: string[] | null
          updated_at?: string
        }
        Update: {
          arbitro?: string | null
          campeonato?: string
          cartoes_amarelos_casa?: number | null
          cartoes_amarelos_fora?: number | null
          cartoes_vermelhos_casa?: number | null
          cartoes_vermelhos_fora?: number | null
          created_at?: string
          data?: string
          estadio?: string
          fase?: string | null
          hora?: string
          id?: string
          observacoes?: string | null
          placar_casa?: number | null
          placar_fora?: number | null
          publico?: number | null
          rodada?: number | null
          serie?: string | null
          status?: string | null
          tempo_jogo?: string | null
          time_casa?: string
          time_casa_id?: string | null
          time_fora?: string
          time_fora_id?: string | null
          transmissao?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "games_time_casa_id_fkey"
            columns: ["time_casa_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_time_fora_id_fkey"
            columns: ["time_fora_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      global_theme_settings: {
        Row: {
          applied_at: string
          applied_by: string | null
          created_at: string
          id: string
          is_active: boolean
          theme_id: string
          theme_name: string
          theme_variables: Json
          updated_at: string
        }
        Insert: {
          applied_at?: string
          applied_by?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          theme_id?: string
          theme_name?: string
          theme_variables?: Json
          updated_at?: string
        }
        Update: {
          applied_at?: string
          applied_by?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          theme_id?: string
          theme_name?: string
          theme_variables?: Json
          updated_at?: string
        }
        Relationships: []
      }
      hero_slides: {
        Row: {
          animation_duration: number | null
          animation_type: string | null
          background_color: string | null
          button_color: string | null
          button_hover_color: string | null
          button_link: string | null
          button_text: string
          category: string
          created_at: string | null
          description: string | null
          display_duration: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          order: number | null
          overlay_opacity: number | null
          subtitle: string | null
          text_alignment: string | null
          text_color: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          animation_duration?: number | null
          animation_type?: string | null
          background_color?: string | null
          button_color?: string | null
          button_hover_color?: string | null
          button_link?: string | null
          button_text: string
          category: string
          created_at?: string | null
          description?: string | null
          display_duration?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          order?: number | null
          overlay_opacity?: number | null
          subtitle?: string | null
          text_alignment?: string | null
          text_color?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          animation_duration?: number | null
          animation_type?: string | null
          background_color?: string | null
          button_color?: string | null
          button_hover_color?: string | null
          button_link?: string | null
          button_text?: string
          category?: string
          created_at?: string | null
          description?: string | null
          display_duration?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          order?: number | null
          overlay_opacity?: number | null
          subtitle?: string | null
          text_alignment?: string | null
          text_color?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      navigation_links: {
        Row: {
          created_at: string | null
          href: string
          id: string
          is_active: boolean | null
          order: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          href: string
          id?: string
          is_active?: boolean | null
          order?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          href?: string
          id?: string
          is_active?: boolean | null
          order?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string | null
          download_count: number | null
          id: string
          order_id: string | null
          price: number
          product_id: string | null
          quantity: number
        }
        Insert: {
          created_at?: string | null
          download_count?: number | null
          id?: string
          order_id?: string | null
          price: number
          product_id?: string | null
          quantity: number
        }
        Update: {
          created_at?: string | null
          download_count?: number | null
          id?: string
          order_id?: string | null
          price?: number
          product_id?: string | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          id: string
          items: Json
          paypal_order_id: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          id?: string
          items: Json
          paypal_order_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          id?: string
          items?: Json
          paypal_order_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          category_id: string
          created_at: string
          id: string
          product_id: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          product_id: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_categories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          affiliate_link: string | null
          category: string | null
          coming_soon: boolean | null
          created_at: string
          created_by: string | null
          description: string | null
          discount: number | null
          discount_price: number | null
          featured: boolean | null
          free_download_link: string | null
          id: string
          image: string | null
          image_focus_point: Json | null
          images: string[] | null
          is_active: boolean | null
          is_free: boolean | null
          original_price: number | null
          payment_link: string | null
          rating: number | null
          reviews: number | null
          shopee_link: string | null
          slug: string | null
          tags: string[] | null
          title: string
          updated_at: string
          youtube_video_url: string | null
        }
        Insert: {
          affiliate_link?: string | null
          category?: string | null
          coming_soon?: boolean | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          discount?: number | null
          discount_price?: number | null
          featured?: boolean | null
          free_download_link?: string | null
          id?: string
          image?: string | null
          image_focus_point?: Json | null
          images?: string[] | null
          is_active?: boolean | null
          is_free?: boolean | null
          original_price?: number | null
          payment_link?: string | null
          rating?: number | null
          reviews?: number | null
          shopee_link?: string | null
          slug?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          youtube_video_url?: string | null
        }
        Update: {
          affiliate_link?: string | null
          category?: string | null
          coming_soon?: boolean | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          discount?: number | null
          discount_price?: number | null
          featured?: boolean | null
          free_download_link?: string | null
          id?: string
          image?: string | null
          image_focus_point?: Json | null
          images?: string[] | null
          is_active?: boolean | null
          is_free?: boolean | null
          original_price?: number | null
          payment_link?: string | null
          rating?: number | null
          reviews?: number | null
          shopee_link?: string | null
          slug?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          youtube_video_url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      reading_plan_days: {
        Row: {
          content: string
          created_at: string | null
          day_number: number
          id: number
          passage: string
          plan_id: number
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          day_number: number
          id?: number
          passage: string
          plan_id: number
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          day_number?: number
          id?: number
          passage?: string
          plan_id?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reading_plan_days_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "reading_plan_details"
            referencedColumns: ["plan_id"]
          },
        ]
      }
      reading_plan_details: {
        Row: {
          author: string | null
          category: string
          created_at: string | null
          description: string | null
          duration: string | null
          id: number
          image_url: string | null
          is_active: boolean | null
          order_position: number | null
          plan_id: number
          title: string
          updated_at: string | null
        }
        Insert: {
          author?: string | null
          category: string
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean | null
          order_position?: number | null
          plan_id: number
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          category?: string
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean | null
          order_position?: number | null
          plan_id?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      reading_plans: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          plan_url: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          plan_url: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          plan_url?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          content_value: string | null
          created_at: string | null
          id: string
          section_key: string
          updated_at: string | null
        }
        Insert: {
          content_value?: string | null
          created_at?: string | null
          id?: string
          section_key: string
          updated_at?: string | null
        }
        Update: {
          content_value?: string | null
          created_at?: string | null
          id?: string
          section_key?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      standings: {
        Row: {
          aproveitamento: number | null
          campeonato: string
          created_at: string
          derrotas: number
          empates: number
          gols_contra: number
          gols_pro: number
          id: string
          jogos: number
          pontos: number
          posicao: number
          saldo_gols: number | null
          team_id: string
          temporada: string
          ultimos_jogos: string[] | null
          updated_at: string
          vitorias: number
        }
        Insert: {
          aproveitamento?: number | null
          campeonato: string
          created_at?: string
          derrotas?: number
          empates?: number
          gols_contra?: number
          gols_pro?: number
          id?: string
          jogos?: number
          pontos?: number
          posicao: number
          saldo_gols?: number | null
          team_id: string
          temporada?: string
          ultimos_jogos?: string[] | null
          updated_at?: string
          vitorias?: number
        }
        Update: {
          aproveitamento?: number | null
          campeonato?: string
          created_at?: string
          derrotas?: number
          empates?: number
          gols_contra?: number
          gols_pro?: number
          id?: string
          jogos?: number
          pontos?: number
          posicao?: number
          saldo_gols?: number | null
          team_id?: string
          temporada?: string
          ultimos_jogos?: string[] | null
          updated_at?: string
          vitorias?: number
        }
        Relationships: [
          {
            foreignKeyName: "standings_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string | null
          email: string
          expires_at: string | null
          id: string
          mercadopago_subscription_id: string | null
          plan_type: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          expires_at?: string | null
          id?: string
          mercadopago_subscription_id?: string | null
          plan_type?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          expires_at?: string | null
          id?: string
          mercadopago_subscription_id?: string | null
          plan_type?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      teams: {
        Row: {
          cidade: string | null
          created_at: string
          escudo_url: string | null
          estadio: string | null
          estado: string | null
          fundacao: string | null
          id: string
          nome: string
          nome_completo: string | null
          sigla: string
          updated_at: string
        }
        Insert: {
          cidade?: string | null
          created_at?: string
          escudo_url?: string | null
          estadio?: string | null
          estado?: string | null
          fundacao?: string | null
          id?: string
          nome: string
          nome_completo?: string | null
          sigla: string
          updated_at?: string
        }
        Update: {
          cidade?: string | null
          created_at?: string
          escudo_url?: string | null
          estadio?: string | null
          estado?: string | null
          fundacao?: string | null
          id?: string
          nome?: string
          nome_completo?: string | null
          sigla?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      appointment_availability: {
        Row: {
          appointment_date: string | null
          appointment_time: string | null
          booked_slots: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      bootstrap_first_admin: {
        Args: { admin_email: string }
        Returns: boolean
      }
      check_appointment_slot_availability: {
        Args: { check_date: string; check_time: string }
        Returns: boolean
      }
      get_admin_download_logs: {
        Args: { limit_count?: number }
        Returns: {
          created_at: string
          download_type: string
          id: string
          product_id: string
          product_title: string
          user_email_anonymized: string
          user_id_anonymized: string
        }[]
      }
      get_admin_download_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          free: number
          paid: number
          premium: number
          total: number
        }[]
      }
      get_appointment_count_for_date: {
        Args: { check_date: string }
        Returns: number
      }
      get_or_create_chat_session: {
        Args: { requesting_user_id?: string; session_id: string }
        Returns: string
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: string
      }
      is_admin: {
        Args: { user_id?: string }
        Returns: boolean
      }
      log_admin_access: {
        Args: { action_type: string; admin_user_id: string; details?: string }
        Returns: undefined
      }
      update_user_role: {
        Args: { new_role: string; target_user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
