import { ShapePath } from 'sketch/dom';

const SPACE = 32;
const SWATCH_SIZE = 96;
const SWATCH_SPACING = SWATCH_SIZE + SPACE;

function getShapeProperties({ yOffset, xOffset }) {
    return {
        frame: {
            width: 96,
            height: 96,
            x: SWATCH_SPACING * xOffset,
            y: SWATCH_SPACING * yOffset,
        },
        shapeType: 'Oval',
    };
}

function generateLayer(sharedStyle, sharedStyleId, yOffset, xOffset) {
    return new ShapePath({
        ...getShapeProperties({ yOffset, xOffset }),
        name: sharedStyle.name,
        style: sharedStyle.style,
        sharedStyleId: sharedStyleId
    });
}

export default generateLayer;
