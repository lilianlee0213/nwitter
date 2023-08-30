import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {Link} from 'react-router-dom';

const Navigation = ({userObj}) => {
	return (
		<nav>
			<ul className="nav-links">
				<li>
					<Link to="/" className="nav-link-logo">
						<FontAwesomeIcon icon={faTwitter} color={'#04aaff'} size="2x" />
					</Link>
				</li>
				<li>
					<Link to="/profile" className="nav-link-profile">
						<FontAwesomeIcon icon={faUser} color={'#04AAFF'} size="2x" />
						<span> {userObj.displayName}'s Profile</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
