import sketch from 'sketch';
import { Group } from 'sketch/dom';
import { coreColors, extendedColors } from './colors';
import { generateStyles, getSharedStyleByName, syncSharedToLayer } from './style';
import generateLayer from './layer';
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
    creates two Sketch Styles (Fill + Border)
*/
function createStylesForCategory(category) {
    let styles = [];
    const colors = extendedColors[category];

    Object.keys(colors).forEach(function(index) {
        const color = colors[index];
        const styleName = `_Extended/${toTitleCase(category)}/${color.codeName} - ${color.name}`;

        styles.push(...generateStyles(color, styleName));

        if (OPTIONS.renderDocumentColors) {
            renderDocumentColors(document, color);
        }
    });

    return styles;
}

/* 
    Used for creating the "Extended" theme colours
*/
function generateExtendedColors() {
    const output = [];

    // For each category, read and return an array of swatches
    Object.keys(extendedColors).map(function(category) {
        output.push(...createStylesForCategory(category));
    });

    return output;
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
function renderLayers() {
    const styles = document.sharedLayerStyles;
    const layers = [];
    console.log(styles);
    styles.map(function(sharedStyle, index) {
        // Border and Fill styles should share the same x value
        layers.push(generateLayer(sharedStyle, Math.floor(index/2), 0));
    });
    document.pages[0].layers.push(...layers);
}

export default function() {
    const allColors = [...generateExtendedColors(), ...generateCoreColors()];
    const generate = () => {
        renderSharedLayerStyles(allColors);
        renderLayers();
    };
    if (OPTIONS.initUI) {
        initUI({ onGenerate: generate });
    } else {
        generate();
    }

    sketch.UI.message('All Done! 🎨');
}
