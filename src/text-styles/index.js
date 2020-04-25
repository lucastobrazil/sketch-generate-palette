import sketch from 'sketch';
import { FontSizes, FontWeights, Fonts, ThemeColors } from '@adapt-design-system/tokens';
import { getPage, addSupportText, getTextVerticalOffset, createPageWithName, toTitleCase } from '../utils';
import CONFIG from '../config';
import { createTextLayer, textAlignments } from './text';
import { Artboard } from 'sketch/dom';

const document = sketch.getSelectedDocument();
const validColors = ['text', 'white', 'subduedText', 'primary', 'accent', 'success', 'warning', 'error'];

const textColors2 = Object.keys(ThemeColors)
    .filter((key) => validColors.includes(key))
    .reduce((obj, key) => {
        obj[key] = ThemeColors[key];
        return obj;
    }, {});


// @todo read this from the tokens
const fontFamilies = [
    { name: 'default', value: 'Graphik' },
    { name: 'alt', value: 'Tiempos Text' },
];

const getValues = (data) => {
    const output = {};
    data.map(({ name, value }) => (output[name] = `${value}`));
    return output;
};

const getFontSizes = (data) => {
    const output = {};
    data.map(({ name, value, lineHeight }) => (output[name] = { lineHeight, fontSizeValue: value }));
    return output;
};

const fontSizes = getFontSizes(FontSizes);
const fontWeights = getValues(FontWeights);

const generateTextLayers = () => {
    let yOffset = 0;
    let xOffset = 0;
    let prevAlignmentIndex = 0;
    let prevFontFamilyIndex = 0;

    const X_SPACING = 500;
    const Y_SPACING = 130;
    const FONT_FAMILY_SPACING = 5000;

    const HELPER_TEXT_COLOR = '#fe7e51';

    const _getAdditionalYOffset = (prevFontFamilyIndex, fontFamilyIndex) => {
        /* 
            Check if we're still rendering the same font family, 
            thus no additional offset.
        */
        if (prevFontFamilyIndex === fontFamilyIndex) {
            return 0;
        }
        // Update the index as we know it's a new font family
        prevFontFamilyIndex = fontFamilyIndex;
        return FONT_FAMILY_SPACING;
    };

    const output = fontFamilies.map((fontFamily, fontFamilyIndex) => [
        createTextLayer({
            fontSize: 180,
            text: toTitleCase(`${fontFamily.name} - ${fontFamily.value}`),
            color: HELPER_TEXT_COLOR,
            x: xOffset === 0 ? xOffset : xOffset + X_SPACING,
            y: -Y_SPACING * 3,
        }),
        Object.entries(textColors2).map(([colorName, colorValue], textColorsIndex) => [
            createTextLayer({
                fontSize: 180,
                fontWeight: 4,
                text: toTitleCase(colorName),
                color: HELPER_TEXT_COLOR,
                x: xOffset === 0 ? xOffset : xOffset + X_SPACING,
                y: -Y_SPACING,
            }),
            textAlignments.map((alignment, textAlignmentsIndex) =>
                Object.entries(fontSizes).map(([fontSizeName, { lineHeight, fontSizeValue }], fontSizesIndex) =>
                    Object.entries(fontWeights).map(([name, weightValue], fontWeightsIndex) => {
                        // if (prevFontFamilyIndex !== fontFamilyIndex) {
                        //     xOffset = 0;
                        //     prevFontFamilyIndex = fontFamilyIndex;
                        // }

                        if (prevAlignmentIndex !== textAlignmentsIndex) {
                            // reset the Y value if it's a new alignment
                            yOffset = 0;

                            // increment the X if it's a new alignment
                            xOffset += X_SPACING;
                            prevAlignmentIndex = textAlignmentsIndex;
                        }

                        return createTextLayer({
                            fontWeight: name,
                            fontSize: fontSizeValue,
                            lineHeight: Math.round(lineHeight * fontSizeValue),
                            alignment: textAlignments[textAlignmentsIndex],
                            text: toTitleCase(fontSizeName),
                            color: `#${colorValue.hex}`,
                            fontFamily: fontFamily.value,
                            x: xOffset,
                            y: (yOffset += Y_SPACING) + _getAdditionalYOffset(prevFontFamilyIndex, fontFamilyIndex),
                        });
                    })
                )
            ),
        ]),
    ]);
    return output.flat(Infinity);
};

const start = () => {
    let TEXT_PAGE = getPage(document, CONFIG.TEXT_PAGE_NAME);
    if (!TEXT_PAGE) {
        createPageWithName(document, CONFIG.TEXT_PAGE_NAME);
        TEXT_PAGE = getPage(document, CONFIG.TEXT_PAGE_NAME);
    }
    // Erase all other layers on the page.
    TEXT_PAGE.layers = [];
    TEXT_PAGE.layers.push(
        ...generateTextLayers(),
        addSupportText('These text layers and styles have been automatically generated.', getTextVerticalOffset(-4))
    );
    sketch.UI.message('Text Styles Generated! 📃');
};

export default () => {
    start();
};
