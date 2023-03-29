import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async function () {
	return {};
};

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData();
		const formvalues = new FormData();
		formvalues.set('email', formData.get('email') ?? '');
		formvalues.set('password', formData.get('password') ?? '');

		// Need to pass the cookie from client to server (In hooks file?)
		const response = await fetch('http://localhost:3333/register', {
			method: 'POST',
			body: formvalues
		});
		const data = await response.json();
		console.log(data);

		return { success: true };
	}
};
