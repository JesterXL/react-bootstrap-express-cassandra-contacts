import React from 'react';
import ReactDOM from 'react-dom';

class PhoneForm extends React.Component
{
	// found here http://jsfiddle.net/kaleb/Dm4Jv/
	formatPhone(obj)
	{
		console.log("formatPhone, obj:", obj);
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
		var contact = this.props.contact;
		if(typeof contact === 'undefined')
		{
			return(<div>No contact.</div>);
		}

		contact.homeNumber = this.formatPhone(contact.homeNumber);

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