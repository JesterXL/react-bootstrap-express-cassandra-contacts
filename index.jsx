require("./node_modules/bootstrap/dist/css/bootstrap.min.css")
require("./node_modules/bootstrap/dist/css/bootstrap-theme.min.css")
import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';

export class App extends React.Component
{

	constructor(props)
	{
		super(props);
		this.state = {
			name: ""
		};
	}

	onNameChange(e)
	{
		this.setState({
			name: e.target.value
		})
	}

	render()
	{
		return (
			<div>
			<p>Simple React + Wat + Bootstrap + Webpack</p>
			<input type="text" onChange={this.onNameChange.bind(this)} />
			<span>{this.props.moo}, {this.state.name}</span>
			<Button>Default</Button>
			</div>

		);
	}
}

ReactDOM.render(<App moo="cow"/>, document.querySelector("#myApp"));
