import { ShapePath } from 'sketch/dom';
import { getSharedStyleByName } from './style';
import CONFIG from '../config';


const { SWATCH_SPACING, SWATCH_SIZE } = CONFIG;

function _getShapeProperties({ yOffset, xOffset }) {
    return {
        frame: {
            width: SWATCH_SIZE,
            height: SWATCH_SIZE,
            x: SWATCH_SPACING * xOffset,
            y: SWATCH_SPACING * yOffset,
        },
        shapeType: 'Rectangle',
    };
}

function _createLayer(sharedStyle, sharedStyleId, yOffset, xOffset) {
    return new ShapePath({
        ..._getShapeProperties({ yOffset, xOffset }),
        name: sharedStyle.name,
        style: sharedStyle.style,
        sharedStyleId: sharedStyleId,
    });
}

export default function createLayers(styles, yOffset, sharedLayerStyles) {
    let layers = [];
    styles.forEach((style, index) => {
        // Each style contains two styles (border + fill)
        const xOffset = (index % 2 === 0 ? index : index - 1) / 2;
        const styleId = getSharedStyleByName(sharedLayerStyles, style.name).id;

        layers.push(_createLayer(style, styleId, yOffset, xOffset));
    });

    return layers;
}
