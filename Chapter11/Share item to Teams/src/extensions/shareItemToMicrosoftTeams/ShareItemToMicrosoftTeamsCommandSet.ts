import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'ShareItemToMicrosoftTeamsCommandSetStrings';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IShareItemToMicrosoftTeamsCommandSetProperties {
  // This is an example; replace with your own properties

}

const LOG_SOURCE: string = 'ShareItemToMicrosoftTeamsCommandSet';

export default class ShareItemToMicrosoftTeamsCommandSet extends BaseListViewCommandSet<IShareItemToMicrosoftTeamsCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    this.appendShareToTeamsScript();
    this.createFakeDiv();
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const compareOneCommand: Command = this.tryGetCommand('SHAREITEMTOTEAMS');
    if (compareOneCommand) {
      // This command should be hidden unless exactly one row is selected.

      //FileLeafRef == "Folder"
      if(event.selectedRows.length === 1){
        if(event.selectedRows[0].getValueByName("FileLeafRef") != 'Folder'){
          compareOneCommand.visible = true;
        }
      }else{
        compareOneCommand.visible = false;
      }

    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {

  
    switch (event.itemId) {
      case 'SHAREITEMTOTEAMS':

        var filePath: string = null;
        var datahref: string;
        
        try{
          filePath = event.selectedRows[0].getValueByName("ServerRedirectedEmbedUrl");
        }catch{
          filePath = null;
        }
        
        //Handle files on document libraries 
        if(filePath != null){
          datahref = filePath; // office file with preview 
          if(datahref == ""){
            //file without preview 
            debugger;
            var fileRef = event.selectedRows[0].getValueByName("FileLeafRef");        
            var tenantURL = document.location.origin;
            var listURL = this.context.pageContext.list.serverRelativeUrl;
            datahref = `${tenantURL}${listURL}/${fileRef}`;
            datahref = datahref.replace(/ /g,"%20");
          }
        }else{
          var selectedRowID = event.selectedRows[0].getValueByName("ID");        
          var tenantURL = document.location.origin;
          var listURL = this.context.pageContext.list.serverRelativeUrl;
          datahref = `${tenantURL}${listURL}/DispForm.aspx?ID=${selectedRowID}`;     
          datahref = datahref.replace(/ /g,"%20");     
        }

        var fakeBTN = document.getElementById('fakeShareBTN');
        fakeBTN.innerHTML = `<div id="hiddenhareTeamsBTN" style="display:none;" class="teams-share-button" data-href="${datahref}"></div>`;

        eval('shareToMicrosoftTeams.renderButtons();');

        var fakeLink = fakeBTN.getElementsByTagName('a');
        fakeLink[0].click();
        
        break;
      default:
        throw new Error('Unknown command');
    }
  }

   //Append the Share to Teams script to the page 
  private appendShareToTeamsScript(): void{   
    var script   = document.createElement("script");
    script.type  = "text/javascript";
    script.src   = "https://teams.microsoft.com/share/launcher.js";
    document.body.appendChild(script);
  }

  //Create a hiddend placehoder for the share to teams buttom 
  private createFakeDiv(): void{  
    var div   = document.createElement("div");
    div.id  = "fakeShareBTN";    
    document.body.appendChild(div);
  }


  
}
