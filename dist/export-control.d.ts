import { IControl, Map as MapboxMap } from "mapbox-gl";
declare type Options = {
    PageSize: any;
    PageOrientation: string;
    Format: string;
    DPI: number;
};
export default class MapboxExportControl implements IControl {
    private controlContainer;
    private exportContainer;
    private map?;
    private exportButton;
    private options;
    constructor(options: Options);
    getDefaultPosition(): string;
    onAdd(map: MapboxMap): HTMLElement;
    private createSelection;
    onRemove(): void;
    private onDocumentClick;
}
export {};
