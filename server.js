/**
 * Created by jmartinez on 7/17/18.
 */
import express from 'express'
import bodyParser from 'body-parser';
import path from 'path'



const app = express();
var twilio = require('twilio');
const accountSid = 'AC5a322aa3bcad121ab0925817bbccf1e8';
const authToken = 'cc7f80ae0ce2ff927d6ff64e80454028';
const twilioClient = new twilio(accountSid, authToken);

app.use(bodyParser.json());

//configuration for create-react-app
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/api/testmessage', (req, res, next) => {
    twilioClient.messages.create({
        body: "Hi! This is Justin Martinez, one of your Democrat Precinct Committee People. I'm here to help answer questions about the November Election, and help connect voters with resources! Would you be interested in meeting your neighbors for coffee and to talk about how our neighborhood can get the Blue Wave started?",
        to: '+15052702887',  // Text this number
        from: '+17205132559' // From a valid Twilio number
    }).then((message) => {
        res.json({sid: message.sid, messageObj: message})
    }).catch((error) => {console.log(error)})
});





app.listen(3000, function(){
    console.log("listening on port 3000")
});