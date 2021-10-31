# Asvg-Webpart

This is a SharePoint (Web Part) implementation of Advance-SVG library. 

## Advance-SVG demo and source code

Demo and CDN: https://d2a8hhqmsel69m.cloudfront.net/

GitHub: https://github.com/processesjs-com/advance-svg

### Building this Webpart

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

In your tenant SharePoint create a folder and place these svg files: common.svg, page1.svg and page2.svg.
You can find these SVG files in the node_modules/advance-svg/svg folder in the source code of this package.
They are also available in the distribution of Advance SVG sources in GitHub, NPM and the CDN - https://d2a8hhqmsel69m.cloudfront.net/
In src/webparts/asvg/AsvgWebPart.ts edit line 33 to set defaultFileLocation to the folder that you have creted above.

```bash
gulp clean
gulp bundle --ship
gulp package-solution --ship
```

### Installing and using Asvg Web Part

Shortly, copy asvg-webpart\sharepoint\solution\asvg-webpart.sppkg in your tenant App Store site and use the Asvg Web Part in your tenant.
For information about development and installation of Web Parts visit:
https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/overview-client-side-web-parts 
