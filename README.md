# Parse Dashboard Extension

An Azure Web Site Extension to run the [parse dashboard](https://github.com/ParsePlatform/parse-dashboard) on the scm endpoint of your side, side by side with your parse server web app.

Install from portal -> web app -> tools -> site extensions -> ParseDashboardExtension

Access the dashboard through https://yourwebappname.scm.azurewebsites.net/parse-dashboard

You will need to add the following app settings to your web app, a parse-dashboard-config.json is automatically generated from them.
  * SERVER_URL: The url to your parse server, 'https://yourwebappname.azurewebsites.net'
  * APP_ID: Your Parse App Id
  * MASTER_KEY: Your Parse Master Key

  
To build the site extension, run buildSiteExtension.ps1, which executes the following steps:
 1. builds and bundles the parse dashboard
 2. copy bundle/code/package.json to ParseDashboardExtension/Content
 3. installs production node modules inside the content directory
 4. cleans unnecessary files/folders from production node modules
 5. creates the nuget package
