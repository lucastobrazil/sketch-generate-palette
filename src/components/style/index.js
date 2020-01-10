import { createFillStyle, createBorderStyle } from './create-style';

function createStyles({ hex }, layerName) {
    const layers = [];
    layers.push(
        {
            name: `Border/${layerName}`,
            style: createBorderStyle(hex),
        },
        {
            name: `Fill/${layerName}`,
            style: createFillStyle(hex),
        }
    );
    return layers;
}

/* 
    Figure out if we are trying to create a shared style
    that already exists.
*/
function getSharedStyleByName(sharedStyles, name) {
    if (!sharedStyles) return;
    return sharedStyles.filter(style => style.name === name)[0];
}

/*
    For Styles that already exist in the library,
    overwrite the existing layer style (keeps id intact),
    and sync all layers that have that shared style.
*/
function syncSharedToLayer(alreadyExistingStyle, newColor) {
    alreadyExistingStyle.style = newColor.style;
    const layers = alreadyExistingStyle.getAllInstancesLayers();
    for (let layer of layers) layer.style.syncWithSharedStyle(alreadyExistingStyle);
}

export { createStyles, getSharedStyleByName, syncSharedToLayer };
