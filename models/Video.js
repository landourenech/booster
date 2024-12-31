const { supabase } = require('../utils/supabaseClient');

class Video {
  static async create({ title, url, userId, requiredPoints }) {
    const { data, error } = await supabase
      .from('videos')
      .insert([
        {
          title,
          url,
          user_id: userId,
          required_points: requiredPoints,
          views: 0,
          total_watch_time: 0
        }
      ])
      .select();

    if (error) throw error;
    return data[0];
  }

  static async getForViewing(userId) {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .neq('user_id', userId)
      .order('views', { ascending: true })
      .limit(10);

    if (error) throw error;
    return data;
  }

  static async recordView(videoId, watchTime) {
    const { data, error } = await supabase.rpc('record_video_view', {
      video_id: videoId,
      watch_time: watchTime
    });

    if (error) throw error;
    return data;
  }
}

module.exports = Video;