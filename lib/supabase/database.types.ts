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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          created_at: string
          event_type: string
          id: string
          meta: Json
          path: string | null
          section: string | null
          session_id: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          meta?: Json
          path?: string | null
          section?: string | null
          session_id?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          meta?: Json
          path?: string | null
          section?: string | null
          session_id?: string | null
        }
        Relationships: []
      }
      certifications: {
        Row: {
          credential_url: string | null
          date_earned: string | null
          id: string
          issuer: string | null
          name: string
          order_index: number
        }
        Insert: {
          credential_url?: string | null
          date_earned?: string | null
          id?: string
          issuer?: string | null
          name: string
          order_index?: number
        }
        Update: {
          credential_url?: string | null
          date_earned?: string | null
          id?: string
          issuer?: string | null
          name?: string
          order_index?: number
        }
        Relationships: []
      }
      comments: {
        Row: {
          author_email: string
          body: string
          created_at: string
          id: string
          post_id: string
        }
        Insert: {
          author_email: string
          body: string
          created_at?: string
          id?: string
          post_id: string
        }
        Update: {
          author_email?: string
          body?: string
          created_at?: string
          id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          read: boolean
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          read?: boolean
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          read?: boolean
        }
        Relationships: []
      }
      media_items: {
        Row: {
          blurb: string | null
          category: string
          creator: string | null
          id: string
          order_index: number
          title: string
        }
        Insert: {
          blurb?: string | null
          category: string
          creator?: string | null
          id?: string
          order_index?: number
          title: string
        }
        Update: {
          blurb?: string | null
          category?: string
          creator?: string | null
          id?: string
          order_index?: number
          title?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          body: string
          created_at: string
          excerpt: string | null
          id: string
          published: boolean
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          body?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          body?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      resume_items: {
        Row: {
          detail: string | null
          id: string
          order_index: number
          org: string | null
          period: string
          role: string
        }
        Insert: {
          detail?: string | null
          id?: string
          order_index?: number
          org?: string | null
          period: string
          role: string
        }
        Update: {
          detail?: string | null
          id?: string
          order_index?: number
          org?: string | null
          period?: string
          role?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          value: Json
        }
        Insert: {
          key: string
          value?: Json
        }
        Update: {
          key?: string
          value?: Json
        }
        Relationships: []
      }
      socials: {
        Row: {
          icon_key: string | null
          id: string
          order_index: number
          platform: string
          url: string
        }
        Insert: {
          icon_key?: string | null
          id?: string
          order_index?: number
          platform: string
          url: string
        }
        Update: {
          icon_key?: string | null
          id?: string
          order_index?: number
          platform?: string
          url?: string
        }
        Relationships: []
      }
      user_prefs: {
        Row: {
          analytics_consent: boolean
          animation_on: boolean
          audio_on: boolean
          id: string
          theme: string
          updated_at: string
          user_email: string
        }
        Insert: {
          analytics_consent?: boolean
          animation_on?: boolean
          audio_on?: boolean
          id?: string
          theme?: string
          updated_at?: string
          user_email: string
        }
        Update: {
          analytics_consent?: boolean
          animation_on?: boolean
          audio_on?: boolean
          id?: string
          theme?: string
          updated_at?: string
          user_email?: string
        }
        Relationships: []
      }
      ventures: {
        Row: {
          blurb: string | null
          created_at: string
          current_work: string | null
          hero_image_url: string | null
          id: string
          long_vision: string | null
          order_index: number
          slug: string
          status: string
          tag: string | null
          theme_key: string | null
          title: string
          updated_at: string
        }
        Insert: {
          blurb?: string | null
          created_at?: string
          current_work?: string | null
          hero_image_url?: string | null
          id?: string
          long_vision?: string | null
          order_index?: number
          slug: string
          status?: string
          tag?: string | null
          theme_key?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          blurb?: string | null
          created_at?: string
          current_work?: string | null
          hero_image_url?: string | null
          id?: string
          long_vision?: string | null
          order_index?: number
          slug?: string
          status?: string
          tag?: string | null
          theme_key?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
