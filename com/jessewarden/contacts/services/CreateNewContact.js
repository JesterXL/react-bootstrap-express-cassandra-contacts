class CreateNewContact
{
	createNewContact(contact)
	{
		return new Promise(function(success, failure)
		{
			setTimeout(function()
			{
				success(contact);
			}, 2000);
		});
	}	
}

export default CreateNewContact