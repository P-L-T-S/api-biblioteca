import Config from './config';
// init só é executado uma vez no código para criar as tabelas
const initDb = {
	async init() {
		// Inicia a comunicação com o banco de dados
		const db = await Config();

		// exec cria as tabelas SQL
		await db.exec(`CREATE TABLE books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT,
            editora TEXT,
            imagem TEXT,
            autor TEXT,
            release DATE
        )`);

		await db.run(
			`INSERT INTO books (
                titulo,
                editora,
                imagem,
                autor,
                release
            ) VALUES (
                "harry potter",
                "Rocco",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVdUV1MCuXTsUhiyEOcEUylODyhJDBXoAS2w&usqp=CAU",
                "J. K. Rowling",
                "2000-01-01"
            )`
        );

		await db.close();
	},
};

initDb.init()