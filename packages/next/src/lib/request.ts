const BASE_API_URL = process.env.BASE_API_URL ?? '';
const BASE_API_PATH = process.env.BASE_PATH ?? '/chibisafe';

const request = {
	raw: async ({ method = 'GET', url = '', query = {}, headers = {}, options = {} }) => {
		try {
			let queryUrl = `${BASE_API_URL}${BASE_API_PATH}/api/${url}`;

			if (typeof window !== 'undefined') queryUrl = `${BASE_API_PATH}/api/${url}`;

			// Check if we are passing any arguments and parse them if so
			if (Object.keys(query).length) {
				queryUrl += `?${new URLSearchParams(query)}`;
			}

			const response = await fetch(queryUrl, {
				method,
				credentials: typeof window === 'undefined' ? 'omit' : 'include',
				headers: {
					'Content-Type': 'application/json',
					...headers
				},
				...options
			});

			if (!response.ok) {
				const error = await response.json();
				return {
					error: error.message,
					status: response.status
				};
			}

			return {
				data: response
			};
		} catch (error) {
			const err = error as Error;
			return {
				error: err.message
			};
		}
	},
	get: async ({ url = '', query = {}, headers = {}, options = {} }) => {
		try {
			let queryUrl = `${BASE_API_URL}${BASE_API_PATH}/api/${url}`;

			if (typeof window !== 'undefined') queryUrl = `${BASE_API_PATH}/api/${url}`;

			// Check if we are passing any arguments and parse them if so
			if (Object.keys(query).length) {
				queryUrl += `?${new URLSearchParams(query)}`;
			}

			console.log(queryUrl);
			const response = await fetch(queryUrl, {
				method: 'GET',
				credentials: typeof window === 'undefined' ? 'omit' : 'include',
				headers: {
					'Content-Type': 'application/json',
					...headers
				},
				...options
			});

			if (!response.ok) {
				const error = await response.json();
				return {
					error: error.message,
					status: response.status
				};
			}

			return {
				data: await response.json()
			};
		} catch (error) {
			const err = error as Error;
			return {
				error: err.message
			};
		}
	},
	post: async ({ url = '', body = {}, headers = {}, options = {} }) => {
		try {
			let queryUrl = `${BASE_API_URL}${BASE_API_PATH}/api/${url}`;

			if (typeof window !== 'undefined') queryUrl = `${BASE_API_PATH}/api/${url}`;

			const response = await fetch(queryUrl, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					...headers
				},
				...options,
				body: JSON.stringify(body)
			});

			if (!response.ok) {
				const error = await response.json();
				return {
					error: error.message,
					status: response.status
				};
			}

			return {
				data: await response.json()
			};
		} catch (error) {
			const err = error as Error;
			return {
				error: err.message
			};
		}
	},
	delete: async ({ url = '', headers = {}, options = {} }) => {
		try {
			let queryUrl = `${BASE_API_URL}${BASE_API_PATH}/api/${url}`;

			if (typeof window !== 'undefined') queryUrl = `${BASE_API_PATH}/api/${url}`;

			const response = await fetch(queryUrl, {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					...headers
				},
				...options
			});

			if (!response.ok) {
				const error = await response.json();
				return {
					error: error.message,
					status: response.status
				};
			}

			return {
				data: await response.json()
			};
		} catch (error) {
			const err = error as Error;
			return {
				error: err.message
			};
		}
	}
};

export default request;
