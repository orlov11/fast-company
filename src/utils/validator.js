export function validator(data, config) {
	const errors = {}
	let statusValidate
	function validate(validateMethod, data, config) {
		switch (validateMethod) {
			case 'isRequired':
				if (typeof data === 'boolean') {
					statusValidate = !data
				} else {
					statusValidate = data.trim() === ''
				}
				break

			case 'isEmail':
				statusValidate = !/^\S+@\S+\.\S+$/g.test(data)
				break
			case 'isPassword':
				statusValidate = !/[A-X]+/g.test(data)
				break
			case 'isFigure':
				statusValidate = !/\d/g.test(data)
				break
			case 'isLength':
				statusValidate = data.length < config.value
				break
			default:
				break
		}
		if (statusValidate) return config.messege
	}
	for (const feildName in data) {
		for (const validateMethod in config[feildName]) {
			const error = validate(
				validateMethod,
				data[feildName],
				config[feildName][validateMethod]
			)
			if (error && !errors[feildName]) {
				errors[feildName] = error
			}
		}
	}
	return errors
}
