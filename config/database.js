require('dotenv').config();

const supabaseConfig = {
  url: process.env.VITE_SUPABASE_URL,
  key: process.env.VITE_SUPABASE_ANON_KEY
};

const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: '30d'
};

module.exports = {
  supabaseConfig,
  jwtConfig
};