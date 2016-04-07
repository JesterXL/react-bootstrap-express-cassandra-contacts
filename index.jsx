require("./node_modules/bootstrap/dist/css/bootstrap.min.css")
require("./node_modules/bootstrap/dist/css/bootstrap-theme.min.css")
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, hashHistory} from 'react-router';
import ContactRoutes from './com/jessewarden/contacts/ContactRoutes';
import ContactsModel from './com/jessewarden/contacts/models/ContactsModel';
import EventBus from './com/jessewarden/contacts/EventBus';
import _ from 'lodash';
import MainHeader from './com/jessewarden/contacts/toolbar/MainHeader';
import ViewingContactHeader from './com/jessewarden/contacts/toolbar/ViewingContactHeader';
import EditContactHeader from './com/jessewarden/contacts/toolbar/EditContactHeader';

export class App extends React.Component
{

	constructor(props)
	{
		super(props);
		this.state = {
			loading: true
		};
	}

	componentDidMount()
	{
		var me = this;
		ContactsModel.instance.getContacts()
		.then(function(contacts)
		{
			me.setState({loading: false});
		});
		EventBus.pubsub
		.where(event => event.type === 'saveContact')
		.subscribe((event)=>
		{
			ContactsModel.instance.saveContact(event.contact)
			.then(function(savedContact)
			{
				hashHistory.push('/view/' + savedContact.id);
			});
		});
	}

	render()
	{
		if(this.state.loading)
		{
			return (
				<div className="container-fluid">
					<div className="col-xs-2"></div>
					<div className="col-xs-8">Loading...</div>
					<div className="col-xs-2"></div>
				</div>
			);
		}
		return (
			<div className="container-fluid">
				<Router history={hashHistory}>
					<Route path="/" component={MainHeader}></Route>
					<Route path="/view/:id" component={ViewingContactHeader}></Route>
					<Route path="/edit/:id" component={EditContactHeader}></Route>
				</Router>
				<section className="row">
					<ContactRoutes/>
				</section>
			</div>
		);
	}
}

ReactDOM.render(<App/>, document.querySelector("#myApp"));
