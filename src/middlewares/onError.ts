import { NextFunction, Request, Response } from 'express';

export default function onError(
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (error instanceof Error) {
		return res.status(400).send(
			JSON.stringify({
				error: {
					message: error.message,
					stack: error.stack,
				},
			})
		);
	}
	return res
		.send(500)
		.send(JSON.stringify({ error: 'Internal Server Error' }));
}
