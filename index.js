var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParder = require('body-parser');

var mongoose = require('mongoose');
var session = require('express-session');
var http = require('http');
var routes = require('./routes/index');

