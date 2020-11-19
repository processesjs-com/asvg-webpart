import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import ASVG from 'advance-svg';
export interface IAsvgWebPartProps {
    page: string;
    filelocation: string;
}
export default class AsvgWebPart extends BaseClientSideWebPart<IAsvgWebPartProps> {
    asvg: ASVG;
    userErrorHandler: Function;
    constructor();
    render(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=AsvgWebPart.d.ts.map