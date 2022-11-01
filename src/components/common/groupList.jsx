import React from 'react'
import PropTypes from 'prop-types'
import { isArray } from 'lodash'

const ListGroup = ({ items, valueProperty, contentProperty, onProfessionSelect, selectedItem }) => {
	const renderFilter = () => {
		if (isArray(items)) {
			return items.map(arr => (
				<li
					key={arr[valueProperty]}
					className={'list-group-item' + (selectedItem === arr ? ' active' : '')}
					onClick={() => onProfessionSelect(arr)}
				>
					{arr[contentProperty]}
				</li>
			))
		} else {
			Object.keys(items).map(item => (
				<li
					key={items[item][valueProperty]}
					className={'list-group-item' + (selectedItem === items[item] ? ' active' : '')}
					onClick={() => onProfessionSelect(items[item])}
				>
					{items[item][contentProperty]}
				</li>
			))
		}
	}
	return <ul className="list-group">{renderFilter()}</ul>
}
ListGroup.defaultProps = {
	valueProperty: '_id',
	contentProperty: 'name'
}

ListGroup.propTypes = {
	items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	valueProperty: PropTypes.string.isRequired,
	contentProperty: PropTypes.string.isRequired,
	onProfessionSelect: PropTypes.func,
	selectedItem: PropTypes.object
}

export default ListGroup
