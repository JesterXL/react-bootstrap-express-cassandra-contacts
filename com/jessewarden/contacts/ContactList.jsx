import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import ContactsModel from './models/ContactsModel';
import {Link, hashHistory} from 'react-router';

class ContactList extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			contacts: []
		};

	}

	componentDidMount()
	{
		var me = this;
		ContactsModel.instance.getContacts()
		.then(function(contacts)
		{
			me.setState({contacts: contacts});
		});
	}

	render()
	{
		console.log("render, contacts:", this.state.contacts);
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