export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      students: {
        Row: {
          id: string
          name: string
          cohort: string
          courses: Json
          date_joined: string
          last_login: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          cohort: string
          courses?: Json
          date_joined?: string
          last_login?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          cohort?: string
          courses?: Json
          date_joined?: string
          last_login?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}