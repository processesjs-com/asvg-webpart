var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import * as strings from 'AsvgWebPartStrings';
/* advance-svg is ES6 Class and therefore need to put @ts-ignore */
import ASVG from 'advance-svg'; // @ts-ignore
var AsvgWebPart = /** @class */ (function (_super) {
    __extends(AsvgWebPart, _super);
    function AsvgWebPart() {
        var _this = _super.call(this) || this;
        /* Overwrite the default advance-svg library error handling function with an empty one to avoid the Alarm messages when entering the Web Part properties
        */
        _this.userErrorHandler = function (err) { };
        _this.asvg = new ASVG({ userErrorHandler: _this.userErrorHandler });
        window.addEventListener('resize', _this.asvg.updateAll);
        return _this;
    }
    AsvgWebPart.prototype.render = function () {
        this.domElement.innerHTML = "<div\n      data-asvg=\"" + (this.properties.page ? escape(this.properties.page) : 'page1.svg') + "\"\n      data-asvg-show=\"" + (this.properties.page ? escape(this.properties.page) : 'page1.svg') + "\"\n      data-asvg-filelocation=\"" + escape(this.properties.filelocation) + "\"\n      style=\"width:100%;\" >\n    </div>";
        this.asvg.updateElement(this.domElement.querySelector('[data-asvg]'));
    };
    Object.defineProperty(AsvgWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    AsvgWebPart.prototype.getPropertyPaneConfiguration = function () {
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
    };
    return AsvgWebPart;
}(BaseClientSideWebPart));
export default AsvgWebPart;
//# sourceMappingURL=AsvgWebPart.js.map