import { Style } from 'sketch/dom';

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

function generateStyles(yOffset, xOffset, { hex }, layerName) {
    const layers = [];
    layers.push(
        {
            name: `Border/${layerName}`,
            style: new Style({
                borders: [
                    {
                        thickness: 1,
                        color: `#${hex}`,
                        fillType: 'Color',
                    },
                ],
            }),
        },
        {
            name: `Fill/${layerName}`,
            style: new Style({
                fills: [
                    {
                        color: `#${hex}`,
                        fillType: 'Color',
                    },
                ],
            }),
        }
    );
    // layers.push(
    //     new ShapePath({
    //         ...getShapeProperties({ yOffset, xOffset }),
    //         name: `Border/${layerName}`,
    //         style: {
    //             borders: [
    //                 {
    //                     thickness: 1,
    //                     color: `#${hex}`,
    //                     fillType: 'Color',
    //                 },
    //             ],
    //         },
    //     })
    // );

    // layers.push(
    //     new ShapePath({
    //         ...getShapeProperties({ yOffset, xOffset }),
    //         name: `Fill/${layerName}`,
    //         style: {
    //             fills: [
    //                 {
    //                     color: `#${hex}`,
    //                     fillType: 'Color',
    //                 },
    //             ],
    //         },
    //     })
    // );

    return layers;
}

export default generateStyles;
