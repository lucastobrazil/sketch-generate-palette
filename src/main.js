import sketch from 'sketch';
import { ShapePath, Group } from 'sketch/dom';
import colors from './colors';

var document = sketch.getSelectedDocument();

const SPACE = 32;
const SWATCH_SIZE = 96;
const OFFSET = SWATCH_SIZE + SPACE;


function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function CreateBox(catIndex, swatchIndex, name, color) {
    return new ShapePath({
        name,
        frame: {
            width: 96,
            height: 96,
            x: OFFSET * swatchIndex,
            y: OFFSET * catIndex,
        },
        shapeType: 'Oval',
        style: {
            fills: [
                {
                    color: color,
                    fillType: 'Color',
                },
            ],
        },
        // locked: true,
    });
}

function createSwatchesFor(catIndex, category) {
    let output = [],
        swatchIndex = 0;
    const categorySwatches = colors[category];
    
    Object.keys(categorySwatches).forEach(function(label) {
        output.push(CreateBox(catIndex, swatchIndex, label, categorySwatches[label]));
        swatchIndex++;
    });

    var categoryGroup = new Group({
        name: toTitleCase(category),
        layers: output,
    });
    categoryGroup.adjustToFit();
    return [categoryGroup];
}

function generateColors() {
    const output = [];
    let catIndex = 0;

    // For each category, read and return an array of swatches
    Object.keys(colors).map(function(category) {
        output.push(...createSwatchesFor(catIndex, category));
        catIndex++;
    });

    return output;
}


function generateStyles() {
    const layers = document.pages[0].layers;

    layers.forEach(function(group) {
        group.layers.forEach(function(layer) {
            document.sharedLayerStyles.push({
                name: 'Fill/' + toTitleCase(group.name) + '/' + layer.name,
                style: layer.style,
            });
        });
    });
}

export default function() {
    // Render Swatches
    document.pages[0].layers.push(...generateColors());

    // Set layer styles
    generateStyles();

    sketch.UI.message('All Done! 🎨');
}
