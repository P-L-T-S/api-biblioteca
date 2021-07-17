export default {
	validDate(release: string) {
		const date = new Date(release);

		if (date.toDateString() == 'Invalid Date') {
			throw new Error('Data invalida. Tente o formato "DD/MM/YYYY"');
		}
		return date;
	},
	formatDate(release: string) {
		const [dia, mes, ano] = release.split('/');

		const format = `${mes}/${dia}/${ano}`;

		return format;
	},
};
