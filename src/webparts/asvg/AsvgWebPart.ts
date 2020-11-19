import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

/* advance-svg has all default styles within the package; however, the import declaration is left for future use, if necessary */
import styles from './AsvgWebPart.module.scss';
import * as strings from 'AsvgWebPartStrings';

/* advance-svg is ES6 Class and therefore will ignore TS */
import ASVG from 'advance-svg'; // @ts-ignore

export interface IAsvgWebPartProps {
  page: string;
  filelocation:string;
}

export default class AsvgWebPart extends BaseClientSideWebPart <IAsvgWebPartProps> {
  public asvg: ASVG;
/* Overwrite the default advance-svg library error handling function to avoid the default Alarm messages when entering the Web Part properties */
  public userErrorHandler: Function;

  constructor(){
    super();

    this.userErrorHandler = ( err: ErrorEvent ) => {};
    this.asvg = new ASVG({ userErrorHandler: this.userErrorHandler });

    window.addEventListener('resize', this.asvg.updateAll );
  }

  public render(): void {
    this.domElement.innerHTML = `<div
      data-asvg="${ this.properties.page ? escape(this.properties.page) : 'page1.svg' }"
      data-asvg-show="${ this.properties.page ? escape(this.properties.page) : 'page1.svg' }"
      data-asvg-filelocation="${escape(this.properties.filelocation)}"
      style="width:100%;" >
    </div>`;
    this.asvg.updateElement( this.domElement.querySelector('[data-asvg]')  );
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
