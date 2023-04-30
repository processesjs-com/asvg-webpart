import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

/*
  This Web Part is a wrapper of the Advance SVG (ASVG) library. 

  For documentation and demo about ASVG, please visit: https://d2a8hhqmsel69m.cloudfront.net/
  The source code is available in GitHub at: https://github.com/processesjs-com/advance-svg and via NPM: https://www.npmjs.com/package/advance-svg

  ASVG is inserted from a native E6 boundle file due to issues with installation from source code with some of the Development Packages as follows:
  1. The current SharePoint WebPart buid tool (3.17.20) raised errors when building Cheerio 1.0.0.rc.12, but can build from rc.3
  2. The current Webpack (5.80.0) raised errors when building Cheerio 1.0.0.rc.3, but works with rc.12
  Because Cheerio is the main dependancy of ASVG, for the time being, the WebPart inserts a compiled Boundle insetad of installation from source.
*/

// @ts-ignore - needed because ASVG is native ES6 package instead of TypeScript 
import asvg from './asvg.js';

export interface IAsvg2WebPartProps {
  page: string;
  filelocation: string;
}

export default class Asvg2WebPart extends BaseClientSideWebPart<IAsvg2WebPartProps> {

  constructor(){
    super();
    // @ts-ignore - needed because window.asvg does not exists during the build time 
    if( typeof window.asvg === 'undefined' ) asvg(); // Insert ASVG
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Configure ASVG WebPart'
          },
          groups: [
            {
              groupName: 'Page (.SVG file name) and File Location', 
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
    }
  }

  public render(): void {
    const defURL = this.context.pageContext.web.absoluteUrl + '/SVG/';
    this.domElement.innerHTML = `<div style="width:100%;"
      data-asvg="${ this.properties.page ? this.properties.page : 'page1.svg' }" 
      data-asvg-show="${ this.properties.page ? this.properties.page : 'page1.svg' }" 
      data-asvg-filelocation="${ this.properties.filelocation ? this.properties.filelocation : defURL }" >
    </div>`;
    // @ts-ignore - see note above
    window.asvg.updateElement( this.domElement.querySelector('[data-asvg]')  );
  }

  protected onInit(): Promise<void> {
    return super.onInit();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
