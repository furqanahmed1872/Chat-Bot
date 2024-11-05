// src/routes/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
  const { chat, characterList, plan} = await parent()
  return {
    chat,
    characterList,
    plan
  };
};
