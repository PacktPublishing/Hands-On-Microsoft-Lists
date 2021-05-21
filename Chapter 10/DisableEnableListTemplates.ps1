# Disable or enable List templates

# Replace mytenant with your tenant's name
Connect-SPOService -Url https://mytenant-admin.sharepoint.com


#For a current list of template IDs visit https://docs.microsoft.com/en-us/sharepoint/control-lists#disable-built-in-list-templates
#Issue tracker 
$issueTrackerTemplateId = 'C147E310-FFB3-0CDF-B9A3-F427EE0FF1CE'

#Employee onboarding
$employeeOnboardingTemplateId = 'D4C4DAA7-1A90-00C6-8D20-242ACB0FF1CE'

#Event itinerary
$eventItineraryTemplateId = '3465A758-99E6-048B-AB94-7E24CA0FF1CE'

#Asset manager
$assetManagerTemplateId = 'D2EDA86E-6F3C-0700-BE3B-A408F10FF1CE'

#Recruitment tracker
$recruitmentTrackerTemplateId = '3A7C53BE-A128-0FF9-9F97-7B6F700FF1CE'

#Travel requests
$travelRequestsTemplateId = 'C51CF376-87CF-0E8F-97FF-546BC60FF1CE'

#Work progress tracker
$workProgressTrackerTemplateId = 'B117A022-9F8B-002D-BDA8-FA266F0FF1CE'

#Content scheduler
$contentSchedulerTemplateId = '9A429811-2AB5-07BC-B5A0-2DE9590FF1CE'

#Incidents
$incidentsTemplateId = 'E3BEEF0B-B3B5-0698-ABB2-6A8E910FF1CE'

#Patient care coordination
$patientCareCoordinationTemplateId = '0134C13D-E537-065B-97D1-6BC46D0FF1CE'

#Loans
$loansTemplateId = '7C920B56-2D7A-02DA-94B2-57B46E0FF1CE'



#Disable a specific template. Update the ID as per list above
$templateID = $issueTrackerTemplateId
Set-SPOTenant -DisableModernListTemplateIds $templateID


#Enable a specific template. Update the ID as per list above
$templateID = $issueTrackerTemplateId
Set-SPOTenant -EnableModernListTemplateIds  $templateID

#Get a list of all disabled templates
Get-SPOTenant | select DisabledModernTemplateIds