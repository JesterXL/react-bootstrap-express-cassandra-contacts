import React from 'react';
import ReactDOM from 'react-dom';
import ContactsModel from './models/ContactsModel';
import classNames from 'classnames';
import ImageView from './contactClasses/ImageView';
import PhoneForm from './contactClasses/PhoneForm';
import _ from 'lodash';

class ContactView extends React.Component
{
	constructor(props)
	{
		super(props);
		this.margins = {
			marginTop: "1em"
		};
	}

	componentDidMount()
	{
		console.log("ContactView::componentDidMount, props.params.id:", this.props.params.id);
		var contactID = this.props.params.id;
		this.setState({contactID: contactID});
	}

	render()
	{
		console.log("ContactView::render, this.state:", this.state);
		if(_.isNil(this.state) || _.isNil(this.state.contactID))
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

			console.log("this.state:", this.state);
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
	}
}

export default ContactView