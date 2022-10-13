export const formatJSONResponse = (response: Record<string, unknown>) => {
	return {
		statusCode: 200,
		body: JSON.stringify(response),
	};
};

export const internalServerError = (response: Record<string, unknown>) => {
	return {
		statusCode: 500,
		body: JSON.stringify(response),
	};
};

export const parseBody = (body: string | null) => {
	return body && typeof body === 'string' ? JSON.parse(body) : body;
};
