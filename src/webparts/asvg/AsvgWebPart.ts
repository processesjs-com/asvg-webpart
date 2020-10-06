import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './AsvgWebPart.module.scss';
import * as strings from 'AsvgWebPartStrings';
// @ts-ignore
import ASVG from 'advance-svg';

export interface IAsvgWebPartProps {
  page: string;
  filelocation:string;
}

export default class AsvgWebPart extends BaseClientSideWebPart <IAsvgWebPartProps> {

  constructor(){
    super();
    window.addEventListener('resize', ASVG.updateAll );
  }

  public render(): void {
    this.domElement.innerHTML = `<div
      data-asvg="${ this.properties.page ? escape(this.properties.page) : 'page1.svg' }"
      data-asvg-show="${ this.properties.page ? escape(this.properties.page) : 'page1.svg' }"
      data-asvg-filelocation="${escape(this.properties.filelocation)}"
      style="width:100%;" >
    </div>`;
    ASVG.updateElement( this.domElement.querySelector('[data-asvg]')  );
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('page', {
                  label: 'Page'
                }),
                PropertyPaneTextField('filelocation', {
                  label: 'File location'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
