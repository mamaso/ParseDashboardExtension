/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
// Command line tool for npm start

var DEFAULT_DASHBOARD_CONFIG = __dirname + '/parse-dashboard-config.json';

var program = require("commander");
program.option('--port [port]', "the port to run parse-dashboard");
program.option('--config [config]', "the path to the configuration file");
program.option('--allowInsecureHTTP [allowInsecureHTTP]', 'set that flag when parse server is behind an HTTPS load balancer/proxy');

program.parse(process.argv);

// collect the variables
var configFile = program.config || DEFAULT_DASHBOARD_CONFIG;
var port = program.port || process.env.PORT;
var allowInsecureHTTP = program.allowInsecureHTTP || process.env.PARSE_DASHBOARD_ALLOW_INSECURE_HTTP;

var packageJson = require('package-json');
var basicAuth = require('basic-auth');
var path = require('path');
var jsonFile = require('json-file-plus');
var express = require('express');
var app = express();
var currentVersionFeatures = require('../package.json').parseDashboardFeatures;

var prefix = '/parse-dashboard';

// Serve public files.
app.use(prefix, express.static(path.join(__dirname,'public')));

var newFeaturesInLatestVersion = []
packageJson('parse-dashboard').then(latestPackage => {
  if (latestPackage.parseDashboardFeatures instanceof Array) {
    newFeaturesInLatestVersion = parseDashboardFeatures.filter(feature => {
      return currentVersionFeatures.indexOf(feature) === -1;
    });
  }
});

app.get(prefix + '/parse-dashboard-config.json', function(req, res) {
  var response = {
    apps: [
        {
          serverURL: process.env.SERVER_URL + '/parse',
          appId: process.env.APP_ID,
          masterKey: process.env.MASTER_KEY,
          appName: process.env.WEBSITE_SITE_NAME || 'Azure Parse Server'
        }
    ],
    newFeaturesInLatestVersion: newFeaturesInLatestVersion
  };

  return res.send(response);
});

// For every other request, go to index.html. Let client-side handle the rest.
app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Start the server, listening to port 4040.
app.listen(port || 4040);
