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

export { createBorderStyle, createFillStyle };
