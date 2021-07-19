import IBookData from '../interfaces/IBookData';

export default {
	validDate(release: string) {
		const date = new Date(release);

		if (date.toDateString() == 'Invalid Date') {
			throw new Error('Data invalida. Tente o formato "DD/MM/YYYY"');
		}
		return date;
	},
	formatDateinput(release: string) {
		const [dia, mes, ano] = release.split('/');

		const format = `${mes}/${dia}/${ano}`;

		return format;
	},
	formatDateOutput(release: string) {	
		const toDate = new Date(release);
		let dia = toDate.getDate();
		let mes = toDate.getMonth();
		let ano = toDate.getFullYear();
		const novoDia = String(dia).length < 2 ? `0${dia}` : `${dia}`;
		const novoMes = String(mes).length < 2 ? `0${mes}` : `${mes}`;
		const format = `${novoDia}/${novoMes}/${ano}`;
		return format
	},
};
