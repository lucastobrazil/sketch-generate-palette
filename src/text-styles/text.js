import { Text } from 'sketch/dom';

export const textAlignments = [
    Text.Alignment.left,
    Text.Alignment.center,
    Text.Alignment.right,
    Text.Alignment.justify,
];

export function createTextLayer({ text, fontSize, fontFamily, xOffset = 0, yOffset = 0, alignment }) {
    return new Text({
        text,
        style: {
            textColor: '#cc0000',
            fontSize: fontSize,
            // todolineheights
            lineHeight: fontSize * 1.6,
            alignment,
            fontFamily: fontFamily,
        },
        frame: {
            width: 200,
            height: 42,
            x: xOffset,
            y: yOffset,
        },
    }).adjustToFit();
}
