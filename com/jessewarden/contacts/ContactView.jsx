import React from 'react';
import ReactDOM from 'react-dom';

class ContactView extends React.Component
{
	componentDidMount()
	{
		var contactID = this.props.params;
		
	}

	render()
	{
		return (
			<div className="row">
				<div className="col-xs-4">a</div>
				<div className="col-xs-4">b</div>
				<div className="col-xs-4">c</div>
			</div>
		);
	}
}

export default ContactView