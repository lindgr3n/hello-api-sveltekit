import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async function ({ fetch }) {
	console.log('WOHOOO');
	const response = await fetch('http://localhost:3333/users');
	const { users } = await response.json();
	console.log(users);

	return { users };
};

export const actions: Actions = {
	default: async (event) => {
		return {};
	}
};
