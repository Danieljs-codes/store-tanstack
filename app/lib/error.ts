import { H3Error, createError, sendError } from "vinxi/http";

export class HttpError extends H3Error {
	constructor(
		input: Partial<H3Error> & { status?: number; statusText?: string },
	) {
		const error = createError(input);
		super(error.message);

		sendError(error);
	}
}

export const apiError = ({
	statusCode,
	statusMessage,
	data,
}: {
	statusCode?: number;
	statusMessage?: string;
	data?: any;
}) => {
	const error = createError({
		statusCode,
		statusMessage,
		data,
	});

	sendError(error);
};
