export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      saved_topics: {
        Row: { user_id: string; topic_id: number; saved_at: string };
        Insert: { user_id: string; topic_id: number; saved_at?: string };
        Update: { user_id?: string; topic_id?: number; saved_at?: string };
        Relationships: [];
      };
      study_lists: {
        Row: { id: string; user_id: string; name: string; created_at: string; updated_at: string };
        Insert: { id?: string; user_id: string; name: string; created_at?: string; updated_at?: string };
        Update: { id?: string; user_id?: string; name?: string; created_at?: string; updated_at?: string };
        Relationships: [];
      };
      study_list_topics: {
        Row: { list_id: string; topic_id: number; added_at: string };
        Insert: { list_id: string; topic_id: number; added_at?: string };
        Update: { list_id?: string; topic_id?: number; added_at?: string };
        Relationships: [];
      };
      topic_annotations: {
        Row: { user_id: string; topic_id: number; content: string; drawing_data: Json; updated_at: string };
        Insert: { user_id: string; topic_id: number; content?: string; drawing_data?: Json; updated_at?: string };
        Update: { user_id?: string; topic_id?: number; content?: string; drawing_data?: Json; updated_at?: string };
        Relationships: [];
      };
      reading_progress: {
        Row: {
          user_id: string;
          topic_id: number;
          progress_percent: number;
          last_read_at: string;
          completed_at: string | null;
        };
        Insert: {
          user_id: string;
          topic_id: number;
          progress_percent?: number;
          last_read_at?: string;
          completed_at?: string | null;
        };
        Update: {
          user_id?: string;
          topic_id?: number;
          progress_percent?: number;
          last_read_at?: string;
          completed_at?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          username: string;
          normalized_username: string;
          display_name: string;
          role: Database["public"]["Enums"]["user_role"];
          legacy_user_id: number | null;
          created_at: string;
        };
        Insert: {
          id: string;
          username: string;
          display_name: string;
          role?: Database["public"]["Enums"]["user_role"];
          legacy_user_id?: number | null;
          created_at?: string;
        };
        Update: {
          username?: string;
          display_name?: string;
          role?: Database["public"]["Enums"]["user_role"];
          legacy_user_id?: number | null;
          created_at?: string;
        };
        Relationships: [];
      };
      subjects: {
        Row: { id: number; name: string; color_hex: string; sort_order: number };
        Insert: { id?: number; name: string; color_hex: string; sort_order: number };
        Update: { id?: number; name?: string; color_hex?: string; sort_order?: number };
        Relationships: [];
      };
      topics: {
        Row: {
          id: number;
          subject_id: number;
          parent_topic_id: number | null;
          title: string;
          sort_order: number;
          preview_snippet: string;
          content: string;
        };
        Insert: {
          id?: number;
          subject_id: number;
          parent_topic_id?: number | null;
          title: string;
          sort_order: number;
          preview_snippet: string;
          content: string;
        };
        Update: {
          id?: number;
          subject_id?: number;
          parent_topic_id?: number | null;
          title?: string;
          sort_order?: number;
          preview_snippet?: string;
          content?: string;
        };
        Relationships: [
          {
            foreignKeyName: "topics_parent_topic_id_fkey";
            columns: ["parent_topic_id"];
            isOneToOne: false;
            referencedRelation: "topics";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "topics_subject_id_fkey";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "subjects";
            referencedColumns: ["id"];
          },
        ];
      };
      topic_related_topics: {
        Row: { topic_id: number; related_topic_id: number };
        Insert: { topic_id: number; related_topic_id: number };
        Update: { topic_id?: number; related_topic_id?: number };
        Relationships: [
          {
            foreignKeyName: "topic_related_topics_related_topic_id_fkey";
            columns: ["related_topic_id"];
            isOneToOne: false;
            referencedRelation: "topics";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "topic_related_topics_topic_id_fkey";
            columns: ["topic_id"];
            isOneToOne: false;
            referencedRelation: "topics";
            referencedColumns: ["id"];
          },
        ];
      };
      contact_messages: {
        Row: { id: number; name: string; email: string; message: string; created_at: string };
        Insert: { id?: number; name: string; email: string; message: string; created_at?: string };
        Update: { id?: number; name?: string; email?: string; message?: string; created_at?: string };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: { user_role: "STUDENT" | "TUTOR" | "ADMIN" };
    CompositeTypes: Record<string, never>;
  };
};
