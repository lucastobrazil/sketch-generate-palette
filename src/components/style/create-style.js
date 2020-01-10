import { Style } from 'sketch/dom';

const createBorderStyle = hex =>
    new Style({
        borders: [
            {
                thickness: 1,
                color: `#${hex}`,
                fillType: 'Color',
            },
        ],
    });

const createFillStyle = hex =>
    new Style({
        fills: [
            {
                color: `#${hex}`,
                fillType: 'Color',
            },
        ],
    });

/* 
    Figure out if we are trying to create a shared style
    that already exists.
*/
const getSharedStyleByName = (sharedStyles, name) => {
    if (!sharedStyles) return;
    return sharedStyles.filter(style => style.name === name)[0];
};

const createStyles = ({ hex }, layerName) => [
    {
        name: `Border/${layerName}`,
        style: createBorderStyle(hex),
    },
    {
        name: `Fill/${layerName}`,
        style: createFillStyle(hex),
    },
];
export { createStyles, getSharedStyleByName };
