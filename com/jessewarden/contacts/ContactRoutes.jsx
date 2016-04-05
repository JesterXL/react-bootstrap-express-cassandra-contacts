import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, hashHistory} from 'react-router';
import ContactList from './ContactList';
import ContactView from './ContactView';

const ContactsHome = ()=> <div><h1>Contacts</h1></div>;

class ContactRoutes extends React.Component
{

	render()
	{
		return (
			<Router history={hashHistory}>
				<Route path="/" component={ContactList}></Route>
				<Route path="/view/:id" component={ContactView}></Route>
			</Router>
		);
	}
}

export default ContactRoutes
