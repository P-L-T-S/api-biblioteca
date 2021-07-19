import config from '../db/config';
import Config from '../db/config';
import IBookData from '../interfaces/IBookData';

export default {
	async getAll() {
		const db = await Config();

		// get é usado para pegar uma unica informação
		const allBooks = await db.all(`SELECT * FROM books`);

		await db.close();

		return allBooks;
	},
	async get(id: number) {
		const db = await Config();

		const book = await db.get(`SELECT * FROM books WHERE id = ${id}`);

		db.close();

		return book;
	},
	async update(
		{ titulo, editora, imagem, autor, release }: IBookData,
		id: number
	) {
		const db = await Config();

		try {
			await db.run(`UPDATE books SET
				titulo = "${titulo}",
				editora = "${editora}",
				imagem = "${imagem}",
				autor = "${autor}",
				release = "${release}"
				WHERE id = ${id}
			`);
		} catch (error) {
			throw new Error(error);
		}

		const newBooks = await this.getAll();

		await db.close();

		return newBooks;
	},
	async create({ titulo, editora, imagem, autor, release }: IBookData) {
		const db = await config();

		try {
			await db.run(`INSERT INTO books (
				titulo,
				editora,
				imagem,
				autor,
				release
			) VALUES (
				"${titulo}",
				"${editora}",
				"${imagem}",
				"${autor}",
				"${release}"
			)`);
		} catch (error) {
			throw new Error(error);
		}

		const newBoks = await this.getAll();

		await db.close();

		return newBoks;
	},
	async delete(id: number) {
		const db = await config();

		await db.run(`DELETE FROM books WHERE id = ${id}`);

		const newBoks = await this.getAll();

		await db.close();

		return newBoks;
	},
};
