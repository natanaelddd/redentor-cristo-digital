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
      dayflow_credit_history: {
        Row: {
          action: string
          amount: number
          created_at: string | null
          description: string | null
          id: string
          reference_id: string | null
          user_id: string
        }
        Insert: {
          action: string
          amount: number
          created_at?: string | null
          description?: string | null
          id?: string
          reference_id?: string | null
          user_id: string
        }
        Update: {
          action?: string
          amount?: number
          created_at?: string | null
          description?: string | null
          id?: string
          reference_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      dayflow_folders: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      dayflow_generated_images: {
        Row: {
          aspect_ratio: string | null
          created_at: string | null
          folder_id: string | null
          id: string
          image_url: string | null
          is_favorite: boolean | null
          optimized_prompt: string
          original_prompt: string
          storage_path: string | null
          style: string
          user_id: string
        }
        Insert: {
          aspect_ratio?: string | null
          created_at?: string | null
          folder_id?: string | null
          id?: string
          image_url?: string | null
          is_favorite?: boolean | null
          optimized_prompt: string
          original_prompt: string
          storage_path?: string | null
          style: string
          user_id: string
        }
        Update: {
          aspect_ratio?: string | null
          created_at?: string | null
          folder_id?: string | null
          id?: string
          image_url?: string | null
          is_favorite?: boolean | null
          optimized_prompt?: string
          original_prompt?: string
          storage_path?: string | null
          style?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dayflow_generated_images_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "dayflow_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      dayflow_styles: {
        Row: {
          created_at: string | null
          description: string | null
          display_name: string
          example_image_url: string | null
          id: string
          is_active: boolean | null
          is_premium: boolean | null
          name: string
          order_position: number | null
          prompt_prefix: string
          prompt_suffix: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_name: string
          example_image_url?: string | null
          id?: string
          is_active?: boolean | null
          is_premium?: boolean | null
          name: string
          order_position?: number | null
          prompt_prefix: string
          prompt_suffix?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_name?: string
          example_image_url?: string | null
          id?: string
          is_active?: boolean | null
          is_premium?: boolean | null
          name?: string
          order_position?: number | null
          prompt_prefix?: string
          prompt_suffix?: string | null
        }
        Relationships: []
      }
      dayflow_subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan: string
          status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan: string
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan?: string
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      dayflow_templates: {
        Row: {
          base_prompt: string
          category: string
          created_at: string | null
          description: string | null
          example_image_url: string | null
          id: string
          is_active: boolean | null
          is_premium: boolean | null
          name: string
          order_position: number | null
        }
        Insert: {
          base_prompt: string
          category: string
          created_at?: string | null
          description?: string | null
          example_image_url?: string | null
          id?: string
          is_active?: boolean | null
          is_premium?: boolean | null
          name: string
          order_position?: number | null
        }
        Update: {
          base_prompt?: string
          category?: string
          created_at?: string | null
          description?: string | null
          example_image_url?: string | null
          id?: string
          is_active?: boolean | null
          is_premium?: boolean | null
          name?: string
          order_position?: number | null
        }
        Relationships: []
      }
      dayflow_user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          credits_limit: number | null
          credits_used: number | null
          display_name: string | null
          id: string
          plan: string | null
          preferred_style: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          credits_limit?: number | null
          credits_used?: number | null
          display_name?: string | null
          id?: string
          plan?: string | null
          preferred_style?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          credits_limit?: number | null
          credits_used?: number | null
          display_name?: string | null
          id?: string
          plan?: string | null
          preferred_style?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      download_logs: {
        Row: {
          created_at: string
          download_type: string
          id: string
          ip_address: unknown
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
          ip_address?: unknown
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
          ip_address?: unknown
          product_id?: string
          product_title?: string
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      epc_leads: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          ip_address: unknown
          phone: string
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          ip_address?: unknown
          phone: string
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          ip_address?: unknown
          phone?: string
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      event_announcements: {
        Row: {
          background_color: string | null
          created_at: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          link_text: string | null
          link_url: string | null
          message: string
          order_position: number | null
          start_date: string | null
          text_color: string | null
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          background_color?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          link_text?: string | null
          link_url?: string | null
          message: string
          order_position?: number | null
          start_date?: string | null
          text_color?: string | null
          title: string
          type?: string
          updated_at?: string | null
        }
        Update: {
          background_color?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          link_text?: string | null
          link_url?: string | null
          message?: string
          order_position?: number | null
          start_date?: string | null
          text_color?: string | null
          title?: string
          type?: string
          updated_at?: string | null
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
          user_id: string | null
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
          user_id?: string | null
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
          user_id?: string | null
        }
        Relationships: []
      }
      event_form_fields: {
        Row: {
          created_at: string
          field_name: string
          field_type: Database["public"]["Enums"]["field_type"]
          form_id: string
          id: string
          is_active: boolean | null
          is_required: boolean | null
          label: string
          options: Json | null
          order_position: number
          placeholder: string | null
          updated_at: string
          validation_rules: Json | null
        }
        Insert: {
          created_at?: string
          field_name: string
          field_type: Database["public"]["Enums"]["field_type"]
          form_id: string
          id?: string
          is_active?: boolean | null
          is_required?: boolean | null
          label: string
          options?: Json | null
          order_position?: number
          placeholder?: string | null
          updated_at?: string
          validation_rules?: Json | null
        }
        Update: {
          created_at?: string
          field_name?: string
          field_type?: Database["public"]["Enums"]["field_type"]
          form_id?: string
          id?: string
          is_active?: boolean | null
          is_required?: boolean | null
          label?: string
          options?: Json | null
          order_position?: number
          placeholder?: string | null
          updated_at?: string
          validation_rules?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "event_form_fields_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "event_forms"
            referencedColumns: ["id"]
          },
        ]
      }
      event_forms: {
        Row: {
          banner_button_text: string | null
          banner_description: string | null
          banner_title: string | null
          confirmation_email_body: string | null
          confirmation_email_subject: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          max_registrations: number | null
          name: string
          page_description: string | null
          page_title: string | null
          registration_count: number | null
          slug: string
          updated_at: string
        }
        Insert: {
          banner_button_text?: string | null
          banner_description?: string | null
          banner_title?: string | null
          confirmation_email_body?: string | null
          confirmation_email_subject?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          max_registrations?: number | null
          name: string
          page_description?: string | null
          page_title?: string | null
          registration_count?: number | null
          slug: string
          updated_at?: string
        }
        Update: {
          banner_button_text?: string | null
          banner_description?: string | null
          banner_title?: string | null
          confirmation_email_body?: string | null
          confirmation_email_subject?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          max_registrations?: number | null
          name?: string
          page_description?: string | null
          page_title?: string | null
          registration_count?: number | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      event_inscriptions: {
        Row: {
          address: string
          created_at: string
          email: string
          full_name: string
          id: string
          participant_type: string
          phone: string
          updated_at: string
        }
        Insert: {
          address: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          participant_type?: string
          phone: string
          updated_at?: string
        }
        Update: {
          address?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          participant_type?: string
          phone?: string
          updated_at?: string
        }
        Relationships: []
      }
      event_registrations: {
        Row: {
          created_at: string
          form_id: string
          id: string
          ip_address: unknown
          registration_data: Json
          status: Database["public"]["Enums"]["registration_status"] | null
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          form_id: string
          id?: string
          ip_address?: unknown
          registration_data?: Json
          status?: Database["public"]["Enums"]["registration_status"] | null
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          form_id?: string
          id?: string
          ip_address?: unknown
          registration_data?: Json
          status?: Database["public"]["Enums"]["registration_status"] | null
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "event_forms"
            referencedColumns: ["id"]
          },
        ]
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
      habita_activity_log: {
        Row: {
          action_type: string
          created_at: string
          document_id: string | null
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          action_type: string
          created_at?: string
          document_id?: string | null
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          action_type?: string
          created_at?: string
          document_id?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "habita_activity_log_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "habita_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      habita_alerts: {
        Row: {
          created_at: string
          document_id: string
          id: string
          matched_value: string
          sent_at: string | null
          status: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          document_id: string
          id?: string
          matched_value: string
          sent_at?: string | null
          status?: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          document_id?: string
          id?: string
          matched_value?: string
          sent_at?: string | null
          status?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "habita_alerts_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "habita_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      habita_companies: {
        Row: {
          address: string | null
          city: string | null
          cnpj: string | null
          company_type: Database["public"]["Enums"]["company_type"] | null
          created_at: string | null
          email: string | null
          enriched_at: string | null
          enrichment_source: string | null
          id: string
          instagram_url: string | null
          linkedin_url: string | null
          lusha_enriched: boolean | null
          name: string
          normalized_name: string
          phone: string | null
          state: string | null
          total_projects: number | null
          total_units: number | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          cnpj?: string | null
          company_type?: Database["public"]["Enums"]["company_type"] | null
          created_at?: string | null
          email?: string | null
          enriched_at?: string | null
          enrichment_source?: string | null
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          lusha_enriched?: boolean | null
          name: string
          normalized_name: string
          phone?: string | null
          state?: string | null
          total_projects?: number | null
          total_units?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          cnpj?: string | null
          company_type?: Database["public"]["Enums"]["company_type"] | null
          created_at?: string | null
          email?: string | null
          enriched_at?: string | null
          enrichment_source?: string | null
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          lusha_enriched?: boolean | null
          name?: string
          normalized_name?: string
          phone?: string | null
          state?: string | null
          total_projects?: number | null
          total_units?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      habita_contacts: {
        Row: {
          company_name: string | null
          created_at: string
          email: string | null
          id: string
          lusha_enriched: boolean | null
          name: string
          notes: string | null
          phone: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          lusha_enriched?: boolean | null
          name: string
          notes?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          lusha_enriched?: boolean | null
          name?: string
          notes?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      habita_crawler_config: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          max_retries: number | null
          mode: string
          rate_limit_hours: number | null
          source_url: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          max_retries?: number | null
          mode?: string
          rate_limit_hours?: number | null
          source_url?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          max_retries?: number | null
          mode?: string
          rate_limit_hours?: number | null
          source_url?: string
          updated_at?: string
        }
        Relationships: []
      }
      habita_document_entries: {
        Row: {
          area_total_m2: number | null
          company_id: string | null
          construtora: string | null
          contato_construtora: string | null
          created_at: string | null
          created_by: string | null
          data_decisao: string | null
          data_entrada: string | null
          document_id: string | null
          id: string
          interessado: string
          is_published: boolean | null
          municipio: string
          numero_protocolo: string | null
          numero_unidades: number | null
          observacoes: string | null
          situacao: string | null
          tipo_empreendimento: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          area_total_m2?: number | null
          company_id?: string | null
          construtora?: string | null
          contato_construtora?: string | null
          created_at?: string | null
          created_by?: string | null
          data_decisao?: string | null
          data_entrada?: string | null
          document_id?: string | null
          id?: string
          interessado: string
          is_published?: boolean | null
          municipio: string
          numero_protocolo?: string | null
          numero_unidades?: number | null
          observacoes?: string | null
          situacao?: string | null
          tipo_empreendimento?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          area_total_m2?: number | null
          company_id?: string | null
          construtora?: string | null
          contato_construtora?: string | null
          created_at?: string | null
          created_by?: string | null
          data_decisao?: string | null
          data_entrada?: string | null
          document_id?: string | null
          id?: string
          interessado?: string
          is_published?: boolean | null
          municipio?: string
          numero_protocolo?: string | null
          numero_unidades?: number | null
          observacoes?: string | null
          situacao?: string | null
          tipo_empreendimento?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "habita_document_entries_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "habita_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "habita_document_entries_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "habita_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      habita_document_tags: {
        Row: {
          created_at: string
          id: string
          tag_id: string
          user_document_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          tag_id: string
          user_document_id: string
        }
        Update: {
          created_at?: string
          id?: string
          tag_id?: string
          user_document_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "habita_document_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "habita_tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "habita_document_tags_user_document_id_fkey"
            columns: ["user_document_id"]
            isOneToOne: false
            referencedRelation: "habita_user_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      habita_documents: {
        Row: {
          checksum: string | null
          collected_at: string
          created_at: string
          document_date: string | null
          file_name: string
          id: string
          municipalities: string[] | null
          raw_text: string | null
          source_file_url: string
          source_name: string | null
          source_page_url: string
          source_state: string | null
          status: string
          storage_path: string | null
          title: string
          updated_at: string
          year: number | null
        }
        Insert: {
          checksum?: string | null
          collected_at?: string
          created_at?: string
          document_date?: string | null
          file_name: string
          id?: string
          municipalities?: string[] | null
          raw_text?: string | null
          source_file_url: string
          source_name?: string | null
          source_page_url: string
          source_state?: string | null
          status?: string
          storage_path?: string | null
          title: string
          updated_at?: string
          year?: number | null
        }
        Update: {
          checksum?: string | null
          collected_at?: string
          created_at?: string
          document_date?: string | null
          file_name?: string
          id?: string
          municipalities?: string[] | null
          raw_text?: string | null
          source_file_url?: string
          source_name?: string | null
          source_page_url?: string
          source_state?: string | null
          status?: string
          storage_path?: string | null
          title?: string
          updated_at?: string
          year?: number | null
        }
        Relationships: []
      }
      habita_entry_audit_log: {
        Row: {
          action: string
          created_at: string | null
          entry_id: string | null
          id: string
          new_values: Json | null
          old_values: Json | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          entry_id?: string | null
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          entry_id?: string | null
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "habita_entry_audit_log_entry_id_fkey"
            columns: ["entry_id"]
            isOneToOne: false
            referencedRelation: "habita_document_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "habita_entry_audit_log_entry_id_fkey"
            columns: ["entry_id"]
            isOneToOne: false
            referencedRelation: "habita_entries_public"
            referencedColumns: ["id"]
          },
        ]
      }
      habita_extraction_logs: {
        Row: {
          created_at: string
          document_id: string | null
          document_title: string | null
          id: string
          message: string
          status: string
          step: string
        }
        Insert: {
          created_at?: string
          document_id?: string | null
          document_title?: string | null
          id?: string
          message: string
          status?: string
          step: string
        }
        Update: {
          created_at?: string
          document_id?: string | null
          document_title?: string | null
          id?: string
          message?: string
          status?: string
          step?: string
        }
        Relationships: [
          {
            foreignKeyName: "habita_extraction_logs_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "habita_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      habita_ingestion_logs: {
        Row: {
          created_at: string
          documents_found: number | null
          documents_new: number | null
          error_message: string | null
          finished_at: string | null
          html_snapshot: string | null
          id: string
          started_at: string
          status: string
        }
        Insert: {
          created_at?: string
          documents_found?: number | null
          documents_new?: number | null
          error_message?: string | null
          finished_at?: string | null
          html_snapshot?: string | null
          id?: string
          started_at?: string
          status?: string
        }
        Update: {
          created_at?: string
          documents_found?: number | null
          documents_new?: number | null
          error_message?: string | null
          finished_at?: string | null
          html_snapshot?: string | null
          id?: string
          started_at?: string
          status?: string
        }
        Relationships: []
      }
      habita_state_sources: {
        Row: {
          created_at: string
          documents_count: number | null
          id: string
          is_active: boolean | null
          last_scraped_at: string | null
          scraper_function: string | null
          source_full_name: string
          source_name: string
          source_url: string
          state_code: string
          state_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          documents_count?: number | null
          id?: string
          is_active?: boolean | null
          last_scraped_at?: string | null
          scraper_function?: string | null
          source_full_name: string
          source_name: string
          source_url: string
          state_code: string
          state_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          documents_count?: number | null
          id?: string
          is_active?: boolean | null
          last_scraped_at?: string | null
          scraper_function?: string | null
          source_full_name?: string
          source_name?: string
          source_url?: string
          state_code?: string
          state_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      habita_tags: {
        Row: {
          color: string
          created_at: string
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          color?: string
          created_at?: string
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          color?: string
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      habita_tracked_companies: {
        Row: {
          company_id: string
          created_at: string
          id: string
          notes: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          notes?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "habita_tracked_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "habita_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      habita_user_documents: {
        Row: {
          created_at: string
          document_id: string
          id: string
          is_favorite: boolean
          notes: string | null
          priority: Database["public"]["Enums"]["habita_priority"] | null
          reminder_date: string | null
          status: Database["public"]["Enums"]["habita_document_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          document_id: string
          id?: string
          is_favorite?: boolean
          notes?: string | null
          priority?: Database["public"]["Enums"]["habita_priority"] | null
          reminder_date?: string | null
          status?: Database["public"]["Enums"]["habita_document_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          document_id?: string
          id?: string
          is_favorite?: boolean
          notes?: string | null
          priority?: Database["public"]["Enums"]["habita_priority"] | null
          reminder_date?: string | null
          status?: Database["public"]["Enums"]["habita_document_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "habita_user_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "habita_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      habita_user_profiles: {
        Row: {
          created_at: string
          export_count_month: number | null
          last_visit: string | null
          onboarding_completed: boolean | null
          plan: string
          trial_ends_at: string | null
          trial_used: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          export_count_month?: number | null
          last_visit?: string | null
          onboarding_completed?: boolean | null
          plan?: string
          trial_ends_at?: string | null
          trial_used?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          export_count_month?: number | null
          last_visit?: string | null
          onboarding_completed?: boolean | null
          plan?: string
          trial_ends_at?: string | null
          trial_used?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      habita_watchlists: {
        Row: {
          created_at: string
          id: string
          is_enabled: boolean | null
          type: string
          updated_at: string
          user_id: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_enabled?: boolean | null
          type: string
          updated_at?: string
          user_id: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          is_enabled?: boolean | null
          type?: string
          updated_at?: string
          user_id?: string
          value?: string
        }
        Relationships: []
      }
      hero_settings: {
        Row: {
          created_at: string
          id: string
          is_hero_enabled: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_hero_enabled?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_hero_enabled?: boolean
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
      leads: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          ip_address: unknown
          phone: string
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          ip_address?: unknown
          phone: string
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          ip_address?: unknown
          phone?: string
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      majik_admins: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string | null
          password_hash: string | null
          role: string | null
          updated_at: string | null
          user_id: string | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name?: string | null
          password_hash?: string | null
          role?: string | null
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string | null
          password_hash?: string | null
          role?: string | null
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
        }
        Relationships: []
      }
      majik_contact_submissions: {
        Row: {
          country_code: string
          created_at: string | null
          email: string
          full_name: string
          id: string
          message: string
          phone: string
          phone_verified: boolean | null
          status: string | null
          subject: string
          updated_at: string | null
        }
        Insert: {
          country_code: string
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          message: string
          phone: string
          phone_verified?: boolean | null
          status?: string | null
          subject: string
          updated_at?: string | null
        }
        Update: {
          country_code?: string
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          message?: string
          phone?: string
          phone_verified?: boolean | null
          status?: string | null
          subject?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      majik_phone_verifications: {
        Row: {
          attempts: number
          created_at: string
          expires_at: string
          id: string
          phone_number: string
          session_info: string | null
          status: string
          updated_at: string
          verification_code: string
          verified_at: string | null
        }
        Insert: {
          attempts?: number
          created_at?: string
          expires_at: string
          id?: string
          phone_number: string
          session_info?: string | null
          status?: string
          updated_at?: string
          verification_code: string
          verified_at?: string | null
        }
        Update: {
          attempts?: number
          created_at?: string
          expires_at?: string
          id?: string
          phone_number?: string
          session_info?: string | null
          status?: string
          updated_at?: string
          verification_code?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      majik_professional_submissions: {
        Row: {
          additional_info: string | null
          address: string | null
          availability: string[] | null
          country_code: string
          created_at: string | null
          documents_count: number | null
          email: string
          experience: string | null
          full_name: string
          has_own_transport: boolean | null
          has_references: boolean | null
          id: string
          phone: string
          phone_verified: boolean | null
          postal_code: string | null
          references_details: string | null
          service_types: string[] | null
          status: string | null
          updated_at: string | null
          work_address: string | null
          work_postal_code: string | null
        }
        Insert: {
          additional_info?: string | null
          address?: string | null
          availability?: string[] | null
          country_code: string
          created_at?: string | null
          documents_count?: number | null
          email: string
          experience?: string | null
          full_name: string
          has_own_transport?: boolean | null
          has_references?: boolean | null
          id?: string
          phone: string
          phone_verified?: boolean | null
          postal_code?: string | null
          references_details?: string | null
          service_types?: string[] | null
          status?: string | null
          updated_at?: string | null
          work_address?: string | null
          work_postal_code?: string | null
        }
        Update: {
          additional_info?: string | null
          address?: string | null
          availability?: string[] | null
          country_code?: string
          created_at?: string | null
          documents_count?: number | null
          email?: string
          experience?: string | null
          full_name?: string
          has_own_transport?: boolean | null
          has_references?: boolean | null
          id?: string
          phone?: string
          phone_verified?: boolean | null
          postal_code?: string | null
          references_details?: string | null
          service_types?: string[] | null
          status?: string | null
          updated_at?: string | null
          work_address?: string | null
          work_postal_code?: string | null
        }
        Relationships: []
      }
      majik_service_submissions: {
        Row: {
          additional_details: string | null
          address: string | null
          country_code: string
          created_at: string | null
          description: string | null
          email: string
          estimated_area: string | null
          frequency: string | null
          full_name: string
          id: string
          phone: string
          phone_verified: boolean | null
          photos_count: number | null
          postal_code: string | null
          service_modality: string | null
          service_type: string
          status: string | null
          updated_at: string | null
          work_address: string | null
        }
        Insert: {
          additional_details?: string | null
          address?: string | null
          country_code: string
          created_at?: string | null
          description?: string | null
          email: string
          estimated_area?: string | null
          frequency?: string | null
          full_name: string
          id?: string
          phone: string
          phone_verified?: boolean | null
          photos_count?: number | null
          postal_code?: string | null
          service_modality?: string | null
          service_type: string
          status?: string | null
          updated_at?: string | null
          work_address?: string | null
        }
        Update: {
          additional_details?: string | null
          address?: string | null
          country_code?: string
          created_at?: string | null
          description?: string | null
          email?: string
          estimated_area?: string | null
          frequency?: string | null
          full_name?: string
          id?: string
          phone?: string
          phone_verified?: boolean | null
          photos_count?: number | null
          postal_code?: string | null
          service_modality?: string | null
          service_type?: string
          status?: string | null
          updated_at?: string | null
          work_address?: string | null
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
      pixel_events: {
        Row: {
          created_at: string
          description: string | null
          event_name: string
          event_parameters: Json | null
          event_type: string
          id: string
          is_active: boolean
          trigger_location: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_name: string
          event_parameters?: Json | null
          event_type?: string
          id?: string
          is_active?: boolean
          trigger_location: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          event_name?: string
          event_parameters?: Json | null
          event_type?: string
          id?: string
          is_active?: boolean
          trigger_location?: string
          updated_at?: string
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
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      prospec_contacts: {
        Row: {
          city: string | null
          company: string | null
          created_at: string
          created_by: string | null
          email: string | null
          enriched_at: string | null
          full_name: string
          id: string
          interests: string[] | null
          linkedin_url: string | null
          lusha_enriched: boolean | null
          notes: string | null
          phone: string | null
          source: string | null
          state: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          city?: string | null
          company?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          enriched_at?: string | null
          full_name: string
          id?: string
          interests?: string[] | null
          linkedin_url?: string | null
          lusha_enriched?: boolean | null
          notes?: string | null
          phone?: string | null
          source?: string | null
          state?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          city?: string | null
          company?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          enriched_at?: string | null
          full_name?: string
          id?: string
          interests?: string[] | null
          linkedin_url?: string | null
          lusha_enriched?: boolean | null
          notes?: string | null
          phone?: string | null
          source?: string | null
          state?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      prospec_reports: {
        Row: {
          created_at: string
          created_by: string | null
          file_url: string | null
          filters: Json | null
          format: string
          id: string
          name: string
          total_contacts: number | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          file_url?: string | null
          filters?: Json | null
          format?: string
          id?: string
          name: string
          total_contacts?: number | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          file_url?: string | null
          filters?: Json | null
          format?: string
          id?: string
          name?: string
          total_contacts?: number | null
        }
        Relationships: []
      }
      quiz_submissions: {
        Row: {
          answers: Json
          created_at: string
          id: string
          lesson_number: number
          lesson_title: string
          score: number | null
          student_name: string
          total_questions: number | null
        }
        Insert: {
          answers?: Json
          created_at?: string
          id?: string
          lesson_number: number
          lesson_title: string
          score?: number | null
          student_name: string
          total_questions?: number | null
        }
        Update: {
          answers?: Json
          created_at?: string
          id?: string
          lesson_number?: number
          lesson_title?: string
          score?: number | null
          student_name?: string
          total_questions?: number | null
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
          external_link_text: string | null
          id: number
          image_url: string | null
          is_active: boolean | null
          link_url: string | null
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
          external_link_text?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean | null
          link_url?: string | null
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
          external_link_text?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean | null
          link_url?: string | null
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
      referral_links: {
        Row: {
          clicks: number | null
          conversions: number | null
          created_at: string
          description: string | null
          id: string
          status: string | null
          title: string
          updated_at: string
          url: string
          user_id: string | null
        }
        Insert: {
          clicks?: number | null
          conversions?: number | null
          created_at?: string
          description?: string | null
          id?: string
          status?: string | null
          title: string
          updated_at?: string
          url: string
          user_id?: string | null
        }
        Update: {
          clicks?: number | null
          conversions?: number | null
          created_at?: string
          description?: string | null
          id?: string
          status?: string | null
          title?: string
          updated_at?: string
          url?: string
          user_id?: string | null
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
      unlimited_users: {
        Row: {
          created_at: string
          email: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      habita_entries_public: {
        Row: {
          area_total_m2: number | null
          company_city: string | null
          company_email: string | null
          company_enriched: boolean | null
          company_id: string | null
          company_linkedin: string | null
          company_name: string | null
          company_phone: string | null
          company_state: string | null
          company_total_projects: number | null
          company_total_units: number | null
          company_type: Database["public"]["Enums"]["company_type"] | null
          company_website: string | null
          created_at: string | null
          data_decisao: string | null
          data_entrada: string | null
          id: string | null
          interessado: string | null
          municipio: string | null
          numero_protocolo: string | null
          numero_unidades: number | null
          situacao: string | null
          tipo_empreendimento: string | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "habita_document_entries_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "habita_companies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      anonymize_appointment_data: {
        Args: { appointment_data: Json }
        Returns: Json
      }
      bootstrap_first_admin: { Args: { admin_email: string }; Returns: boolean }
      check_appointment_availability: {
        Args: { check_date: string; check_time: string }
        Returns: boolean
      }
      check_appointment_rate_limit: {
        Args: { client_email: string; client_ip?: unknown }
        Returns: boolean
      }
      check_appointment_slot_availability: {
        Args: { check_date: string; check_time: string }
        Returns: boolean
      }
      check_lead_rate_limit: {
        Args: { client_email: string }
        Returns: boolean
      }
      consolidate_companies: { Args: never; Returns: number }
      encrypt_sensitive_field: {
        Args: { encryption_key?: string; field_value: string }
        Returns: string
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
        Args: never
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
      get_user_role: { Args: { user_id: string }; Returns: string }
      habita_is_admin: { Args: { user_id?: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      has_unlimited_generations: {
        Args: { _user_id: string }
        Returns: boolean
      }
      is_admin: { Args: { user_id?: string }; Returns: boolean }
      log_admin_access: {
        Args: { action_type: string; admin_user_id: string; details?: string }
        Returns: undefined
      }
      majik_cleanup_expired_verifications: { Args: never; Returns: undefined }
      majik_is_admin: { Args: { check_user_id?: string }; Returns: boolean }
      majik_verify_admin: {
        Args: { p_password: string; p_username: string }
        Returns: {
          id: string
          name: string
          role: string
          username: string
        }[]
      }
      make_user_admin: { Args: { target_email: string }; Returns: boolean }
      normalize_company_name: { Args: { name: string }; Returns: string }
      set_user_as_admin_by_email: {
        Args: { user_email: string }
        Returns: undefined
      }
      update_user_role: {
        Args: { new_role: string; target_user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      admin_permission_level: "viewer" | "editor" | "full_access"
      app_role: "admin" | "moderator" | "user"
      company_type: "incorporadora" | "construtora" | "loteadora" | "mista"
      field_type:
        | "text"
        | "email"
        | "phone"
        | "number"
        | "textarea"
        | "select"
        | "checkbox"
        | "radio"
        | "date"
        | "file"
        | "address"
        | "cpf"
        | "rg"
      habita_document_status:
        | "inbox"
        | "analyzing"
        | "monitoring"
        | "approved"
        | "archived"
      habita_priority: "low" | "medium" | "high" | "urgent"
      registration_status: "pending" | "confirmed" | "cancelled"
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
    Enums: {
      admin_permission_level: ["viewer", "editor", "full_access"],
      app_role: ["admin", "moderator", "user"],
      company_type: ["incorporadora", "construtora", "loteadora", "mista"],
      field_type: [
        "text",
        "email",
        "phone",
        "number",
        "textarea",
        "select",
        "checkbox",
        "radio",
        "date",
        "file",
        "address",
        "cpf",
        "rg",
      ],
      habita_document_status: [
        "inbox",
        "analyzing",
        "monitoring",
        "approved",
        "archived",
      ],
      habita_priority: ["low", "medium", "high", "urgent"],
      registration_status: ["pending", "confirmed", "cancelled"],
    },
  },
} as const
