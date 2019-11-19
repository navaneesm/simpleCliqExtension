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
					'MIIBIjANBgkqhkiG9w0BAQEFAA'+
'OCAQ8AMIIBCgKCAQEArn6gDgdz'+
'QABOtkbwXrP7rVJ85U6nH4Ehh2'+
'OM/YobUGcftZm0N5H2cw8AvfjR'+
'p61XTyLv0Ln73UXZL9/2awttN9'+
'xfKZlSo8cn3qzxTLuwSvOHEs17'+
'v3ZcacyxDd6NEQwHbY0PtJ1AsL'+
'qjF0nZ+XnLgpHIYmd8MBIg157U'+
'jTrh4cqF4/bCfhfE/3gkbv+AUD'+
'j3KP3m7lAvn10ucuak22RkH6/c'+
'qFOAsQWlwmzR/CvgUcTp6gPOOi'+
'O4KI6gDHjPHE44lsh1cRr9UKOf'+
'c88k4eRWc4nJdjKPLN6P9xPOXM'+
'b5IufxNVCVOKOzAd6GCKxe82iO'+
'YwUaUaZcN5mD2newyKFwlwIDAQAB'+
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
