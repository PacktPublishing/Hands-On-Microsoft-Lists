# Disable creation of personal Microsoft Lists in OneDrive

# Replace mytenant with your tenant's name
Connect-SPOService -Url https://mytenant-admin.sharepoint.com

Set-SPOTenant -DisablePersonalListCreation $true

# Verify the setting
Get-SPOTenant | select DisablePersonalListCreation