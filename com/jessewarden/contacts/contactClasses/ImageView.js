import React from 'react';
import ReactDOM from 'react-dom';

class ImageView extends React.Component
{
	render()
	{
		var imageStyles = {
			width: '4em',
			height: '4em'
		};
		var contact = this.props.contact;
		// console.log("ImageView::render, contact:", contact);
		if(typeof contact === 'undefined')
		{
			return(<div>No contact.</div>);
		}

		return (
			<div className="media">
				<div className="media-left">
					<a href="#">
						<img className="media-object img-circle" src="" alt=""
							style={imageStyles}></img>
					</a>
				</div>
				<div className="media-body">
					<h4 className="media-heading">{contact.firstName} {contact.lastName}</h4>
					<p>{contact.company}</p>
				</div>
			</div>
		);
	}
}

export default ImageView