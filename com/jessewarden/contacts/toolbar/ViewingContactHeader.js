import React from 'react';
import ReactDOM from 'react-dom';
import EventBus from '../EventBus';
import StyleConstants from '../StyleConstants';
import {Router, Route, Link, hashHistory} from 'react-router';

class ViewingContactHeader extends React.Component
{
	render()
	{
		var editLink = '/edit/' + this.props.params.id;
		return (
			<header className="row" style={StyleConstants.navBar}>
				<div className="col-xs-1"></div>
				<div className="col-xs-3"><h4><Link to='/'>&lt;Contacts</Link></h4></div>
				<div className="col-xs-5"></div>
				<div className="col-xs-2"><h4><Link to={editLink}>Edit</Link></h4></div>
				<div className="col-xs-1"></div>
			</header>
		);
	}
}

export default ViewingContactHeader