import { Map as MapboxMap } from "mapbox-gl";
export declare const Format: {
    readonly JPEG: "jpg";
    readonly PNG: "png";
    readonly PDF: "pdf";
    readonly SVG: "svg";
};
export declare type Format = (typeof Format)[keyof typeof Format];
export declare const Unit: {
    readonly in: "in";
    readonly mm: "mm";
};
export declare type Unit = (typeof Unit)[keyof typeof Unit];
export declare const Size: Record<SizeKeys, [number, number]>;
export declare enum SizeKeys {
    A2 = "A2",
    A3 = "A3",
    A4 = "A4",
    A5 = "A5",
    A6 = "A6",
    B2 = "B2",
    B3 = "B3",
    B4 = "B4",
    B5 = "B5",
    B6 = "B6"
}
export declare type Size = Record<SizeKeys, [number, number]>;
export declare const PageOrientation: PageOrientation;
export declare enum PageOrientationKeys {
    Landscape = "Landscape",
    Portrait = "Portrait"
}
export declare type PageOrientation = Record<PageOrientationKeys, "landscape" | "portrait">;
export declare const DPI: {
    "72": number;
    "96": number;
    "200": number;
    "300": number;
    "400": number;
};
export declare type DPI = Record<string, number>;
export default class MapGenerator {
    private map;
    private width;
    private height;
    private dpi;
    private format;
    private unit;
    constructor(map: MapboxMap, size?: [number, number], dpi?: number, format?: string, unit?: Unit);
    generate(): void;
    private toPNG;
    private toJPEG;
    private toPDF;
    private toSVG;
    private toPixels;
    private toBlob;
}
