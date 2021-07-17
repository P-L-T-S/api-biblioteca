// por algum motivo usar o import estava dando erro e eu não encontrei a solução
const sqlite3 = require('sqlite3');
// open cria conexão com o banco de dados
import { open } from 'sqlite';

// open deve OBRIGATORIAMENTE estar dentro de uma funcao
export default () =>
	open({
		filename: './database.sqlite',
		driver: sqlite3.Database,
	});
