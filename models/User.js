const { supabase } = require('../utils/supabaseClient');

class User {
  static async create({ email, password, username }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: data.user.id,
          username,
          points: 0,
          total_watch_time: 0
        }
      ]);

    if (profileError) throw profileError;
    return profile;
  }

  static async getById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async updatePoints(userId, points) {
    const { data, error } = await supabase
      .from('users')
      .update({ points })
      .eq('id', userId)
      .select();

    if (error) throw error;
    return data;
  }
}

module.exports = User;