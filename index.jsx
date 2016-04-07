require("./node_modules/bootstrap/dist/css/bootstrap.min.css")
require("./node_modules/bootstrap/dist/css/bootstrap-theme.min.css")
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, hashHistory} from 'react-router';
import ContactRoutes from './com/jessewarden/contacts/ContactRoutes';
import ContactsModel from './com/jessewarden/contacts/ContactsModel';
import EventBus from './com/jessewarden/contacts/EventBus';
import _ from 'lodash';

class StyleConstants
{
	static get navBar()
	{
		return {
			height: '4em',
			borderBottom: 'gray',
			borderBottomStyle: 'solid',
			borderBottomWidth: 'thin'
		};
	}

	static get addPersonIcon()
	{
		return {
			width: '2em',
			height: '2em'
		};
	}
}

class MainHeader extends React.Component
{
	render()
	{
		return (
			<header className="row" style={StyleConstants.navBar}>
				<div className="col-xs-4"></div>
				<div className="col-xs-4"><h3>Contacts</h3></div>
				<div className="col-xs-2"></div>
				<div className="col-xs-2">
					<div className="row">
						<div className="col-xs-12">&nbsp;</div>
					</div>
					<div className="row">
						<div className="col-xs-12">
							<img className='img-responsive' 
								src='ic_person_add_black_512dp_2x.png'
								style={StyleConstants.addPersonIcon}></img>
						</div>
					</div>
					
				</div>
			</header>
		)
	}
}

class DoneButton extends React.Component
{

	render()
	{
		if(this.props.enabled)
		{
			return (
				<h4><a onClick={this.props.onClick}>Done</a></h4>
			);
		}
		else
		{
			var disabledStyles = 
			{
				color: '#666666'
			};
			return (
				<h4 style={disabledStyles}>Done</h4>
			);
		}
	}
}

class ViewingContactHeader extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			editMode: false,
			editDirty: false
		};
	}

	componentDidMount()
	{
		var me = this;
		EventBus.pubsub
		.where(event => event.type === 'editDirty')
		.subscribe((event)=>
		{
			// console.log("ViewingContactHeader::componentDidMount, editDirty event");
			if(me.state.editDirty === false)
			{
				me.setState({editDirty: true});
			}
		});

		EventBus.pubsub
		.where(event => event.type === 'contactSaved')
		.subscribe((event)=>
		{
			me.setState({editMode: false});
		});
	}

	onEdit()
	{
		this.setState({
			editMode: true
		});
		EventBus.pubsub.onNext({type: 'edit'});
	}

	onCancelEdit()
	{
		this.setState({
			editMode: false
		});
		EventBus.pubsub.onNext({type: 'cancelEdit'});
	}

	onCompleteEdit()
	{
		console.log("ViewingContactHeader::onCompleteEdit");
		EventBus.pubsub.onNext({type: 'completeEdit'});
	}

	render()
	{
		if(this.state.editMode === false)
		{
			return(
				<header className="row" style={StyleConstants.navBar}>
					<div className="col-xs-1"></div>
					<div className="col-xs-3"><h4><Link to='/'>&lt;Contacts</Link></h4></div>
					<div className="col-xs-5"></div>
					<div className="col-xs-2"><h4><a onClick={this.onEdit.bind(this)}>Edit</a></h4></div>
					<div className="col-xs-1"></div>
				</header>
			);
		}
		else
		{
			// console.log("this.state.editDirty:", this.state.editDirty);
			return(
				<header className="row" style={StyleConstants.navBar}>
					<div className="col-xs-1"></div>
					<div className="col-xs-3"><h4><a onClick={this.onCancelEdit.bind(this)}>Cancel</a></h4></div>
					<div className="col-xs-5"></div>
					<div className="col-xs-2"><DoneButton enabled={this.state.editDirty} onClick={this.onCompleteEdit.bind(this)}>Done</DoneButton></div>
					<div className="col-xs-1"></div>
				</header>
			);
		}
	}
}

export class App extends React.Component
{

	constructor(props)
	{
		super(props);
		this.state = {
			loading: true
		};
	}

	componentDidMount()
	{
		var me = this;
		ContactsModel.instance.getContacts()
		.then(function(contacts)
		{
			me.setState({loading: false});
		});
		EventBus.pubsub
		.where(event => event.type === 'saveContact')
		.subscribe((event)=>
		{
			ContactsModel.instance.saveContact(event.contact)
			.then(function(savedContact)
			{
				EventBus.pubsub.onNext({type: "contactSaved"});
			});
		});
	}

	render()
	{
		if(this.state.loading)
		{
			return (
				<div className="container-fluid">
					<div className="col-xs-2"></div>
					<div className="col-xs-8">Loading...</div>
					<div className="col-xs-2"></div>
				</div>
			);
		}
		return (
			<div className="container-fluid">
				<Router history={hashHistory}>
					<Route path="/" component={MainHeader}></Route>
					<Route path="/view/:id" component={ViewingContactHeader}></Route>
				</Router>
				<section className="row">
					<ContactRoutes/>
				</section>
			</div>
		);
	}
}

ReactDOM.render(<App/>, document.querySelector("#myApp"));
