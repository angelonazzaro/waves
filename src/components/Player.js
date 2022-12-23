import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';

function Player() {
	return (
		<div>
			<h1>LOL2</h1>
			<FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
			<FontAwesomeIcon className="play" size="2x" icon={faPlay} />
			<FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
		</div>
	);
}

export default Player;
