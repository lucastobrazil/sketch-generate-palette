import sketch from 'sketch';
import { Group } from 'sketch/dom';

/* data input */
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

function createLayersFromStyles(styles, yOffset) {
    let layers = [];
    styles.forEach((style, index) => {
        // Each style contains two styles (border + fill)
        const xOffset = (index % 2 === 0 ? index : index - 1) / 2;
        const styleId = getSharedStyleByName(SHARED_LAYER_STYLES, style.name).id;

        layers.push(createLayer(style, styleId, yOffset, xOffset));
    });

    return layers;
}

function createGroupForLayers(groupName, layers) {
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

        const colorsAsLayers = createLayersFromStyles(colorsAsStyles, index);
        const layersAsGroup = createGroupForLayers(category, colorsAsLayers);
        LAYERS_TO_RENDER.push(layersAsGroup);
    });
}

/* 
    Used for creating the "Core" theme colours
    eg. Primary, Secondary, Success etc
*/
function createCoreColors() {
    const colorStyles = [];

    Object.keys(coreColors).forEach(name => {
        const color = coreColors[name];
        
        /* FIXME: This toTitleCase stuff is not good, consider changing the original data */
        const colorAsStyles = createStyles(color, toTitleCase(name));
        colorStyles.push(...colorAsStyles);
    });

    createSharedLayerStyles(colorStyles);

    // const colorsAsLayers = createLayersFromStyles(colorStyles, -2);
    // const layersAsGroup = createGroupForLayers('Core', colorsAsLayers);

    // LAYERS_TO_RENDER.push(layersAsGroup);
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


const createColors = () => {
    // createExtendedColors();
    createCoreColors();
};

const renderLayers = () => {
    document.pages[0].layers.push(...LAYERS_TO_RENDER);
};

const create = () => {
    createColors();
    renderLayers();
};
export default function() {
    if (OPTIONS.use_GUI) {
        initUI({ onGenerate: create });
    } else {
        create();
    }

    sketch.UI.message('All Done! 🎨');
}
