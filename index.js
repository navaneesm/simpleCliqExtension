const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');

//Parse application/json body
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));


//Handle POST request
app.post('/', function(req, res){
	
	const body = req.body;
	const bodyString = JSON.stringify(body)
	const signature = req.header('X-Cliq-Signature');
	console.log("\n<!------- ******** Signature header ******** -------!>\n" + signature + "\n<!------- ******** End of Signature header ******** -------!>");
	console.log("\n<!------- ******** Request Body ******** -------!>\n" + bodyString + "\n<!------- ******** End of Request Body ******** -------!>");
	console.log("\n<!------- ******** Given Params ******** -------!>");
	for(param in body.params)
	{
		console.log(param);
	}
	console.log("<!------- ******** End of Given Params ******** -------!>");

	//Verifying signature
	var publicKey = '-----BEGIN PUBLIC KEY-----\n'+
					'MIIBIjANBgkqhkiG9w0BAQEFAAOC'+
					'AQ8AMIIBCgKCAQEAlcHMHRBcRRnw'+
					'hgNRsdw2CLdqonbI6S5lJhGOS/X/'+
					'SeYc7IstRJXOL3KWkJFFzSb1HHQ8'+
					'ajx+b5B14VoYd8PUDw6TdJrw45qm'+
					'CJadMBhVIRtXcZEW6TE+fFGXtgs7'+
					'qN8pb43h7op7OXa1AunzTDr5kx8l'+
					'7u6ftCTObs+YMpGTPbqCpDxNgLqG'+
					'7YKeWMAa55kg6B5DrlqsoCe+4KTh'+
					'EUMdU6ETMIjELmpnJ67taD+mWkZ7'+
					'H2PQwnmMxJC0nxY2QfJscR2hX4xc'+
					'BbBlyFEOqVxh7tnGKqAuLVz3c/64'+
					'AFCzfalRvoGukzv2VIWId5jUPfv6'+
					'4ziahK12JgD1whutGGiQWwIDAQAB'+
					'\n-----END PUBLIC KEY-----';
	var verifier = crypto.createVerify('sha256');
	verifier.update(bodyString);
	if(typeof signature !== "undefined")
	{
		var result = verifier.verify(publicKey, signature, 'base64');
		console.log("\n<!------- ******** Is valid signature # " + result + " # ******** -------!>");
	}
	var response = {};
	response.output = {"text":"Hi Cliq URL invoke extension have reached the external server :smile:"};
	console.log("\n<!------- ******** Execution Response ******** -------!>\n" + JSON.stringify(response) + "\n<!------- ******** End of Execution Response ******** -------!>");
  	res.send(response);
});

app.listen(process.env.PORT || 5000);
