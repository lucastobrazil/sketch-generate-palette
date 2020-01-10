import sketch from 'sketch';
import { Group } from 'sketch/dom';
import { coreColors, extendedColors } from './color_tokens';
import { createStyles, getSharedStyleByName, syncSharedToLayer } from './components/style';
import createLayer from './components/layer';
import initUI from './components/ui';
import renderDocumentColors from './components/document-colors';
import { toTitleCase } from './components/util';
import OPTIONS from './config';

const document = sketch.getSelectedDocument();

const SHARED_LAYER_STYLES = document.sharedLayerStyles;
const LAYERS_TO_RENDER = [];

function createLayers(styles, yOffset) {
    let layers = [];
    styles.forEach((style, index) => {
        // Each style contains two styles (border + fill)
        const xOffset = (index % 2 === 0 ? index : index - 1) / 2;
        const styleId = getSharedStyleByName(SHARED_LAYER_STYLES, style.name).id;

        layers.push(createLayer(style, styleId, yOffset, xOffset));
    });

    return layers;
}

function createGroup(groupName, layers) {
    const group = new Group({
        name: toTitleCase(groupName),
        layers: layers,
    });
    group.adjustToFit();
    return group;
}

/* 
    Takes a group of swatches for each category and
    creates two Sketch Styles (Fill + Border)
*/
function createStylesForCategory(category) {
    const styles = [];
    const colors = extendedColors[category];

    Object.keys(colors).forEach(index => {
        const color = colors[index];
        const styleName = `_Extended/${toTitleCase(category)}/${color.codeName} - ${color.name}`;
        const generatedStyles = createStyles(color, styleName);

        styles.push(...generatedStyles);

        if (OPTIONS.renderDocumentColors) {
            renderDocumentColors(document, color);
        }
    });
    return styles;
}

/* 
    Used for creating the "Extended" theme colours
*/
function createExtendedColors() {
    // For each category, read and return an array of swatches
    Object.keys(extendedColors).forEach((category, index) => {
        const colorsAsStyles = createStylesForCategory(category, index);

        createSharedLayerStyles(colorsAsStyles);

        const colorLayers = createLayers(colorsAsStyles, index);
        const layerGroups = createGroup(category, colorLayers);
        LAYERS_TO_RENDER.push(layerGroups);
    });
}

/* 
    Used for creating the "Core" theme colour styles
    eg. Primary, Secondary, Success etc
*/
function createCoreStyles() {
    const coreStyles = [];

    /* Loop over design tokens for each color */
    Object.keys(coreColors).forEach(name => {
        const color = coreColors[name];
        const colorAsStyles = createStyles(color, toTitleCase(name));
        coreStyles.push(...colorAsStyles);
    });

    createSharedLayerStyles(coreStyles);

    const colorLayers = createLayers(coreStyles, -2);
    const layerGroups = createGroup('Core', colorLayers);

    LAYERS_TO_RENDER.push(layerGroups);
}

/*
    Loop over all newly-created swatches and 
    create (or update) layer styles.
*/
function createSharedLayerStyles(colorsAsStyles) {
    colorsAsStyles.forEach(function(color) {
        const alreadyExistingStyle = getSharedStyleByName(SHARED_LAYER_STYLES, color.name);
        if (alreadyExistingStyle) {
            syncSharedToLayer(alreadyExistingStyle, color);
            return;
        }
        SHARED_LAYER_STYLES.push({
            name: color.name,
            style: color.style,
        });
    });
}
const renderLayers = () => {
    document.pages[0].layers.push(...LAYERS_TO_RENDER);
};

const generate = () => {
    createExtendedColors();
    createCoreStyles();
    renderLayers();
};
export default function() {
    if (OPTIONS.use_GUI) {
        initUI({ onGenerate: generate });
    } else {
        generate();
    }

    sketch.UI.message('All Done! 🎨');
}

/*
    Run
    Create Colors
        Extened/Core
            Loop over tokens
                Generate layer style for each token
                    Border
                    Fill
            Create shared layer styles
                Loop over each color's style
                    Check if exists
                        sync, or
                        push new one
                


*/