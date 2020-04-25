import CONFIG from './config.js';
import { Text } from 'sketch/dom';
import { Page } from 'sketch/dom';

export function createPageWithName(document, name) {
    return document.pages.push(
        new Page({
            name: name,
        })
    );
}

export function addSupportText(text = 'foo', yOffset = 0) {
    return new Text({
        text,
        style: {
            textColor: '#cc0000',
            fontSize: 42,
            lineHeight: 42,
            alignment: Text.Alignment.right,
        },
        frame: {
            width: 200,
            height: 42,
            x: -300,
            y: yOffset,
        },
        locked: true,
    }).adjustToFit();
}

export function getPage(document, pageName) {
    switch (pageName) {
        case CONFIG.COLORS_PAGE_NAME:
            return document.pages.find((page) => page.name === pageName);
        case CONFIG.TEXT_PAGE_NAME:
            return document.pages.find((page) => page.name === pageName);
        default:
            return;
    }
}

export function getTextVerticalOffset(factor) {
    return factor * CONFIG.SWATCH_SPACING;
}

export function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
