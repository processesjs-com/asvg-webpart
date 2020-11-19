# Asvg-Webpart

This is a SharePoint (Web Part) implementation of Advance-SVG library. 

## Installation

The simplest way is to copy asvg-webpart.sppkg file form \sharepoint\solution into the SharePoint Application Catalog.

For detail instructions, please see https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/serve-your-web-part-in-a-sharepoint-page

## Advance-SVG demo and source code

GitHub: https://github.com/processesjs-com/advance-svg

Demo and CDN: https://d2a8hhqmsel69m.cloudfront.net/


## Asvg-Webpart explained

It makes minimum code changes to the default Web Part code, as illustaretd below:
```
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
  ...
```

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
