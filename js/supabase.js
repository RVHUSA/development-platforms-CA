import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://hyxjkimpcuvhniohynta.supabase.co";
const supabaseKey = "sb_publishable_5_ngTSjx8zEZIUJSL8eI0g_KcSKvAVn";

export const supabase = createClient(supabaseUrl, supabaseKey);



