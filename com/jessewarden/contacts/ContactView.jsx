import React from 'react';
import ReactDOM from 'react-dom';
import ContactsModel from './ContactsModel';
import classNames from 'classnames';
import EventBus from './EventBus';
import ImageView from './contactClasses/ImageView';
import PhoneForm from './contactClasses/PhoneForm';

class ContactView extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
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
		});
	}

	// found here http://jsfiddle.net/kaleb/Dm4Jv/
	formatPhone(obj)
	{
		var numbers = obj.replace(/\D/g, ''),
		char = {0:'(',3:') ',6:' - '};
		obj = '';
		for (var i = 0; i < numbers.length; i++) {
			obj += (char[i]||'') + numbers[i];
		}
		return obj;
	}

	render()
	{
		if(typeof this.state.contactID === 'undefined')
		{
			return (
				<div>Loading...</div>
			);
		}
		else
		{
			var btnClass = classNames({
		      'btn-primary': true,
		      'btn-default': false
		    });

			var contact = ContactsModel.instance.getContactByID(this.state.contactID);
			// console.log("contact found:", contact);
			
			contact.homeNumber = this.formatPhone(contact.homeNumber);

			var margins = {
				marginTop: "1em"
			};

			return (
				<div className="row" style={margins}>
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
	}
}

export default ContactView