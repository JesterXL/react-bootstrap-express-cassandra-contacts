import React from 'react';
import ReactDOM from 'react-dom';
import ContactsModel from './ContactsModel';
import classNames from 'classnames';
import EventBus from './EventBus';
import ImageView from './contactClasses/ImageView';
import PhoneForm from './contactClasses/PhoneForm';
import EditImageView from './contactClasses/EditImageView';

class ContactView extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			mode: 'view' // state machine: view|edit|new
		};
		this.margins = {
			marginTop: "1em"
		};
	}

	componentDidMount()
	{
		var contactID = this.props.params.id;
		this.setState({contactID: contactID});
		EventBus.pubsub
		.subscribe((event)=>
		{
			console.log("ContactView::componentDidMount, subscribe:", event);
			switch(event.type)
			{
				case 'edit': this.setState({mode: 'edit'}); break;
				case 'cancelEdit': this.setState({mode: 'view'}); break;
				case 'contactSaved':
					// console.log("contactSaved, switching to view mode.");
					this.setState({mode: 'view'}); break;
			}
		});
	}

	render()
	{
		console.log("ContactView::render, mode:", this.state.mode);
		if(typeof this.state.contactID === 'undefined')
		{
			return (
				<div>Loading...</div>
			);
		}
		else
		{
			switch(this.state.mode)
			{
				case 'view': return this.lessQQMoarPewPew();
				case 'edit': return this.editView();
				case 'new': return this.newView();
			}
		}
	}

	lessQQMoarPewPew()
	{
		var btnClass = classNames({
	      'btn-primary': true,
	      'btn-default': false
	    });

		var contact = ContactsModel.instance.getContactByID(this.state.contactID);
		// console.log("contact found:", contact);

		return (
			<div className="row" style={this.margins}>
				<div className="col-xs-1"></div>
				<div className="col-xs-10">
					<ImageView contact={contact}></ImageView>
				</div>
				<div className="col-xs-1"></div>
				<div className="col-xs-12">
					<p>&nbsp;</p>
				</div>
				<div className="col-xs-1"></div>
				<div className="col-xs-10">
					<PhoneForm contact={contact}></PhoneForm>
				</div>
				<div className="col-xs-1"></div>
			</div>
		);
	}

	editView()
	{
		var contact = ContactsModel.instance.getContactByID(this.state.contactID);
		return (
			<div className="row" style={this.margins}>
				<div className="col-xs-1"></div>
				<div className="col-xs-10">
					<EditImageView contact={contact}></EditImageView>
				</div>
			</div>
		);
	}

	newView()
	{
		return (<div>New</div>);
	}
}

export default ContactView