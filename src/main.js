import sketch from 'sketch';
import { Group } from 'sketch/dom';
import { coreColors, extendedColors } from './colors';
import createLayers from './layer';
import initUI from './ui';
import renderDocumentColors from './document-colors';

var document = sketch.getSelectedDocument();

const OPTIONS = {
    renderDocumentColors: true,
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
    const categorySwatches = extendedColors[category];

    Object.keys(categorySwatches).forEach(function(label) {
        const swatch = categorySwatches[label];
        const layerName = `_Extended/${toTitleCase(category)}/${swatch.codeName} - ${swatch.name}`;

        swatches.push(...createLayers(yOffset, xOffset, swatch, layerName));
        xOffset++;
        
        if (OPTIONS.renderDocumentColors) {
            renderDocumentColors(document, swatch);
        }
    });

    var categoryGroup = new Group({
        name: toTitleCase(category),
        layers: swatches,
    });

    categoryGroup.adjustToFit();
    return [categoryGroup];
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

        swatches.push(...createLayers(yOffset, -2, swatch, layerName));
        yOffset++;
    });

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
function syncSharedToLayer(sharedStyle, layer) {
    sharedStyle.style = layer.style;
    const layers = sharedStyle.getAllInstancesLayers();
    for (let layer of layers) layer.style.syncWithSharedStyle(sharedStyle);
}

/*
    Loop over all newly-created swatches and 
    create (or update) layer styles.
*/
function renderStyles(layers) {
    const layerStyles = document.sharedLayerStyles;

    layers.forEach(function(group) {
        // todo this nesting is not good?
        group.layers.forEach(function(layer) {
            const alreadyExistingStyle = getSharedStyleByName(layerStyles, layer.name);
            if (alreadyExistingStyle) {
                syncSharedToLayer(alreadyExistingStyle, layer);
                return;
            }
            layerStyles.push({
                name: layer.name,
                style: layer.style,
            });
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
    const allColorsAsLayers = [...generateExtendedColors(), ...generateCoreColors()];
    const generate = () => {
        renderLayers(allColorsAsLayers);
        renderStyles(allColorsAsLayers);
    };
    initUI({ onGenerate: generate });

    sketch.UI.message('All Done! 🎨');
}
