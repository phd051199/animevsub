import { createClient } from "@supabase/supabase-js"
import type { Database } from "app/database"

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL || "https://ctwwltbkwksgnispcjmq.supabase.co",
  process.env.SUPABASE_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0d3dsdGJrd2tzZ25pc3Bjam1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAxNjM5ODksImV4cCI6MjAzNTczOTk4OX0.Dva9EPqy4P0KFYLAGpFqFoMBH4I_yz0VWnGny0uA-8U"
)
