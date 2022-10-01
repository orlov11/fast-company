import React from 'react'
import PropTypes from 'prop-types'

const ListGroup = ({
	items,
	valueProperty,
	contentProperty,
	onProfessionSelect,
	selectedItem
}) => {
	return (
		<ul className="list-group">
			{Object.keys(items).map(item => (
				<li
					key={items[item][valueProperty]}
					className={
						'list-group-item' + (selectedItem === items[item] ? ' active' : '')
					}
					onClick={() => onProfessionSelect(items[item])}
				>
					{items[item][contentProperty]}
				</li>
			))}
		</ul>
	)
}
ListGroup.defaultProps = {
	valueProperty: '_id',
	contentProperty: 'name'
}

ListGroup.propTypes = {
	items: PropTypes.object.isRequired,
	valueProperty: PropTypes.string.isRequired,
	contentProperty: PropTypes.string.isRequired,
	onProfessionSelect: PropTypes.func,
	selectedItem: PropTypes.object
}

export default ListGroup
