import { Text } from 'sketch/dom';

export const textAlignments = [
    Text.Alignment.left,
    Text.Alignment.center,
    Text.Alignment.right,
    Text.Alignment.justify,
];
// https://developer.sketch.com/reference/api/#style
export const fontWeightsLookup = { normal: 4, bold: 8 };

export function createTextLayer({
    text,
    color = '#ffffff',
    fontSize = 12,
    fontFamily = 'Arial',
    x = 0,
    y = 0,
    alignment = Text.Alignment.left,
    fontWeight = 0,
    lineHeight = null,
}) {
    return new Text({
        text,
        style: {
            textColor: color,
            fontSize: fontSize,
            // todolineheights
            lineHeight,
            alignment,
            fontFamily: fontFamily,
            fontWeight: fontWeightsLookup[fontWeight],
        },
        frame: {
            width: 200,
            height: 42,
            x,
            y,
        },
    }).adjustToFit();
}
