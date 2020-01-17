import sketch from 'sketch';
const document = sketch.getSelectedDocument();

export default swatch => {
    document.colors.push({
        type: 'ColorAsset',
        name: `${swatch.codeName} - ${swatch.name}`,
        color: `#${swatch.hex}ff`,
    });
};
