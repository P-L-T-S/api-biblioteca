import { Request, Response } from 'express';
import booksModel from '../model/booksModel';
import utils from '../utils/utils';

export default {
	async getAll(req: Request, res: Response) {
		const allBooks = await booksModel.getAll();

		const formatedOutputBooks = allBooks.map((book) => {
			const release = utils.formatDateOutput(book.release);
			return {
				...book,
				release,
			};
		});

		return res.status(200).send(JSON.stringify(formatedOutputBooks));
	},
	async getById(req: Request, res: Response) {
		const { id } = req.params;

		const book = await booksModel.get(Number(id));

		if (book == null || undefined) {
			return res.status(404).send(
				JSON.stringify({
					message: 'O livro não existe ou foi excluido.',
				})
			);
		}

		const formatedOutputBook = {
			...book,
			release: utils.formatDateOutput(book.release),
		};

		res.status(200).send(JSON.stringify(formatedOutputBook));
	},
	async update(req: Request, res: Response) {
		const { titulo, editora, imagem, autor, release } = req.body;
		const { id } = req.params;

		if (!titulo || !editora || !imagem || !autor || !release) {
			throw new Error('Campos invalidos, por favor tente novamente.');
		}

		const formatReleaseInput = utils.formatDateinput(release);

		const validDate = utils.validDate(formatReleaseInput);

		const newBooks = await booksModel.update(
			{ ...req.body, release: validDate },
			Number(id)
		);

		const formatedOutputBooks = newBooks.map((book) => {
			const release = utils.formatDateOutput(book.release);
			return {
				...book,
				release,
			};
		});

		return res.status(201).send(formatedOutputBooks);
	},
	async create(req: Request, res: Response) {
		const { titulo, editora, imagem, autor, release } = req.body;

		if (!titulo || !editora || !imagem || !autor || !release) {
			throw new Error('Campos invalidos, por favor tente novamente.');
		}

		const formatReleaseInput = utils.formatDateinput(release);

		const validDate = utils.validDate(formatReleaseInput);

		const newBooks = await booksModel.create({
			...req.body,
			release: validDate,
		});

		const formatedOutputBooks = newBooks.map((book) => {
			const release = utils.formatDateOutput(book.release);
			return {
				...book,
				release,
			};
		});

		return res.status(201).send(JSON.stringify(formatedOutputBooks));
	},
	async delete(req: Request, res: Response) {
		const { id } = req.params;

		const newBooks = await booksModel.delete(Number(id));

		const formatedOutputBooks = newBooks.map((book) => {
			const release = utils.formatDateOutput(book.release);
			return {
				...book,
				release,
			};
		});

		res.status(200).send(JSON.stringify(formatedOutputBooks));
	},
};
