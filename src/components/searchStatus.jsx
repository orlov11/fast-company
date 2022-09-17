import React from 'react'

const SearhStatus = ({ length }) => {
	const randerPhrase = () => {
		if (length < 10 && [2, 3, 4].indexOf(length % 10) !== -1) {
			return (
				<div className=" text-bg-primary w-25  p-2 m-2">
					{length} человека тусанет с тобой сеодня
				</div>
			)
		}
		if (length > 20 && [2, 3, 4].indexOf(length % 10) !== -1) {
			return (
				<div className=" text-bg-primary w-25  p-2 m-2">
					{length} человека тусанет с тобой сеодня
				</div>
			)
		}
		return (
			<div className=" text-bg-primary w-25 p-2 m-2">
				{length} человек тусанет с тобой сеодня
			</div>
		)
	}
	return length === 0 ? (
		<div className=" text-bg-danger w-25  p-2 m-2">
			Никто не тусанет с тобой сегодня
		</div>
	) : (
		randerPhrase()
	)
}

export default SearhStatus
