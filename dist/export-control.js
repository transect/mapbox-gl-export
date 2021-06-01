"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const map_generator_1 = require("./map-generator");
class MapboxExportControl {
    constructor(options) {
        this.options = {
            PageSize: map_generator_1.Size.A4,
            PageOrientation: map_generator_1.PageOrientation.Landscape,
            Format: map_generator_1.Format.PDF,
            DPI: map_generator_1.DPI[300],
        };
        if (options) {
            this.options = Object.assign(this.options, options);
        }
        this.onDocumentClick = this.onDocumentClick.bind(this);
    }
    getDefaultPosition() {
        const defaultPosition = "top-right";
        return defaultPosition;
    }
    onAdd(map) {
        this.map = map;
        this.controlContainer = document.createElement("div");
        this.controlContainer.classList.add("mapboxgl-ctrl");
        this.controlContainer.classList.add("mapboxgl-ctrl-group");
        this.exportContainer = document.createElement("div");
        this.exportContainer.classList.add("mapboxgl-export-list");
        this.exportButton = document.createElement("button");
        this.exportButton.classList.add("mapboxgl-ctrl-icon");
        this.exportButton.classList.add("mapboxgl-export-control");
        this.exportButton.addEventListener("click", () => {
            if (this.exportContainer.style.display === "block") {
                this.exportContainer.style.display = "none";
            }
            else {
                this.exportContainer.style.display = "block";
            }
        });
        document.addEventListener("click", this.onDocumentClick);
        this.controlContainer.appendChild(this.exportButton);
        this.controlContainer.appendChild(this.exportContainer);
        var table = document.createElement('TABLE');
        table.className = 'print-table';
        const tr1 = this.createSelection(map_generator_1.Size, 'Page Size', 'page-size', this.options.PageSize, (data, key) => {
            return JSON.stringify(data[key]);
        });
        table.appendChild(tr1);
        const tr2 = this.createSelection(map_generator_1.PageOrientation, 'Page Orientation', 'page-orientaiton', this.options.PageOrientation, (data, key) => {
            return data[key];
        });
        table.appendChild(tr2);
        const tr3 = this.createSelection(map_generator_1.Format, 'Format', 'format-type', this.options.Format, (data, key) => {
            return data[key];
        });
        table.appendChild(tr3);
        const tr4 = this.createSelection(map_generator_1.DPI, 'DPI', 'dpi-type', this.options.DPI, (data, key) => {
            return data[key];
        });
        table.appendChild(tr4);
        this.exportContainer.appendChild(table);
        const generateButton = document.createElement("button");
        generateButton.textContent = 'Generate';
        generateButton.classList.add('generate-button');
        generateButton.addEventListener("click", () => {
            const pageSize = document.getElementById(`mapbox-gl-export-page-size`);
            const pageOrientation = document.getElementById(`mapbox-gl-export-page-orientaiton`);
            const formatType = document.getElementById(`mapbox-gl-export-format-type`);
            const dpiType = document.getElementById(`mapbox-gl-export-dpi-type`);
            const orient_value = pageOrientation.value;
            let pageSize_value = JSON.parse(pageSize.value);
            if (orient_value === map_generator_1.PageOrientation.Portrait) {
                pageSize_value = pageSize_value.reverse();
            }
            const mapGenerator = new map_generator_1.default(map, pageSize_value, Number(dpiType.value), formatType.value, map_generator_1.Unit.mm);
            mapGenerator.generate();
        });
        this.exportContainer.appendChild(generateButton);
        return this.controlContainer;
    }
    createSelection(data, title, type, defaultValue, converter) {
        let label = document.createElement('label');
        label.textContent = title;
        const content = document.createElement("select");
        content.setAttribute("id", `mapbox-gl-export-${type}`);
        content.style.width = "100%";
        Object.keys(data).forEach(key => {
            const option_layout = document.createElement('option');
            option_layout.setAttribute("value", converter(data, key));
            option_layout.appendChild(document.createTextNode(key));
            option_layout.setAttribute("name", type);
            if (defaultValue === data[key]) {
                option_layout.selected = true;
            }
            content.appendChild(option_layout);
        });
        var tr1 = document.createElement('TR');
        var td1_1 = document.createElement('TD');
        var td1_2 = document.createElement('TD');
        td1_1.appendChild(label);
        td1_2.appendChild(content);
        tr1.appendChild(td1_1);
        tr1.appendChild(td1_2);
        return tr1;
    }
    onRemove() {
        if (!this.controlContainer || !this.controlContainer.parentNode || !this.map || !this.exportButton) {
            return;
        }
        this.exportButton.removeEventListener("click", this.onDocumentClick);
        this.controlContainer.parentNode.removeChild(this.controlContainer);
        document.removeEventListener("click", this.onDocumentClick);
        this.map = undefined;
    }
    onDocumentClick(event) {
        if (this.controlContainer && !this.controlContainer.contains(event.target) && this.exportContainer && this.exportButton) {
            this.exportContainer.style.display = "none";
            this.exportButton.style.display = "block";
        }
    }
}
exports.default = MapboxExportControl;
//# sourceMappingURL=export-control.js.map