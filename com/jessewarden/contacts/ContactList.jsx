import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import GetContactsService from './GetContactsService';
import {Link} from 'react-router';

class ContactList extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			contacts: [{id: 0, name: "Sup"}]
		};

	}

	componentDidMount()
	{
		var me = this;
		new GetContactsService().load()
		.then(function(contacts)
		{
			me.setState({contacts: contacts});
		});
	}

	render()
	{
		console.log("render, contacts:", this.state.contacts);
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
}

ContactList.defaultProps = {
	contacts: [{id: -1, firstName: 'Cow'}]
};

export default ContactList