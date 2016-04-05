class GetContactsService
{
	load()
	{
		return new Promise(function(success, failure)
		{
			setTimeout(function()
			{
				success([
							{id: 1, firstName: 'One'},
							{id: 2, firstName: 'Two'},
							{id: 3, firstName: 'Three'}
						]);
			}, 1000);
		});
	}	
}

export default GetContactsService