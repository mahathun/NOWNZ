/**
 * Created by thaindu on 25/10/2015.
 */

var express = require('express');
var app = express();
app.use(express.static(__dirname + '/app'));
app.listen(process.env.PORT || 8080);