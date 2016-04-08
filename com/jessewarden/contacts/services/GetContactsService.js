class GetContactsService
{
	load()
	{
		return new Promise(function(success, failure)
		{
			// mock
			// setTimeout(function()
			// {
			// 	success([
			// 				{id: 1, firstName: 'Jesse', lastName: 'Warden', company: 'Accenture', homeNumber: "8005551234"},
			// 				{id: 2, firstName: 'Brandy', lastName: 'Fortune', company: 'Royall', homeNumber: "8005551234"},
			// 				{id: 3, firstName: 'Albus', lastName: 'Dumbledog', company: '', homeNumber: "8005551234"}
			// 			]);
			// }, 1000);
			
			console.log("GetContactsService::load...");
			var apiPort = 2155;
	        var URL = window.location.protocol + '//' + window.location.hostname + ':' + apiPort;
			URL += '/api/contacts/all';
			fetch(URL)
			.then(function(response)
			{
				console.log("GetContactsService::load response, parsing json...");
				return response.json();
			})
			.then(function(result)
			{
				console.log("GetContactsService::load, result:", result);
				if(result)
				{
					if(result.result === true)
					{
						console.log("result true, sending data.");
						success(result.data);
					}
					else
					{
						console.log("result false, sending error.");
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

export default GetContactsService