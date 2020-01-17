import { Group } from 'sketch/dom';
import { toTitleCase } from './_util';

export default function createGroup(groupName, layers) {
    const group = new Group({
        name: toTitleCase(groupName),
        layers: layers,
    });
    group.adjustToFit();
    return group;
}
