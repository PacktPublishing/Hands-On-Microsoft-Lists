import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';

import * as strings from 'WeatherFieldCustomizerStrings';
import styles from './WeatherFieldCustomizer.module.scss';

/**
 * If your field customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IWeatherFieldCustomizerProperties {
  // This is an example; replace with your own property
  sampleText?: string;
}

const LOG_SOURCE: string = 'WeatherFieldCustomizer';

export default class WeatherFieldCustomizer
  extends BaseFieldCustomizer<IWeatherFieldCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    // Add your custom initialization to this method.  The framework will wait
    // for the returned promise to resolve before firing any BaseFieldCustomizer events.
    Log.info(LOG_SOURCE, 'Activated WeatherFieldCustomizer with properties:');
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));
    Log.info(LOG_SOURCE, `The following string should be equal: "WeatherFieldCustomizer" and "${strings.Title}"`);
    return Promise.resolve();
  }

  @override
  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    // Use this method to perform your custom cell rendering.
    let city = event.fieldValue;
    var weather = require('openweather-apis');
    (weather as any).setLang('en');
    (weather as any).setCity(city);
    (weather as any).setUnits('metric');
    (weather as any).setAPPID('YOUR API KEY');

    (weather as any).getAllWeather(function(err, temp){
      if(temp!=null){
        let city = temp.name;
        let condition = temp.weather[0].main;
        let icon = `https://openweathermap.org/img/w/${temp.weather[0].icon}.png`;
        let temperature = temp.main.temp.toString().split('.')[0];
        let html = `
          <div style="position: absolute; left: 8px; top: 8px; font-size: 31px; font-weight: 500;">${temperature}º</div>
          <img src="${icon}" style="position: absolute; left: 35px; top: 8px;">
          <div style="position: absolute; top: 10px; left: 90px;">${city}</div>
          <div style="position: absolute; top: 30px; left: 90px;">${condition}</div>
        `;
        event.domElement.innerHTML = html;
      }      
    });
  }


  @override
  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    // This method should be used to free any resources that were allocated during rendering.
    // For example, if your onRenderCell() called ReactDOM.render(), then you should
    // call ReactDOM.unmountComponentAtNode() here.
    super.onDisposeCell(event);
  }
}
