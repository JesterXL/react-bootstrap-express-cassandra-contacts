import React from 'react';
import ReactDOM from 'react-dom';

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

export default DoneButton