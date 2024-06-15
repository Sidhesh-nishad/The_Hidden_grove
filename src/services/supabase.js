import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ytwbftlnenwkfijlqcev.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0d2JmdGxuZW53a2ZpamxxY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyMDkzMjUsImV4cCI6MjAzMzc4NTMyNX0.Xr33yXsT91JUHf3qzNH9oy6zt_BpRH2b8a2yHHkuZBI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
