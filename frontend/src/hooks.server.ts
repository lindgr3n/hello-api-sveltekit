import type { HandleFetch, Handle } from '@sveltejs/kit';

export const handleFetch = (({ request, fetch, event }) => {
	// if (request.url.startsWith('https://api.my-domain.com/')) {
	// request = new Request(
	// 	request.url.replace('https://api.yourapp.com/', 'http://localhost:9999/'),
	// 	request
	// );
	// request.url.replace('https://api.yourapp.com/', 'http://localhost:9999/'),
	// request.headers.set('cookie', event.request.headers.get('cookie'));
	//console.log('HANDLE FETCH', event.cookies);
	const cookieString = event.cookies
		.getAll()
		.map((c) => `${c.name}=${c.value}`)
		.join('; ');
	//console.log('STORED COOKIES INSIDE HOOKS', cookieString);
	request.headers.set('cookie', cookieString);
	//request.credentials = 'include';
	// request.headers.set('cookie', event.cookies);
	// }

	// Because we are on the same server we can just call the localhost directly without going a roundtrip
	if (request.url.startsWith('http://hello-api-sveltekit/')) {
		// clone the original request, but change the URL
		request = new Request(
			request.url.replace('http://hello-api-sveltekit/', 'http://localhost:3333/'),
			request
		);
	}
	console.log('HANDLE FECH COOKIES', request.headers.get('cookie'));
	return fetch(request);
}) satisfies HandleFetch;

import type {} from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	// if (event.url.pathname.startsWith('/custom')) {
	// 	return new Response('custom response');
	// }
	console.log('INSIDE HANDLE');

	const response = await resolve(event);
	return response;
}) satisfies Handle;
