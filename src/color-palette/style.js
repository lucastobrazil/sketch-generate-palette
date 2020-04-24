import { Style } from 'sketch/dom';
import { ColorPalette } from '@adapt-design-system/tokens';
import renderDocumentColors from './document';
import CONFIG from '../config';
import { toTitleCase } from './_util';

function _createBorderStyle(hex) {
    return new Style({
        borders: [
            {
                thickness: 1,
                color: `#${hex}`,
                fillType: 'Color',
            },
        ],
    });
}

function _createFillStyle(hex) {
    return new Style({
        fills: [
            {
                color: `#${hex}`,
                fillType: 'Color',
            },
        ],
    });
}

/* 
    Figure out if we are trying to create a shared style
    that already exists.
*/
function getSharedStyleByName(sharedStyles, name) {
    if (!sharedStyles) return;
    return sharedStyles.filter((style) => style.name === name)[0];
}

function createStyles({ hex }, layerName) {
    return [
        {
            name: `Border/${layerName}`,
            style: _createBorderStyle(hex),
        },
        {
            name: `Fill/${layerName}`,
            style: _createFillStyle(hex),
        },
    ];
}

/* 
    Takes a group of swatches for each category and
    creates two Sketch Styles (Fill + Border)
*/
function createStylesForCategory(category) {
    const styles = [];
    const colors = ColorPalette[category];

    Object.keys(colors).forEach((index) => {
        const color = colors[index];
        const styleName = `_Extended/${toTitleCase(category)}/${color.codeName} - ${color.name}`;
        const generatedStyles = createStyles(color, styleName);

        styles.push(...generatedStyles);

        if (CONFIG.RENDER_TO_COLOR_PICKER) {
            renderDocumentColors(color);
        }
    });
    return styles;
}

export { createStyles, getSharedStyleByName, createStylesForCategory };
