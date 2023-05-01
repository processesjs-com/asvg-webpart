# Asvg-Webpart

This SharePoint Webpart is a wrapper of the **Advance-SVG** library. 

## Quick installation
Watch the video presentation in https://youtu.be/vi1xXfq_EgY

Copy **asvg-webpart\sharepoint\solution\asvg-webpart-2.sppkg** in your tenant App Catalogue. 

It's recommended to create a folder named **SVG** in each site where you will use the Webpart and copy **page1.svg** and **page2.svg** from the source code SVG folder.

## Advance-SVG documentation, demo and source code

Demo and CDN: https://d2a8hhqmsel69m.cloudfront.net/

GitHub: https://github.com/processesjs-com/advance-svg

## Building from source code

To build it from the source code, please familiarise with the documentation in the folowing location:
https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/overview-client-side-web-parts 

### Short commands to build

```bash
git clone https://github.com/processesjs-com/asvg-webpart.git
npm i
npm i -g gulp

gulp clean
gulp bundle --ship
gulp package-solution --ship
```
