import { Page } from 'sketch/dom';

export function createPageWithName(document, name) {
    return document.pages.push(
        new Page({
            name: name,
        })
    );
}
