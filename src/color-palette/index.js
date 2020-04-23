import sketch from 'sketch';
import CONFIG from './_config';
import createGroup from './group';
import createLayers from './layer';
import initUI from './ui';
import createSharedLayerStyles from './shared-style';
import { ThemeColors, ColorPalette } from '@adapt-design-system/tokens';
import { createStyles, createStylesForCategory } from './style';
import { toTitleCase } from './_util';
import { createPageWithName } from './page';
import { addSupportText } from './text';
const document = sketch.getSelectedDocument();

const SHARED_LAYER_STYLES = document.sharedLayerStyles;

/* 
    Used for creating the "Extended" theme colours
*/
function createExtendedColors() {
    const layers = [];
    // For each category, read and return an array of colors
    Object.keys(ColorPalette).forEach((category, index) => {
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
    Object.keys(ThemeColors).forEach((name) => {
        const color = ThemeColors[name];
        const colorAsStyles = createStyles(color, toTitleCase(name));
        _coreStyles.push(...colorAsStyles);
    });

    SHARED_LAYER_STYLES.push(...createSharedLayerStyles(_coreStyles, SHARED_LAYER_STYLES));

    const colorLayers = createLayers(_coreStyles, -2, SHARED_LAYER_STYLES);
    const layerGroups = createGroup('Core', colorLayers);

    return [layerGroups];
}

function getColorsPage(document) {
    return document.pages.find((page) => page.name === CONFIG.COLORS_PAGE_NAME);
}

function getTextVerticalOffset(factor) {
    return factor * CONFIG.SWATCH_SPACING;
}

function start() {
    let COLORS_PAGE = getColorsPage(document);
    if (!COLORS_PAGE) {
        createPageWithName(document, CONFIG.COLORS_PAGE_NAME);
        COLORS_PAGE = getColorsPage(document);
    }
    // Erase all other layers on the page.
    COLORS_PAGE.layers = [];
    COLORS_PAGE.layers.push(
        addSupportText('These swatches have been automatically generated.', getTextVerticalOffset(-4)),
        addSupportText('To edit, update both the fill and border styles, then click .', getTextVerticalOffset(-3)),
        addSupportText('Extended', getTextVerticalOffset(-2)),
        ...createExtendedColors(),
        addSupportText('Core'),
        ...createCoreColors()
    );
    sketch.UI.message('Color Palette Generated! 🎨');
}

export default function () {
    if (CONFIG.USE_GUI) {
        initUI({ onGenerate: start, document, destinationPage: CONFIG.COLORS_PAGE_NAME });
    } else {
        start();
    }
}
