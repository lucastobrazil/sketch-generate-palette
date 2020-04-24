import sketch from 'sketch';
import { FontSizes, FontWeights, Fonts } from '@adapt-design-system/tokens';
import { getPage, addSupportText, getTextVerticalOffset, createPageWithName } from '../utils';
import CONFIG from '../config';
import { createTextLayer, textAlignments } from './text';
import { Artboard } from 'sketch/dom';

const document = sketch.getSelectedDocument();

const textColors = ['text', 'white', 'subduedText', 'primary', 'accent', 'success', 'warning', 'error'];

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

const fontSizes = getValues(FontSizes);
const fontWeights = getValues(FontWeights);

/*
 for each font family,
 For each font color,
 for each alignment,
 generate a layer set of font sizes
 and the text box should contain the name

Y
Group * font Family
Font size * iteration

<All>
    <FontFamily is="1">
        <Color primary>
            <TextSizes align="left">
                <Text fontSize="foo" />
                <Text fontSize="foo" bold />
                <Text fontSize="bar" />
                <Text fontSize="bar" bold />
            </TextSizes>
            <TextSizes align="right">
                <Text fontSize="foo" />
                <Text fontSize="bar" />
            </TextSizes>
        </Color>
        <Color accent>

        </Color>
    </FontFamily>
</All>

*/

const createTextLayers = ({ text, yOffset, fontSize, fontFamily, name, alignment, fontWeight }) => {
    return createTextLayer({
        text,
        yOffset,
        fontSize,
        fontFamily,
        name,
        alignment: alignment,
        fontWeight,
    });
};

const mock = () => {
    const output = fontFamilies.map((fontFamily, fontFamilyIndex) =>
        textColors.map((color, textColorsIndex) =>
            textAlignments.map((alignment, textAlignmentsIndex) =>
                Object.entries(fontSizes).map(([fontSizeName, fontSizeValue], fontSizesIndex) =>
                    Object.entries(fontWeights).map(([name, weightValue], fontWeightsIndex) =>
                        // console.log({
                        //     fontWeight: weightValue,
                        //     fontSize: fontSizeValue,
                        //     alignment: textAlignments[index],
                        //     text: fontSizeName,
                        //     color,
                        //     fontFamily: fontFamily.value,
                        // })
                        createTextLayer({
                            fontWeight: weightValue,
                            fontSize: fontSizeValue,
                            alignment: textAlignments[textAlignmentsIndex],
                            text: fontSizeName,
                            color,
                            fontFamily: fontFamily.value,
                            xOffset: textColorsIndex * textAlignmentsIndex + 190,
                            yOffset:
                                fontWeightsIndex *
                                fontSizesIndex *
                                textAlignmentsIndex *
                                textColorsIndex *
                                fontFamilyIndex +
                                190,
                        })
                    )
                )
            )
        )
    );
    // console.log(output);
    return output.flat(Infinity);
};

const createTextForFont = ({ font, groupYOffset }) => {
    const { name, value } = font;
    return Object.entries(getValues(FontSizes)).map(([key, fontSize], index) => {
        return createTextForAlignment({
            text: key,
            yOffset: index + 50 + fontSize,
            fontSize: fontSize,
            fontFamily: value,
            name: name,
        });
    });
};

const createTextStyles = () => {
    const output = [];
    // fontFamilies.map((fontFamily, index) =>
    //     output.push(
    //         new Artboard({
    //             frame: {
    //                 x: 500 * index,
    //                 y: 0,
    //             },
    //             name: 'Font Family',
    //             flowStartPoint: true,
    //             layers: createTextForFont({ font: fontFamily, groupYOffset: index + 1 }),
    //         }).adjustToFit()
    //     )
    // );
    return mock();
    return output;
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
        // ...createTextStyles(),
        ...mock(),
        addSupportText('These text layers and styles have been automatically generated.', getTextVerticalOffset(-4))
    );
    sketch.UI.message('Text Styles Generated! 📃');
};

export default () => {
    start();
    // console.log(getFontSizes());
    // console.log(getValues(FontWeights));
    // console.log(getValues(Fonts));
};
