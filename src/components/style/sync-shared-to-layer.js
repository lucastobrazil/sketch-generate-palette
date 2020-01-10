/*
    For Styles that already exist in the library,
    overwrite the existing layer style (keeps id intact),
    and sync all layers that have that shared style.
*/
export default (alreadyExistingStyle, newColor) => {
    alreadyExistingStyle.style = newColor.style;
    const layers = alreadyExistingStyle.getAllInstancesLayers();
    for (let layer of layers) layer.style.syncWithSharedStyle(alreadyExistingStyle);
};
