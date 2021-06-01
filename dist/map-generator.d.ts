import { Map as MapboxMap } from "mapbox-gl";
export declare const Format: {
    readonly JPEG: "jpg";
    readonly PNG: "png";
    readonly PDF: "pdf";
    readonly SVG: "svg";
};
export declare const Unit: {
    readonly in: "in";
    readonly mm: "mm";
};
declare type Unit = typeof Unit[keyof typeof Unit];
export declare const Size: {
    readonly A2: readonly [594, 420];
    readonly A3: readonly [420, 297];
    readonly A4: readonly [297, 210];
    readonly A5: readonly [210, 148];
    readonly A6: readonly [148, 105];
    readonly B2: readonly [707, 500];
    readonly B3: readonly [500, 353];
    readonly B4: readonly [353, 250];
    readonly B5: readonly [250, 176];
    readonly B6: readonly [176, 125];
};
declare type Size = typeof Size[keyof typeof Size];
export declare const PageOrientation: {
    readonly Landscape: "landscape";
    readonly Portrait: "portrait";
};
export declare const DPI: {
    readonly 72: 72;
    readonly 96: 96;
    readonly 200: 200;
    readonly 300: 300;
    readonly 400: 400;
};
export default class MapGenerator {
    private map;
    private width;
    private height;
    private dpi;
    private format;
    private unit;
    constructor(map: MapboxMap, size?: Size, dpi?: number, format?: string, unit?: Unit);
    generate(): void;
    private toPNG;
    private toJPEG;
    private toPDF;
    private toSVG;
    private toPixels;
    private toBlob;
}
export {};
