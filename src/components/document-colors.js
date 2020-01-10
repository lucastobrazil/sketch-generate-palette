export default (document, swatch) => {
    document.colors.push({ type: 'ColorAsset', name: `${swatch.codeName} - ${swatch.name}`, color: `#${swatch.hex}ff` });
};
