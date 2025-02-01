"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DPI = exports.PageOrientation = exports.Size = exports.Unit = exports.Format = void 0;
const jsPDF = require("jspdf");
const file_saver_1 = require("file-saver");
const mapbox_gl_1 = require("mapbox-gl");
const fabric_1 = require("fabric");
exports.Format = {
    JPEG: "jpg",
    PNG: "png",
    PDF: "pdf",
    SVG: "svg",
};
exports.Unit = {
    in: "in",
    mm: "mm",
};
exports.Size = {
    A2: [594, 420],
    A3: [420, 297],
    A4: [297, 210],
    A5: [210, 148],
    A6: [148, 105],
    B2: [707, 500],
    B3: [500, 353],
    B4: [353, 250],
    B5: [250, 176],
    B6: [176, 125],
};
exports.PageOrientation = {
    Landscape: "landscape",
    Portrait: "portrait",
};
exports.DPI = {
    "72": 72,
    "96": 96,
    "200": 200,
    "300": 300,
    "400": 400,
};
class MapGenerator {
    constructor(map, size = exports.Size.A4, dpi = 300, format = exports.Format.PNG.toString(), unit = exports.Unit.mm) {
        this.map = map;
        this.width = size[0];
        this.height = size[1];
        this.dpi = dpi;
        this.format = format;
        this.unit = unit;
    }
    generate() {
        const this_ = this;
        var actualPixelRatio = window.devicePixelRatio;
        Object.defineProperty(window, "devicePixelRatio", {
            get: function () {
                return this_.dpi / 96;
            },
        });
        var hidden = document.createElement("div");
        hidden.className = "hidden-map";
        document.body.appendChild(hidden);
        var container = document.createElement("div");
        container.style.width = this.toPixels(this.width);
        container.style.height = this.toPixels(this.height);
        hidden.appendChild(container);
        var renderMap = new mapbox_gl_1.Map({
            accessToken: mapbox_gl_1.accessToken,
            container: container,
            center: this.map.getCenter(),
            zoom: this.map.getZoom(),
            bearing: this.map.getBearing(),
            pitch: this.map.getPitch(),
            interactive: false,
            preserveDrawingBuffer: true,
            fadeDuration: 0,
            attributionControl: false,
            transformRequest: this.map._requestManager._transformRequestFn,
        });
        let style = this.map.getStyle();
        for (let name in style.sources) {
            let src = style.sources[name];
            Object.keys(src).forEach((key) => {
                if (!src[key]) {
                    delete src[key];
                }
            });
        }
        renderMap.setStyle(style);
        renderMap.once("idle", function () {
            var _a;
            const canvas = renderMap.getCanvas();
            const fileName = `map.${this_.format}`;
            switch (this_.format) {
                case exports.Format.PNG:
                    this_.toPNG(canvas, fileName);
                    break;
                case exports.Format.JPEG:
                    this_.toJPEG(canvas, fileName);
                    break;
                case exports.Format.PDF:
                    this_.toPDF(renderMap, fileName);
                    break;
                case exports.Format.SVG:
                    this_.toSVG(canvas, fileName);
                    break;
                default:
                    alert(`Invalid file format: ${this_.format}`);
                    break;
            }
            renderMap.remove();
            (_a = hidden.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(hidden);
            Object.defineProperty(window, "devicePixelRatio", {
                get: function () {
                    return actualPixelRatio;
                },
            });
        });
    }
    toPNG(canvas, fileName) {
        canvas.toBlob(function (blob) {
            file_saver_1.saveAs(blob, fileName);
        });
    }
    toJPEG(canvas, fileName) {
        const uri = canvas.toDataURL("image/jpeg", 0.85);
        if (canvas.msToBlob) {
            var blob = this.toBlob(uri);
            window.navigator.msSaveBlob(blob, fileName);
        }
        else {
            const a = document.createElement("a");
            a.href = uri;
            a.download = fileName;
            a.click();
            a.remove();
        }
    }
    toPDF(map, fileName) {
        const canvas = map.getCanvas();
        var pdf = new jsPDF({
            orientation: this.width > this.height ? "l" : "p",
            unit: this.unit,
            compress: true,
        });
        pdf.addImage(canvas.toDataURL("image/png"), "png", 0, 0, this.width, this.height, null, "FAST");
        var { lng, lat } = map.getCenter();
        pdf.setProperties({
            title: map.getStyle().name,
            subject: `center: [${lng}, ${lat}], zoom: ${map.getZoom()}`,
            creator: "Mapbox GL Export Plugin",
            author: "(c)Mapbox, (c)OpenStreetMap",
        });
        pdf.save(fileName);
    }
    toSVG(canvas, fileName) {
        const uri = canvas.toDataURL("image/png");
        fabric_1.fabric.Image.fromURL(uri, (image) => {
            const canvas = new fabric_1.fabric.Canvas("canvas");
            const px_width = Number(this.toPixels(this.width, this.dpi).replace("px", ""));
            const px_height = Number(this.toPixels(this.height, this.dpi).replace("px", ""));
            image.scaleToWidth(px_width);
            image.scaleToHeight(px_height);
            canvas.add(image);
            const svg = canvas.toSVG({
                x: 0,
                y: 0,
                width: px_width,
                height: px_height,
                viewBox: {
                    x: 0,
                    y: 0,
                    width: px_width,
                    height: px_height,
                },
            });
            const a = document.createElement("a");
            a.href = "data:application/xml," + encodeURIComponent(svg);
            a.download = fileName;
            a.click();
            a.remove();
        });
    }
    toPixels(length, conversionFactor = 96) {
        if (this.unit == exports.Unit.mm) {
            conversionFactor /= 25.4;
        }
        return conversionFactor * length + "px";
    }
    toBlob(base64) {
        const bin = atob(base64.replace(/^.*,/, ""));
        let buffer = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) {
            buffer[i] = bin.charCodeAt(i);
        }
        const blob = new Blob([buffer.buffer], { type: "image/png" });
        return blob;
    }
}
exports.default = MapGenerator;
//# sourceMappingURL=map-generator.js.map