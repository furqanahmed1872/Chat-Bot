import { json } from '@sveltejs/kit';

export async function POST({ request, locals }) {
  const { userId, remainingTime } = await request.json();
  const { supabase } = await locals;
  const { data, error } = await supabase
    .from('subscriptions')
    .update({ user_voice_time: remainingTime })
    .eq( 'user_id', userId )
    .select();

  if (error) {
    return json({ success: false, error: error.message });
  }

  return json({ success: true, data });
}
