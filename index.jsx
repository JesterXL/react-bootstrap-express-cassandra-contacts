require("./node_modules/bootstrap/dist/css/bootstrap.min.css")
require("./node_modules/bootstrap/dist/css/bootstrap-theme.min.css")
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, hashHistory} from 'react-router';
import ContactsModel from './com/jessewarden/contacts/models/ContactsModel';
import EventBus from './com/jessewarden/contacts/EventBus';
import _ from 'lodash';
import MainHeader from './com/jessewarden/contacts/toolbar/MainHeader';
import ViewingContactHeader from './com/jessewarden/contacts/toolbar/ViewingContactHeader';
import EditContactHeader from './com/jessewarden/contacts/toolbar/EditContactHeader';
import NewContactHeader from './com/jessewarden/contacts/toolbar/NewContactHeader';
import ContactList from './com/jessewarden/contacts/ContactList';
import ContactView from './com/jessewarden/contacts/ContactView';
import EditContactView from './com/jessewarden/contacts/EditContactView';
import NewContactView from './com/jessewarden/contacts/NewContactView';
import SearchResults from './com/jessewarden/contacts/SearchResults';

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

		EventBus.pubsub
		.where(event => event.type === 'saveNewContact')
		.subscribe((event)=>
		{
			ContactsModel.instance.saveNewContact(event.contact)
			.then(function(savedContact)
			{
				hashHistory.push('/view/' + savedContact.id);
			});
		});

		EventBus.pubsub
		.where(event => event.type === 'search')
		.subscribe((event)=>
		{
			hashHistory.push('/search/' + event.searchValue);
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
					<Route path="/search/:query" component={MainHeader}></Route>
					<Route path="/view/:id" component={ViewingContactHeader}></Route>
					<Route path="/edit/:id" component={EditContactHeader}></Route>
					<Route path="/new" component={NewContactHeader}></Route>
				</Router>
				<section className="row">
					<Router history={hashHistory}>
						<Route path="/" component={ContactList}></Route>
						<Route path="/search/:query" component={SearchResults}></Route>
						<Route path="/view/:id" component={ContactView}></Route>
						<Route path="/edit/:id" component={EditContactView}></Route>
						<Route path="/new" component={NewContactView}></Route>
					</Router>
				</section>
			</div>
		);
	}
}

ReactDOM.render(<App/>, document.querySelector("#myApp"));
