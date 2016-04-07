import React from 'react';
import ReactDOM from 'react-dom';
import StyleConstants from '../StyleConstants';

class MainHeader extends React.Component
{
	render()
	{
		return (
			<header className="row" style={StyleConstants.navBar}>
				<div className="col-xs-4"></div>
				<div className="col-xs-4"><h3>Contacts</h3></div>
				<div className="col-xs-2"></div>
				<div className="col-xs-2">
					<div className="row">
						<div className="col-xs-12">&nbsp;</div>
					</div>
					<div className="row">
						<div className="col-xs-12">
							<img className='img-responsive' 
								src='ic_person_add_black_512dp_2x.png'
								style={StyleConstants.addPersonIcon}></img>
						</div>
					</div>
					
				</div>
			</header>
		)
	}
}

export default MainHeader