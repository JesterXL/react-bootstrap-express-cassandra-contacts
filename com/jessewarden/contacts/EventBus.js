import Rx from 'Rx';

class EventBus
{
	constructor()
	{
		this._pubsub = new Rx.Subject();
	}

	get pubsub()
	{
		return this._pubsub;
	}

	static get instance()
	{
		if(typeof EventBus._inst === 'undefined')
		{
			EventBus._inst = new EventBus();
		}
		return EventBus._inst;
	}
}

export default EventBus.instance