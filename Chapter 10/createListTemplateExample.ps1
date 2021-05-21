# Example: Creating a template of an existing list and creating a new instance in another site

# Replace mytenant with your tenant's name, and the site URL, List name, and columns with your own
$credentials = (Get-Credential)

#Connect to site which contains the list
Connect-PnPOnline -Url https://mytenant.sharepoint.com/sites/ITProjects -Credentials $credentials 

#Extract the list as a template into a local file
Get-PnPSiteTemplate -Out PlannedITProjects.pnp -Handlers Lists -ListsToExtract "Planned IT Projects" 

#Add the data from the list into our template file
Add-PnPDataRowsToSiteTemplate -Path PlannedITProjects.pnp -List "Planned IT Projects" 

#Connect to the destination site
Connect-PnPOnline -Url https://mytenant.sharepoint.com/sites/PlannedProjects -Credentials $credentials

#Create a new list based on the template
Invoke-PnPSiteTemplate -Path .\PlannedITProjects.pnp 