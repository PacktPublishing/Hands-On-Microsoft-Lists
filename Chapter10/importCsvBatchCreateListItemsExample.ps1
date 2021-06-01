# Example: Importing data from a CSV file and adding new items to a list based on this data

# Replace mytenant with your tenant's name, and the site URL, List name, and columns with your own

Connect-PnPOnline -Url https://mytenant.sharepoint.com/sites/ITProjects -Credentials (Get-Credential) 

$list = Get-PnPList -Identity "Planned IT Projects" 

$csv = Import-Csv AllITProjects.csv 

 

foreach($project in $csv) { 

    Add-PnPListItem -List $list -Values @{ 

        "Title" = $project.Title; 

        "Responsible" = $project.Responsible; 

        "ExpectedCost" = $project.ExpectedCost; 

        "Department" = $project.Department; 

        "Durationinweeks" = $project.Durationinweeks; 

        "ProjectStart"= [datetime]::ParseExact($project.ProjectStart,"d/M/yyyy",$null); 

        "ProjectEnd" = [datetime]::ParseExact($project.ProjectEnd,"d/M/yyyy",$null) 

    } 

}