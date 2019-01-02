import {pageHeight, pageWidth} from '@root/globals';
import {fallBackDocumentMargin} from '@models/fallbacks';

const requiredItems = [
    {
        draggable: true,
        styleable: true,
        x: 0,
        y: 303,
        width: pageWidth - fallBackDocumentMargin.left - fallBackDocumentMargin.right,
        height: 277,
        page: "front",
        padding: 10,
        background: "transparent",
        type: "lines",
        required: true
    },
    {
        draggable: true,
        styleable: true,
        x: 0,
        y: 56,
        width: pageWidth - fallBackDocumentMargin.left - fallBackDocumentMargin.right,
        height: 560,
        page: "follow",
        padding: 10,
        background: "transparent",
        type: "lines",
        required: true
    }
];

export default requiredItems;