# Example: Adding a new item to a list and updating it

# Replace mytenant with your tenant's name, and the site URL, List name, and columns with your own

Connect-PnPOnline -Url https://mytenant.sharepoint.com/sites/ITProjects -Credentials (Get-Credential) 
$list = Get-PnPList -Identity "Planned IT Projects" 
$item = Add-PnPListItem -List $list -Values @{"Title" = "PowerShell Training"; "Responsible" = "rene@modery.net"; "ExpectedCost" = 3500} 
Set-PnPListItem -List $list -Identity $item -Values @{"Department" = "IT"; "Durationinweeks" = 1; "ProjectStart"= "05/03/2021"; "ProjectEnd" = "05/06/2021"}