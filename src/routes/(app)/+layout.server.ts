// src/routes/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({
  locals: { safeGetSession, supabase },
  cookies,
}) => {
     let Profile = await supabase.auth.getSession();
     let User = await supabase.auth.getUser();
    if (Profile.data.session !== null && User.data.user !== null) {
        const { session } = await safeGetSession();
        const { user } = session;

        const { data: saveChatRecord, error } = await supabase
            .from('conversations')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: true });
         const { data: plan, error: planerror } = await supabase
           .from('subscriptions')
           .select('*')
           .eq('user_id', user.id)
           .order('created_at', { ascending: true });
        // Fetch character list
        const { data: characterList, error: characterListError } = await supabase
            .from('characters')
            .select('*')
            .order('created_at', { ascending: true });

        const { data: myCharacter, error: myCharacterError } = await supabase
            .from('characters')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: true });

        if (error || characterListError || myCharacterError) {
            console.error(
                'Error loading messages or character list:',
                error || characterListError || myCharacterError || planerror,
            );
            return {
                chat: [],
                characterList: [],
                error: 'Failed to load data',
                cookies,
            };
        }

        return {
            chat: saveChatRecord?.map((v) => ({
                chatId: v.chat_id,
                message: v.chat,
                character: v.character,
            })),
            characterList,
            myCharacter,
            plan
        };
    }
    return redirect (300, 'http://localhost:3000/')

};
