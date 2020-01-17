import sketch from 'sketch';
import CONFIG from './_config';
import createGroup from './group';
import createLayers from './layer';
import initUI from './ui';
import createSharedLayerStyles from './shared-style';
import { coreColors, extendedColors } from './_data';
import { createStyles, createStylesForCategory } from './style';
import { toTitleCase } from './_util';

const document = sketch.getSelectedDocument();

const SHARED_LAYER_STYLES = document.sharedLayerStyles;

/* 
    Used for creating the "Extended" theme colours
*/
function createExtendedColors() {
    const layers = [];
    // For each category, read and return an array of colors
    Object.keys(extendedColors).forEach((category, index) => {
        const colorsAsStyles = createStylesForCategory(category, index);

        SHARED_LAYER_STYLES.push(...createSharedLayerStyles(colorsAsStyles, SHARED_LAYER_STYLES));

        const colorLayers = createLayers(colorsAsStyles, index, SHARED_LAYER_STYLES);
        const layerGroups = createGroup(category, colorLayers);

        layers.push(layerGroups);
    });

    return layers;
}

/* 
    Used for creating the "Core" theme colour styles
    eg. Primary, Secondary, Success etc
*/
function createCoreColors() {
    const _coreStyles = [];

    /* Loop over design tokens for each color */
    Object.keys(coreColors).forEach(name => {
        const color = coreColors[name];
        const colorAsStyles = createStyles(color, toTitleCase(name));
        _coreStyles.push(...colorAsStyles);
    });

    SHARED_LAYER_STYLES.push(...createSharedLayerStyles(_coreStyles, SHARED_LAYER_STYLES));

    const colorLayers = createLayers(_coreStyles, -2, SHARED_LAYER_STYLES);
    const layerGroups = createGroup('Core', colorLayers);

    return [layerGroups];
}

function start() {
    document.pages[0].layers.push(...createExtendedColors(), ...createCoreColors());
}

export default function() {
    if (CONFIG.USE_GUI) {
        initUI({ onGenerate: start });
    } else {
        start();
    }

    sketch.UI.message('All Done! 🎨');
}
