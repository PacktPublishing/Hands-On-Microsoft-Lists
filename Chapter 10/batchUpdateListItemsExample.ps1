# Example: Updating all items in a list

# Replace mytenant with your tenant's name, and the site URL, List name, and columns with your own

Connect-PnPOnline -Url https://mytenant.sharepoint.com/sites/ITProjects -Credentials (Get-Credential) 

$list = Get-PnPList -Identity "Planned IT Projects" 

$items = Get-PnPListItem -List $list 

foreach($item in $items) { 

    Write-Host "Current Expected Cost: $($item["ExpectedCost"])" 

    Write-Host "New Expected Cost: $($item["ExpectedCost"]*1.1)" 

    Set-PnPListItem -List $list -Identity $item.Id -Values @{"ExpectedCost" = $item["ExpectedCost"]*1.1} 

} 