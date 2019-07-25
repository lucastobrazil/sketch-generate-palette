import sketch from 'sketch';
import { Group } from 'sketch/dom';
import { coreColors, extendedColors } from './colors';
import generateStyles from './layer';
import initUI from './ui';
import renderDocumentColors from './document-colors';

var document = sketch.getSelectedDocument();

const OPTIONS = {
    use_GUI: false,
    renderDocumentColors: false,
};

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

/* 
    Takes a group of swatches for each category and
    creates two Sketch ShapePath's (Fill + Border)

    It then renders a group of layers for each swatch
    in the category
*/
function createSwatchesForCategory(yOffset, category) {
    let swatches = [],
        xOffset = 0;
    const swatchesForCategory = extendedColors[category];

    Object.keys(swatchesForCategory).forEach(function(label) {
        const swatch = swatchesForCategory[label];
        const layerName = `_Extended/${toTitleCase(category)}/${swatch.codeName} - ${swatch.name}`;

        swatches.push(...generateStyles(yOffset, xOffset, swatch, layerName));
        xOffset++;

        if (OPTIONS.renderDocumentColors) {
            renderDocumentColors(document, swatch);
        }
    });

    return swatches;

    // var categoryGroup = new Group({
    //     name: toTitleCase(category),
    //     layers: swatches,
    // });

    // categoryGroup.adjustToFit();
    // return [categoryGroup];
}

/* 
    Used for creating the "Extended" theme colours
*/
function generateExtendedColors() {
    const output = [];
    let yOffset = 0;

    // For each category, read and return an array of swatches
    Object.keys(extendedColors).map(function(category) {
        output.push(...createSwatchesForCategory(yOffset, category));
        yOffset++;
    });

    return output;
}

/* 
    Used for creating the "Core" theme colours
    eg. Primary, Secondary, Success etc
*/
function generateCoreColors() {
    const swatches = [];
    let yOffset = 0;

    Object.keys(coreColors).map(function(color) {
        const swatch = coreColors[color];
        const layerName = `${toTitleCase(color)}`;

        swatches.push(...generateStyles(yOffset, -2, swatch, layerName));
        yOffset++;
    });

    return swatches;

    var categoryGroup = new Group({
        name: 'Core',
        layers: swatches,
    });
    categoryGroup.adjustToFit();
    return [categoryGroup];
}

/* 
    Figure out if we are trying to create a shared style
    that already exists.
*/
function getSharedStyleByName(sharedStyles, name) {
    if (!sharedStyles) return;
    return sharedStyles.filter(style => style.name === name)[0];
}

/*
    For Styles that already exist in the library,
    overwrite the existing layer style (keeps id intact),
    and sync all layers that have that shared style.
*/
function syncSharedToLayer(alreadyExistingStyle, newColor) {
    alreadyExistingStyle.style = newColor.style;
    const layers = alreadyExistingStyle.getAllInstancesLayers();
    for (let layer of layers) layer.style.syncWithSharedStyle(alreadyExistingStyle);
}

/*
    Loop over all newly-created swatches and 
    create (or update) layer styles.
*/
function renderSharedLayerStyles(colorsAsStyles) {
    const sharedLayerStyles = document.sharedLayerStyles;

    colorsAsStyles.forEach(function(color) {
        const alreadyExistingStyle = getSharedStyleByName(sharedLayerStyles, color.name);
        if (alreadyExistingStyle) {
            syncSharedToLayer(alreadyExistingStyle, color);
            return;
        }
        sharedLayerStyles.push({
            name: color.name,
            style: color.style,
        });
    });
}

/*
    Render layers on page
*/
function renderLayers(layers) {
    document.pages[0].layers.push(...layers);
}

export default function() {
    const allColors = [
        ...generateExtendedColors(), 
        ...generateCoreColors()
    ];
    const generate = () => {
        // renderLayers(allColors);
        renderSharedLayerStyles(allColors);
    };
    if (OPTIONS.initUI) {
        initUI({ onGenerate: generate });
    } else {
        generate();
    }

    sketch.UI.message('All Done! 🎨');
}
