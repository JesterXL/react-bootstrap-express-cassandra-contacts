import Rx from 'Rx';
import GetContactsService from '../services/GetContactsService';
import SaveContactService from '../services/SaveContactService';
import CreateNewContact from '../services/CreateNewContact';
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
				})
				.catch(function(error)
				{
					console.log("Contacts load error:", error);
					failure(error);
				});
			});
		}
	}

	search(query)
	{
		console.log("ContactsModel::search, query:", query);
		var results = [];
		try
		{
			results = _.filter(this._contacts, function(item)
			{
				return item.firstName.toLowerCase().indexOf(query) > -1;
			});
		}
		catch(searchError)
		{
			results = [];
		}
		console.log("will resolve with results:", results);
		return Promise.resolve(results);
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

	saveNewContact(contact)
	{
		console.log("ContactsModel::saveNewContact...");
		var me = this;
		return new Promise(function(success, failure)
		{
			var start = 0;
			_.forEach(me._contacts, (item)=>
			{
				var id = item.id;
				if(_.isString(id))
				{
					id = parseInt(id);
				}
				if(id > start)
				{
					start = id;
				}
			});
			start++;
			contact.id = start;
			console.log("saveNewContact's id:", contact.id);
			new CreateNewContact().createNewContact(contact)
			.then(function(contact)
			{
				me._contacts.push(contact);
				success(contact);
			})
			.catch(function(error)
			{
				failure(error);
			});
		});
	}

	getNewContact()
	{
		return {
			firstName: '', lastName: '', company: '', homeNumber: ""
		};
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