require("./node_modules/bootstrap/dist/css/bootstrap.min.css")
require("./node_modules/bootstrap/dist/css/bootstrap-theme.min.css")
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, hashHistory} from 'react-router';
import ContactRoutes from './com/jessewarden/contacts/ContactRoutes';
import ContactsModel from './com/jessewarden/contacts/ContactsModel';

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
							<img class='img-responsive' 
								src='ic_person_add_black_512dp_2x.png'
								style={StyleConstants.addPersonIcon}></img>
						</div>
					</div>
					
				</div>
			</header>
		)
	}
}

class ViewingContactHeader extends React.Component
{
	render()
	{
		return(
			<header className="row" style={StyleConstants.navBar}>
				<div className="col-xs-1"></div>
				<div className="col-xs-3"><h4><Link to='/'>&lt;Contacts</Link></h4></div>
				<div className="col-xs-5"></div>
				<div className="col-xs-2"><h4><a>Edit</a></h4></div>
				<div className="col-xs-1"></div>
			</header>
		)
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
