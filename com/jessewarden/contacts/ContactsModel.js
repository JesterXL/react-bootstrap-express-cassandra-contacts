import Rx from 'Rx';
import GetContactsService from './GetContactsService';
import SaveContactService from './SaveContactService';
import _ from "lodash";

class ContactsModel
{

	get changes()
	{
		return this._changes;
	}

	get contacts()
	{
		return this._contacts;
	}

	set contacts(newValue)
	{
		var old = this._contacts;
		this._contacts = newValue;
		this.changes.onNext({type: 'changed', oldValue: old, newValue: newValue});
	}

	constructor()
	{
		this._contacts = [];
		this._changes = new Rx.Subject();
		this._changes.onNext({type: "ready"});
	}

	getContacts()
	{
		console.log("ContactsModel::getContacts...");
		var me = this;
		if(this._contacts.length > 0)
		{
			console.log("have contacts, resolving.");
			return Promise.resolve(this._contacts);
		}
		else
		{
			return new Promise(function(success, failure)
			{
				console.log("No contacts locally, checking server...");
				new GetContactsService().load()
				.then(function(contacts)
				{
					console.log("Contacts found from GetContactsService, returning.");
					me.contacts = contacts;
					success(contacts);
				});
			});
		}
	}

	getContactByID(id)
	{
		console.log("ContactsModel::getContactByID, id:", id);
		return _.find(this._contacts, (item)=>
		{
			console.log("item.id: " + item.id + ", id: " + id);
			return String(item.id) === String(id);
		});
	}

	saveContact(contact)
	{
		console.log("ContactsModel::saveContact...");
		var me = this;
		return new Promise(function(success, failure)
		{
			new SaveContactService().saveContact(contact)
			.then(function(contact)
			{
				var index = _.findIndex(me._contacts, (item)=>
				{
					return String(item.id) === String(contact.id);
				});
				me._contacts.splice(index, 1, contact);
				success(contact);
			})
			.catch(function(error)
			{
				failure(error);
			});
		});
	}

	static get instance()
	{
		console.log("ContactsModel::get instance");
		if(typeof ContactsModel._inst === 'undefined')
		{
			console.log("no instance, so creating");
			ContactsModel._inst = new ContactsModel();
		}
		return ContactsModel._inst;
	}
}

export default ContactsModel