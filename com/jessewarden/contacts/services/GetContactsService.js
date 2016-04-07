class GetContactsService
{
	load()
	{
		return new Promise(function(success, failure)
		{
			setTimeout(function()
			{
				success([
							{id: 1, firstName: 'Jesse', lastName: 'Warden', company: 'Accenture', homeNumber: "8005551234"},
							{id: 2, firstName: 'Brandy', lastName: 'Fortune', company: 'Royall', homeNumber: "8005551234"},
							{id: 3, firstName: 'Albus', lastName: 'Dumbledog', company: '', homeNumber: "8005551234"}
						]);
			}, 1000);
		});
	}	
}

export default GetContactsService