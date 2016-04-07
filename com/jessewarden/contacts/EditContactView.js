import React from 'react';
import ReactDOM from 'react-dom';
import ContactsModel from './models/ContactsModel';
import classNames from 'classnames';
import EventBus from './EventBus';
import ImageView from './contactClasses/ImageView';
import PhoneForm from './contactClasses/PhoneForm';
import EditImageView from './contactClasses/EditImageView';

class EditContactView extends React.Component
{
	constructor(props)
	{
		super(props);
		this.margins = {
			marginTop: "1em"
		};
	}

	render()
	{
		var btnClass = classNames({
	      'btn-primary': true,
	      'btn-default': false
	    });

		var contact = ContactsModel.instance.getContactByID(this.props.params.id);
		return (
			<div className="row" style={this.margins}>
				<div className="col-xs-1"></div>
				<div className="col-xs-10">
					<EditImageView contact={contact}></EditImageView>
				</div>
			</div>
		);
	}
}

export default EditContactView