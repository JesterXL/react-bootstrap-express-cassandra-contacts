import React from 'react';
import ReactDOM from 'react-dom';
import EventBus from '../EventBus';
import StyleConstants from '../StyleConstants';
import {Router, Route, Link, hashHistory} from 'react-router';
import DoneButton from './DoneButton';

class NewContactHeader extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
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
	}

	onCompleteEdit()
	{
		EventBus.pubsub.onNext({type: 'completeNew'});
	}

	render()
	{
		var cancelLink = '/';
		console.log("cancelLink:", cancelLink);
		return (
			<header className="row" style={StyleConstants.navBar}>
				<div className="col-xs-1"></div>
				<div className="col-xs-3"><h4><Link to={cancelLink}>Cancel</Link></h4></div>
				<div className="col-xs-5"></div>
				<div className="col-xs-2"><DoneButton enabled={this.state.editDirty} onClick={this.onCompleteEdit.bind(this)}>Done</DoneButton></div>
				<div className="col-xs-1"></div>
			</header>
		);
	}
}

export default NewContactHeader