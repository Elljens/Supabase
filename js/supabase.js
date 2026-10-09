import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabaseUrl = "https://vobvtfdnetgwumwyhbfm.supabase.co";
const supabaseKey = "sb_publishable_J58vG6yNPQVJ1R3r7PEjeQ_oLy07H1H";

export const supabase = createClient(supabaseUrl, supabaseKey);
