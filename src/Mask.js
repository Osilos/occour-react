import PropTypes from 'prop-types'
import React from 'react'

import './Mask.css'

const Mask = ({word, letters}) => (
	<div className="mask">
			{word.map((letter, id) => (
				<span key={id} className={letter == "_" ? "hidden" : "visible"}>{letter}</span>
				
			))}
	</div>
);

Mask.propTypes = {
	word : PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Mask