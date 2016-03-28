npm install
remove-item -Path "ParseDashboardExtension/Content/Parse-Dashboard" -Recurse -Force
robocopy "Parse-Dashboard/" "ParseDashboardExtension/Content/Parse-Dashboard/" /mir
copy package.json "ParseDashboardExtension/Content/package.json"
cd ParseDashboardExtension/Content
npm install --production
invoke-expression -Command ..\cleanNodeModules.ps1

cd ..
nuget pack ParseDashboardExtension.nuspec
cd ..