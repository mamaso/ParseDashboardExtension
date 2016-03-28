# Parse Dashboard Extension

An Azure Web Site Extension to run the [parse dashboard](https://github.com/ParsePlatform/parse-dashboard) on the scm endpoint of your side, side by side with your parse server web app.

Install from portal -> web app -> tools -> site extensions -> ParseDashboardExtension

Access the dashboard through https://yourwebappname.scm.azurewebsites.net/parse-dashboard

You will need to add the following app settings to your web app, a parse-dashboard-config.json is automatically generated from them.
  * SERVER_URL: 'https://yourwebappname.azurewebsites.net'
  * APP_ID: Your Parse App Id
  * MASTER_KEY: Your Parse Master Key

  
To build the site extension, run buildSiteExtension.ps1
