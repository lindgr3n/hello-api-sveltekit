import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import setCookie from 'set-cookie-parser';
import cookie from 'cookie';

export const load: PageServerLoad = async function () {
	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const formvalues = new FormData();
		formvalues.set('email', formData.get('email') ?? '');
		formvalues.set('password', formData.get('password') ?? '');

		// Need to pass the cookie from client to server (In hooks file?)
		const response = await fetch('http://localhost:3333/login', {
			method: 'POST',
			body: formvalues
		});
		const data = await response.json();
		const cookiesToSet = response.headers.get('set-cookie');
		const c = setCookie.parse(setCookie.splitCookiesString(cookiesToSet));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		c.forEach((c: any) => {
			const { name, value, ...rest } = c;
			cookies.set(name, value, rest);
		});
		console.log('RES', c);
		console.log('RESPONSE', data);

		// Need to validate response and return correct error message

		// Need to test this, do we need to validate input here? If we send the request directly to the adonis it will return error that we just return.
		// Still could need correct validation for what field that fails, or could we make a package that parses it?.
		// Just send the response in and the package will throw error if the validation have failed.

		return { user: data.user };
	}
};
