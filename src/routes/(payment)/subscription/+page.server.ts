import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const { session } = locals;
//   console.log(session.user.id);
  return {
    userID: session.user.id,
  };
};
