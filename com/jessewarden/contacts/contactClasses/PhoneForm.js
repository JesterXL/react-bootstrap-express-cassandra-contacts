import React from 'react';
import ReactDOM from 'react-dom';

class PhoneForm extends React.Component
{
	render()
	{
		var contact = this.props.contact;
		if(typeof contact === 'undefined')
		{
			return(<div>No contact.</div>);
		}

		return (
			<form className="form-inline">
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
		);
	}
}

export default PhoneForm