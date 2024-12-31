const { createClient } = require('@supabase/supabase-js');
const { supabaseConfig } = require('../config/database');

if (!supabaseConfig.url || !supabaseConfig.key) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseConfig.url, supabaseConfig.key);

module.exports = { supabase };