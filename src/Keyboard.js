import PropTypes from 'prop-types'
import React from 'react'

import './Keyboard.css'

const Keyboard = ({letters, onClick}) => (
	<div className="keyboard">
		{letters.map((letter, id) => (
			<div 
				key={id} 
				onClick={() => {onClick(letter.letter)}} 
				className={letter.use ? "use" : "notuse"}>{letter.letter}
			</div>
		))}
	</div>
)

Keyboard.propTypes = {
	letters : PropTypes.arrayOf(PropTypes.shape({
		letter: PropTypes.string.isRequired,
		use: PropTypes.bool.isRequired
	})).isRequired,
	onClick : PropTypes.func
}

export default Keyboard