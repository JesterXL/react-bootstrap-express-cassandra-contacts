require("./node_modules/bootstrap/dist/css/bootstrap.min.css")
require("./node_modules/bootstrap/dist/css/bootstrap-theme.min.css")
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, hashHistory} from 'react-router';
import ContactRoutes from './com/jessewarden/contacts/ContactRoutes';

export class App extends React.Component
{
	render()
	{
		return (
			<div className="container-fluid">
				<header className="row">
					<div className="col-xs-4"></div>
					<div className="col-xs-4"><h1>Contacts</h1></div>
					<div className="col-xs-3"></div>
					<div className="col-xs-1">oc</div>
				</header>
				<section className="row">
					<ContactRoutes/>
				</section>
				<footer>
					Basic Footer
				</footer>
			</div>
		);
	}
}

ReactDOM.render(<App/>, document.querySelector("#myApp"));
