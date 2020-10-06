## asvg-webpart

This is a SharePoint (Web Part) implementation of Advance SVG library. You can find the library on GitHub and see a Demo on:
https://github.com/processesjs-com/advance-svg
https://d2a8hhqmsel69m.cloudfront.net/

The implementation requres installing the advance-svg library form NPM.
```
npm install advance-svg
``` 

It makes minimum code changes to the default Web Part code, as illustaretd below:
```
import ASVG from 'advance-svg'; // @ts-ignore

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
