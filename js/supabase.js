let supabaseClient = null;

function initSupabase() {
  if (supabaseClient) return supabaseClient;
  supabaseClient = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
  return supabaseClient;
}

function getSupabase() {
  return supabaseClient || initSupabase();
}
