const transformMontu = month => {
	switch (month) {
		case 0:
			return 'January'
		case 1:
			return 'February'
		case 2:
			return 'March '
		case 3:
			return 'April'
		case 4:
			return 'May'
		case 5:
			return 'June'
		case 6:
			return 'July '
		case 7:
			return 'August'
		case 8:
			return 'September'
		case 9:
			return 'October'
		case 10:
			return 'November'
		case 11:
			return 'December'

		default:
			break
	}
}
const transformDate = dateComment => {
	const year = new Date(dateComment).getFullYear()
	const month = new Date(dateComment).getMonth()
	const day = new Date(dateComment).getDay()
	const hour = new Date(dateComment).getHours()
	const minute = new Date(dateComment).getMinutes()

	if (Math.abs(new Date() - new Date(dateComment)) <= 60000) {
		return '1 минуту назад'
	} else if (Math.abs(new Date() - new Date(dateComment)) <= 300000) {
		return '5 минут назад'
	} else if (Math.abs(new Date() - new Date(dateComment)) <= 600000) {
		return '10 минут назад'
	} else if (Math.abs(new Date() - new Date(dateComment)) <= 1800000) {
		return '30 минут назад'
	} else if (
		Math.abs(new Date() - new Date(dateComment)) >= 1800000 &&
		Math.abs(new Date() - new Date(dateComment)) <= 86400000
	) {
		return `${hour}${minute <= 9 ? ':0' : ':'}${minute} `
	} else if (
		Math.abs(new Date() - new Date(dateComment)) >= 86400000 &&
		Math.abs(new Date() - new Date(dateComment)) <= 31536000000
	) {
		return `${day}-${transformMontu(month)}`
	} else if (Math.abs(new Date() - new Date(dateComment)) > 31536000000) {
		return `${day}-${transformMontu(month)}-${year}`
	}
}

export default transformDate
