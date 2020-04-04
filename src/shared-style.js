import { getSharedStyleByName } from './style';
/*
    For Styles that already exist in the library,
    overwrite the existing layer style (keeps id intact),
    and sync all layers that have that shared style.
*/
function _syncSharedToLayer(alreadyExistingStyle, newColor) {
    try {
        alreadyExistingStyle.style = newColor.style;
    } catch (error) {
        console.error(error);
        console.log(alreadyExistingStyle);
    }
    const layers = alreadyExistingStyle.getAllInstancesLayers();
    for (let layer of layers) layer.style.syncWithSharedStyle(alreadyExistingStyle);
}

/*
    Loop over all newly-created swatches and 
    create (or update) layer styles.
*/
export default function createSharedLayerStyles(colorsAsStyles, sharedLayerStyles) {
    const _styles = [];
    colorsAsStyles.forEach(function (color) {
        const alreadyExistingStyle = getSharedStyleByName(sharedLayerStyles, color.name);
        if (alreadyExistingStyle) {
            _syncSharedToLayer(alreadyExistingStyle, color);
            return;
        }
        _styles.push({
            name: color.name,
            style: color.style,
        });
    });
    return _styles;
}
