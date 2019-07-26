import sketch from 'sketch';
import { Group } from 'sketch/dom';
import { coreColors, extendedColors } from './colors';
import { generateStyles, getSharedStyleByName, syncSharedToLayer } from './style';
import generateLayer from './layer';
import initUI from './ui';
import renderDocumentColors from './document-colors';

const document = sketch.getSelectedDocument();
const SHARED_LAYER_STYLES = document.sharedLayerStyles;

const OPTIONS = {
    use_GUI: false,
    renderDocumentColors: false,
};

const LAYERS_TO_RENDER = [];

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function createGroupForLayers(category, styles, yOffset) {
    let layers = [];
    styles.forEach((style, index) => {
        // Each style contains two styles (border + fill)
        const xOffset = (index % 2 === 0 ? index : index - 1) / 2;
        layers.push(generateLayer(style, getSharedStyleByName(SHARED_LAYER_STYLES, style.name).id, yOffset, xOffset));
    });

    const categoryGroup = new Group({
        name: toTitleCase(category),
        layers: layers,
    });
    categoryGroup.adjustToFit();
    return LAYERS_TO_RENDER.push(categoryGroup);
}

/* 
    Takes a group of swatches for each category and
    creates two Sketch Styles (Fill + Border)
*/
function createStylesForCategory(category, index) {
    let styles = [];
    const colors = extendedColors[category];

    Object.keys(colors).forEach(index => {
        const color = colors[index];
        const styleName = `_Extended/${toTitleCase(category)}/${color.codeName} - ${color.name}`;
        const generatedStyles = generateStyles(color, styleName);

        styles.push(...generatedStyles);

        if (OPTIONS.renderDocumentColors) {
            renderDocumentColors(document, color);
        }
    });
    // createGroupForLayers(category, styles, index);

    return styles;
}

/* 
    Used for creating the "Extended" theme colours
*/
function generateExtendedColors() {
    // For each category, read and return an array of swatches
    Object.keys(extendedColors).map((category, index) => {
        const colorsAsStyles = createStylesForCategory(category, index);
        renderSharedLayerStyles(colorsAsStyles);
        createGroupForLayers(category, colorsAsStyles, index)
    });
}

/* 
    Used for creating the "Core" theme colours
    eg. Primary, Secondary, Success etc
*/
function generateCoreColors() {
    const swatches = [];

    Object.keys(coreColors).map(function(name) {
        const color = coreColors[name];
        swatches.push(...generateStyles(color, toTitleCase(name)));
    });

    return swatches;
}

/*
    Loop over all newly-created swatches and 
    create (or update) layer styles.
*/
function renderSharedLayerStyles(colorsAsStyles) {

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



export default function() {
    const allColors = [...generateCoreColors()];
    const generate = () => {
        // renderSharedLayerStyles(allColors);
        generateExtendedColors()
        document.pages[0].layers.push(...LAYERS_TO_RENDER);
    };
    if (OPTIONS.initUI) {
        initUI({ onGenerate: generate });
    } else {
        generate();
    }

    sketch.UI.message('All Done! 🎨');
}
