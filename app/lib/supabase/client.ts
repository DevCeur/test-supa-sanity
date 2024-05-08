import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;

if (!SUPABASE_URL) throw new Error("SUPABASE_URL env variable missing");
if (!SUPABASE_API_KEY) throw new Error("SUPABASE_API_KEY env variable missing");

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
