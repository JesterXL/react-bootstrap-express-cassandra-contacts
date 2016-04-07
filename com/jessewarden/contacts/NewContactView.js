import React from 'react';
import ReactDOM from 'react-dom';
import ContactsModel from './models/ContactsModel';
import classNames from 'classnames';
import EventBus from './EventBus';
import ImageView from './contactClasses/ImageView';
import PhoneForm from './contactClasses/PhoneForm';
import NewImageView from './contactClasses/NewImageView';

class NewContactView extends React.Component
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

		return (
			<div className="row" style={this.margins}>
				<div className="col-xs-1"></div>
				<div className="col-xs-10">
					<NewImageView></NewImageView>
				</div>
			</div>
		);
	}
}

export default NewContactView