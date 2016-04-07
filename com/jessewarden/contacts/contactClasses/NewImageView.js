import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import EventBus from '../EventBus';
import ContactsModel from '../models/ContactsModel';

class NewImageView extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			contact: ContactsModel.instance.getNewContact(),
			dirty: false
		};
	}

	componentDidMount()
	{
		var me = this;
		EventBus.pubsub
		.where(event => event.type === 'completeNew')
		.subscribe((event)=>
		{
			EventBus.pubsub.onNext({type: 'saveNewContact', contact: me.state.contact});
		});
	}

	render()
	{
		var imageStyles = {
			width: '4em',
			height: '4em'
		};
		var contact = this.state.contact;
		
		return (
			<div className="row">
				<div className="col-xs-4">
					<img className="media-object img-circle" 
							src="" 
							alt=""
							style={imageStyles}></img>
				</div>
				<div className="col-xs-8">
					<form>
						<div className="form-group">
							<input type="text" className="form-control" id="firstNameInput" placeholder="First name"
								value={contact.firstName}
								onChange={this.onSetFirstName.bind(this)}></input>
						</div>
						<div className="form-group">
							<input type="text" className="form-control" id="lastNameInput" placeholder="Last name"
								defaultValue={contact.lastName}
								onChange={this.onSetLastName.bind(this)}></input>
						</div>
						<div className="form-group">
							<input type="text" className="form-control" id="companyInput" placeholder="Company"
								defaultValue={contact.company}
								onChange={this.onSetCompany.bind(this)}></input>
						</div>
						<div className="form-group">
							<input type="numeric" className="form-control" id="homeNumberInput" placeholder="Home Phone"
								defaultValue={contact.homeNumber}
								onChange={this.onSetHomeNumber.bind(this)}></input>
						</div>
					</form>
				</div>
			</div>
		);
	}

	onSetFirstName(event)
	{
		var contact = this.state.contact;
		contact.firstName = event.target.value;
		this.setState({contact: contact, dirty: true});
		EventBus.pubsub.onNext({type: 'editDirty'});
	}

	onSetLastName(event)
	{
		var contact = this.state.contact;
		contact.lastName = event.target.value;
		this.setState({contact: contact, dirty: true});
		EventBus.pubsub.onNext({type: 'editDirty'});
	}

	onSetCompany(event)
	{
		var contact = this.state.contact;
		contact.company = event.target.value;
		if(contact.company && contact.company.toLowerCase() === 'argo')
		{
			console.log("%cW"+"%ci"+"%cn"+"%cn"+"%ci"+"%cn"+"%cg"+"%c!"+"%c!"+"%c1"+"%c1"+"%cone"+"%cone",
						"color:red","color:orange","color:yellow","color:green","color:purple","color:blue","color:red","color:orange","color:yellow","color:green","color:purple","color:blue","color:red");
		}
		this.setState({contact: contact, dirty: true});
		EventBus.pubsub.onNext({type: 'editDirty'});
	}

	onSetHomeNumber(event)
	{
		var contact = this.state.contact;
		contact.homeNumber = event.target.value;
		this.setState({contact: contact, dirty: true});
		EventBus.pubsub.onNext({type: 'editDirty'});
	}
}

NewImageView.propTypes = {
	firstName: React.PropTypes.string,
	lastName: React.PropTypes.string,
	company: React.PropTypes.string,
	homeNumber: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
};

export default NewImageView