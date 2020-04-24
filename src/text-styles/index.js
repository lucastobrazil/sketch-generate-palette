import sketch from 'sketch';
import { FontSizes, FontWeights, Fonts } from '@adapt-design-system/tokens';

const textColors = ['text', 'white', 'subduedText', 'primary', 'accent', 'success', 'warning', 'error'];
const textAlignments = ['left', 'center', 'right', 'justify'];

const getFontSizes = () => {
    const output = {};
    FontSizes.map(({ name, value, unit }) => (output[name] = `${value}${unit}`));
    return output;
};

const getFontWeights = () => {
    const output = {};
    FontWeights.map(({ name, value }) => (output[name] = value));
    return output;
};

// @todo: names currently include 'sans-serif' etc
const getFontNames = () => {
    const output = {};
    Fonts.map(({ name, value }) => (output[name] = value));
    return output;
};

/*
 for each font family,
 For each font color,
 for each alignment,
 generate a layer set of font sizes
 and the text box should contain the name

*/

export default () => {
    console.log(getFontSizes());
    console.log(getFontWeights());
    console.log(getFontNames());
    sketch.UI.message('Text Styles Generated! 📃');
};
