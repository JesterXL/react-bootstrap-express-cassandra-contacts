import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, hashHistory} from 'react-router';
import ContactList from './ContactList';
import ContactView from './ContactView';
import EditContactView from './EditContactView';

class ContactRoutes extends React.Component
{

	render()
	{
		return (
			<Router history={hashHistory}>
				<Route path="/" component={ContactList}></Route>
				<Route path="/view/:id" component={ContactView}></Route>
				<Route path="/edit/:id" component={EditContactView}></Route>
			</Router>
		);
	}
}

export default ContactRoutes
