import _ from 'lodash';

class CreateNewContact
{

	createNewContact(contact)
	{
		// mock
		// return new Promise(function(success, failure)
		// {
		// 	setTimeout(function()
		// 	{
		// 		success(contact);
		// 	}, 2000);
		// });

		return new Promise(function(success, failure)
		{
			var apiPort = 2155;
	        var URL = window.location.protocol + '//' + window.location.hostname + ':' + apiPort;
			URL += '/api/createcontact';
			fetch(URL, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(contact)
			})
			.then(function(response)
			{
				return response.json();
			})
			.then(function(result)
			{
				if(result)
				{
					if(result.result === true)
					{
						success(contact);
					}
					else
					{
						failure(result.error);
					}
				}
				else
				{
					failure(new Error("No valid response from server."));
				}
			});
		});
		
	}	
}

export default CreateNewContact

