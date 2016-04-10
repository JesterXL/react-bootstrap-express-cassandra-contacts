import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import ContactsModel from './models/ContactsModel';
import {Link, hashHistory} from 'react-router';
import EventBus from './EventBus';

class ContactList extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			contacts: []
		};
	}

	search(query)
	{
		var me = this;
		ContactsModel.instance.search(query)
		.then(function(contacts)
		{
			console.log("SearchResults::search contacts:", contacts);
			me.setState({contacts: contacts});
		});
	}

	componentDidMount()
	{
		var me = this;
		var query = me.props.params.query;
		me.search(query);

		EventBus.pubsub
		.where(event => event.type === 'search')
		.subscribe((event)=>
		{
			me.search(event.searchValue);
		});
	}

	render()
	{
		console.log("SearchResults::render, contacts:", this.state.contacts);
		var me = this;
		if(this.state.contacts.length > 0)
		{
			var nodes = this.state.contacts.map(function(contact)
			{
				var link = "view/" + contact.id;
				return (
					<Link className="list-group-item" key={contact.id} to={link}>{contact.firstName}</Link>
				);
			});

			return (
				<div className="list-group">
					{nodes}
				</div>
			);
		}
		else if(this.state.contacts.length === 0)
		{
			return (
				<div>No contacts found for '{this.props.params.query}'</div>
			);
		}
		else
		{
			return (
				<div>Loading...</div>
			);
		}
	}
}

ContactList.defaultProps = {
	contacts: []
};

export default ContactList