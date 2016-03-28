$path = "node_modules"
Get-ChildItem -Path $path -Recurse | where {$_.PSIsContainer} | Where-Object {$_.Name -match '^(test[s]?|samples|doc[s]?|obj|typings|example[s]?)$'} | Remove-Item -Recurse -Verbose
Get-ChildItem -Path $path -Recurse | where {!$_.PSIsContainer} | Where-Object {$_.Name -match '\.(coffee|md|png|jpg|pdb|travis\.yml|gitignore|npmignore|d\.ts)$'} | Remove-Item -Recurse -Verbose
Get-ChildItem -Path $path -Recurse | where {!$_.PSIsContainer} | Where-Object {$_.Name -match '\.*(test|example).*$'} | Remove-Item -Recurse -Verbose