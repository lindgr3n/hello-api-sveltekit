import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async function () {
	return {};
};

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData();

		// Need to pass the cookie from client to server (In hooks file?)
		const response = await fetch('http://localhost:3333/register', {
			method: 'POST',
			body: formData
		});
		const data = await response.json();
		// TODO: redirect to login
		return { success: true };
	}
};
