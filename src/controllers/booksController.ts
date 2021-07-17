import { Request, Response } from 'express';
import booksModel from '../model/booksModel';
import utils from '../utils/utils';

export default {
	async getAll(req: Request, res: Response) {
		const allBooks = await booksModel.getAll();

		return res.status(200).send(JSON.stringify(allBooks));
	},
	async get(req: Request, res: Response) {
		const { id } = req.params;

		const book = await booksModel.get(Number(id));

		res.status(200).send(JSON.stringify(book));
	},
	async update(req: Request, res: Response) {
		const { titulo, editora, imagem, autor, release } = req.body;
		const { id } = req.params;

		if (!titulo || !editora || !imagem || !autor || !release) {
			throw new Error('Campos invalidos, por favor tente novamente.');
		}

		const formatRelease = utils.formatDate(release);

		const validDate = utils.validDate(formatRelease);

		console.log({ ...req.body, release: validDate });

		const newBooks = await booksModel.update(
			{ ...req.body, release: validDate },
			Number(id)
		);

		return res.status(201).send(newBooks);
	},
	async create(req: Request, res: Response) {
		const { titulo, editora, imagem, autor, release } = req.body;

		if (!titulo || !editora || !imagem || !autor || !release) {
			throw new Error('Campos invalidos, por favor tente novamente.');
		}

		const formatRelease = utils.formatDate(release);

		const validDate = utils.validDate(formatRelease);

		console.log({ ...req.body, release: validDate });

		const newBook = await booksModel.create({
			...req.body,
			release: validDate,
		});

		return res.status(201).send(JSON.stringify(newBook));
	},
	async delete(req: Request, res: Response) {
		const { id } = req.params;

		const newBooks = await booksModel.delete(Number(id));

		res.status(200).send(JSON.stringify(newBooks));
	},
};
