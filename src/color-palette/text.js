import { Text } from 'sketch/dom';

function addSupportText(text = 'foo', yOffset = 0) {
    return new Text({
        text,
        style: {
            textColor: '#cc0000',
            fontSize: 42,
            lineHeight: 42,
            alignment: Text.Alignment.right,
        },
        frame: {
            width: 200,
            height: 42,
            x: -300,
            y: yOffset,
        },
        locked: true,
    }).adjustToFit();
}

export { addSupportText };
