var express = require('express');
var crypto = require('crypto');
var app = express();
var bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
 }));

//Handle POST request
app.post('/', function(req, res){

	console.log("\n<!------- ******** Signature header ******** -------!>\n" + JSON.stringify(req.header('X-Cliq-Signature')) + "\n<!------- ******** End of Signature header ******** -------!>");
	console.log("\n<!------- ******** Request Body ******** -------!>\n" + JSON.stringify(req.body) + "\n<!------- ******** End of Request Body ******** -------!>");
	console.log("\n<!------- ******** Given Params ******** -------!>");
	for(param in req.body.params)
	{
		console.log(param);
	}
	console.log("<!------- ******** End of Given Params ******** -------!>");

	//Verifying signature
	var body = req.body;
	var signature = req.header('X-Cliq-Signature');
	var publicKey = '-----BEGIN PUBLIC KEY-----\n'+
			'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AM'+
			'IIBCgKCAQEApLufF81FW87VuSwYRqZNEE'+
			'XGoVyKx3TBvNbtAU0d5/P9Dwo/aStTsBt'+
			'NxOhSOIyOI6ZJpogWaZh19iDYvcYyk1Oi'+
			'GGM4Pl8UR0aCV4m5VJsGCkrWXSqtWFLuF'+
			'G0v4iI+ASjeew8SDtk6+/2viiVpLLHUUl'+
			'mfj1f+C7yFhiZQ0ubfG1dGMRBeuAH12tV'+
			'hqGtnZJxMPWSO6O03qivmkPfoU65GcMAY'+
			'p5uQCjYgtcxzLWYZsBUp3FEj6w4yygLjq'+
			'LTE55hf4NbdjO6W3WI91Dfi1eEzTgfEkg'+
			'TrcyF405FjPxhfM3mZyVQSMaGjaR3SdA2'+
			'L0KsjGL3BWO0pc2ICggF3lQIDAQAB'+
			'\n-----END PUBLIC KEY-----';
	var verifier = crypto.createVerify('sha256');
	verifier.update(JSON.stringify(body));
	if(typeof signature !== "undefined")
	{
		var result = verifier.verify(publicKey, signature, 'base64');
		console.log("\n<!------- ******** Is valid signature # " + result + " # ******** -------!>");
	}

	response.output = {"text":"Hi Cliq URL invoke extension have reached the external server :smile:"};
	console.log("\n<!------- ******** Execution Response ******** -------!>\n" + JSON.stringify(response) + "\n<!------- ******** End of Execution Response ******** -------!>");
  	res.send(response);
});

app.listen(process.env.PORT || 5000);
