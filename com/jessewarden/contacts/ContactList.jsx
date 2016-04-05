import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import ContactsModel from './ContactsModel';
import {Link} from 'react-router';

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
		console.log("ContactList::componentDidMount");
		var me = this;
		// this.sub = ContactsModel.instance.changes
		// .where(function(event)
		// {
		// 	return event.type === 'changed';
		// })
		// .subscribe(function(event)
		// {
		// 	me.setState({contacts: event.newValue});
		// });
		// console.log("sub:", this.sub);
		ContactsModel.instance.getContacts()
		.then(function(contacts)
		{
			me.setState({contacts: contacts});
		});
	}

	componentWillUnmount()
	{
		// console.log("ContactList::componentWillUnmount");
		// ContactsModel.instance.changes.unsubscribe();
	}

	render()
	{
		console.log("render, contacts:", this.state.contacts);
		if(this.state.contacts.length > 0)
		{
			var nodes = this.state.contacts.map(function(contact)
			{
				var link = "view/" + contact.id;
				return (
					<div className="list-group-item" key={contact.id}>
						<Link to={link}>{contact.firstName}</Link>
					</div>
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