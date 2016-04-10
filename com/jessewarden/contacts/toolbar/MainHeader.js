import React from 'react';
import ReactDOM from 'react-dom';
import StyleConstants from '../StyleConstants';
import {Link} from 'react-router';
import EventBus from '../EventBus';

class MainHeader extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			searchText: this.props.params.query
		};
	}

	onChangeSearchText(event)
	{
		this.setState({searchText: event.target.value});
	}
	onSearch(event)
	{
		EventBus.pubsub.onNext({type: 'search', searchValue: this.state.searchText});
	}

	render()
	{
		return (
			<header className="row" style={StyleConstants.navBar}>
				<div className="row">
					<div className="col-xs-4"></div>
					<div className="col-xs-4"><h3>Contacts</h3></div>
					<div className="col-xs-2"></div>
					<div className="col-xs-2">
						<div className="row">
							<div className="col-xs-12">&nbsp;</div>
						</div>
						<div className="row">
							<div className="col-xs-12">
								<Link to='/new'>
									<img className='img-responsive' 
										src='ic_person_add_black_512dp_2x.png'
										style={StyleConstants.addPersonIcon}></img>
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-1"></div>
					<div className="col-xs-10">
						<form className="form-inline" onSubmit={this.onSearch.bind(this)}>
							<div className="form-group">
								<label className="sr-only" for="searchInput">Search</label>
								<div className="input-group">
									<div className="input-group-addon">&nbsp;
										<img style={StyleConstants.searchIcon} src='ic_search_black_24dp_2x.png'></img>
									</div>
									<input type="text" className="form-control" id="searchInput" placeholder="Search"
										value={this.state.searchText}
										onChange={this.onChangeSearchText.bind(this)}></input>
								</div>
							</div>
						</form>
					</div>
					<div className="col-xs-1"></div>
				</div>
			</header>
		)
	}
}

export default MainHeader