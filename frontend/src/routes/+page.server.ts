import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ fetch }) {
	console.log('WOHOOO');
	const response = await fetch('http://localhost:3333/users');
	const { users } = await response.json();
	console.log(users);

	return { users };
};
