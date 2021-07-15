require("dotenv").config();
const path = require('path');

if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = "development";
}
//Declare  project root folder 
//can be access anywhere in the project folder
global.appRoot = `file://${path.resolve(__dirname)}`;


console.log("NODE_ENV : ", process.env.NODE_ENV);
var config = require("./config");

var setupDb = require("./startup/setupDb");
var setupExpress = require("./startup/setupExpress");

//Invoke intialize database
setupDb.setup();
var app = setupExpress.launch();

//Express server listen with port
app.listen(config.PORT || 3000, function () {
    console.log(
        "Express application listening port number " + (config.port || 3000)
    );
});
