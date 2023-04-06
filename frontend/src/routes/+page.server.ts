import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async function ({ fetch, cookies }) {
	const cookieString = cookies
		.getAll()
		.map((c) => `${c.name}=${c.value}`)
		.join('; ');
	console.log('STORED COOKIES', cookieString);

	const response = await fetch('http://localhost:3333/users', {
		credentials: 'include',
		headers: { Cookie: cookieString }
	}); // Because we are on the same domin localhost in this case the cookies is passed and auth works.
	// Need to have adonis and sveltekit on the same domain. e.g. my-app.com and adonis is sub for that
	const data = await response.json();
	console.log('DATA FROM ADONIS', data);
	const users = data?.users ?? [];
	return { users };
};

export const actions: Actions = {
	default: async () => {
		return {};
	}
};
