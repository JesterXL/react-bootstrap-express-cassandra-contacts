const PORT = 2155;
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cassandra = require('cassandra-driver');
const _ = require('lodash');
const cors = require('cors')

app.use(cors());
app.use(bodyParser.json());

// app.use(express.static(__dirname + '/public'));

// app.get('*', function (request, response)
// {
//   response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
// });

app.listen(PORT, function ()
{
  console.log('Example app listening on port ' + PORT + '!');
});

app.get('/api/ping', function(req, res)
{
	console.log("ping");
	res.send('Pong.');
});

app.post('/api/postecho', function(req, res)
{
	console.log("postecho, req.body:", req.body);
	res.send(req.body);
});

app.get('/api/testcassandra', function(req, res)
{
	const client = new cassandra.Client({ contactPoints: ['192.168.99.100'], keyspace: 'demo'});

	const query = 'SELECT email, last_name FROM user_profiles WHERE key=?';
	client.execute(query, ['guy'], function(err, result) {
		if(err)
		{
			console.log("err:", err);
			return;
		}
		console.log('got user profile with email ' + result.rows[0].email);
		res.send(result);
	});
});

const KEYSPACE = 'demo';

function connectToCassandra(keyspace)
{
	return new Promise((success, failure)=>
	{
		var clientParams;
		if(_.isNil(keyspace))
		{
			clientParams = { contactPoints: ['192.168.99.100']};
		}
		else
		{
			clientParams = { contactPoints: ['192.168.99.100'], keyspace: keyspace};
		}
		const client = new cassandra.Client(clientParams);
		client.connect(function(connectError)
		{
			console.log("Connected. Executing query...");
			if(connectError)
			{
				console.log("connectError:", connectError);
				return failure(connectError);
			}
			success(client);
		});
	});	
}

app.get('/api/create', function(req, res)
{
	console.log("Connecting to Cassandra...");
	connectToCassandra()
	.then((client)=>
	{
		console.log("Connected. Executing query...");
		const query = "CREATE KEYSPACE " + KEYSPACE + " WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 }";
		client.execute(query, function(err, result) {
			if(err)
			{
				console.log("err:", err);
				res.send(err);
				return;
			}
			console.log("create result:", result);
			res.send(result);
		});
	})
	.catch((error)=>
	{
		res.send(error);
	});
});

app.get('/api/createtables', function(req, res)
{
	connectToCassandra(KEYSPACE)
	.then((client)=>
	{
		const query = 'CREATE TABLE contacts (user_id int PRIMARY KEY, firstname text, lastname text, company text, phone text)';
		client.execute(query, function(err, result)
		{
			if(err)
			{
				console.log("err:", err);
				res.send(err);
				return;
			}
			console.log("create table result:", result);
			res.send(result);
		});
	})
	.catch((error)=>
	{
		res.send(error);
	});
});

app.post('/api/createcontact', function(req, res)
{
	var contact = req.body;
	console.log("contact:", contact);
	connectToCassandra(KEYSPACE)
	.then((client)=>
	{
		var query = "INSERT INTO contacts (user_id, firstname, lastname, company, phone) VALUES (";
		query += contact.id + ", '" + contact.firstName + "', '" + contact.lastName + "',";
		query += " '" + contact.company + "', '" + contact.homeNumber + "')";
		console.log("query:", query);
		client.execute(query, function(err, result)
		{
			if(err)
			{
				console.log("err:", err);
				res.send(err);
				return;
			}
			console.log("insert contact result:", result);
			res.send({result: true, data: result});
		});
	})
	.catch((error)=>
	{
		res.send({result: false, error: error});
	});
});

app.get('/api/contacts/all', function(req, res)
{
	connectToCassandra(KEYSPACE)
	.then((client)=>
	{
		const query = "SELECT * FROM contacts";
		client.execute(query, function(err, result)
		{
			if(err)
			{
				console.log("err:", err);
				res.send(err);
				return;
			}
			console.log("get all contacts result:", result);
			result.rows = _.map(result.rows, (item)=>
			{
				return {
					id: item.user_id,
					firstName: item.firstname,
					lastName: item.lastname,
					company: item.company,
					homeNumber: item.phone
				};
			});
			res.send({result: true, data: result.rows});
		});
	})
	.catch((error)=>
	{
		res.send({result: false, error: error});
	});
});


