import React from 'react';
import ReactDOM from 'react-dom';
import ContactsModel from './ContactsModel';

class ContactView extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			editMode: false
		};
	}

	componentDidMount()
	{
		var contactID = this.props.params.id;
		this.setState({contactID: contactID});
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
			var contact = ContactsModel.instance.getContactByID(this.state.contactID);
			console.log("contact found:", contact);
			var imageStyles = {
				width: '4em',
				height: '4em'
			};
			contact.homeNumber = this.formatPhone(contact.homeNumber);

			var margins = {
				marginTop: "1em"
			};

			return (
				<div className="row" style={margins}>
					<div className="col-xs-1"></div>
					<div className="col-xs-10">
						<div className="media">
							<div className="media-left">
								<a href="#">
									<img className="media-object img-circle" src="" alt=""
										style={imageStyles}></img>
								</a>
							</div>
							<div className="media-body">
								<h4 className="media-heading">{contact.firstName} {contact.lastName}</h4>
								<p>{contact.company}</p>
							</div>
						</div>
					</div>
					<div className="col-xs-1"></div>
					<div className="col-xs-12">
						<p>&nbsp;</p>
					</div>
					<div className="col-xs-1"></div>
					<div className="col-xs-10">
						<form class="form-inline">
							<div className="form-group">
							    <label for="phoneNumber">home</label>
							    <div className="input-group">
							      <input type="tel" className="form-control" 
									id="phoneNumber" 
									placeholder="home number"
									disabled
									defaultValue={contact.homeNumber}></input>
							      <div className="input-group-addon glyphicon glyphicon-earphone"></div>
							    </div>
							  </div>

						</form>
					</div>
					<div className="col-xs-1"></div>
				</div>
			);
		}
	}
}

export default ContactView