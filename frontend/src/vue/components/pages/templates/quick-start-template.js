import {pageHeight, pageWidth} from '@root/globals';
import {fallBackDocumentMargin} from '@models/fallbacks';

const quickStartTemplate = {
    "title": "",
    "margin": {
        "top": "60",
        "right": "70",
        "bottom": "70",
        "left": 70
    },
    "items": [
        {
            "draggable": true,
            "styleable": true,
            "x": 0,
            "y": 0,
            "width": 120,
            "height": 120,
            "page": "front",
            "padding": 0,
            "background": "transparent",
            "type": "image",
            "required": false,
            "src": "image-placeholder.png"
        },
        {
            "draggable": true,
            "styleable": true,
            "x": 371,
            "y": 0,
            "width": "109",
            "height": "34",
            "page": "front",
            "padding": "8",
            "background": "#ddd",
            "type": "text",
            "required": false,
            "content": "<b>Doc {document_id}</b>",
            "textAlign": "center"
        },
        {
            "draggable": true,
            "styleable": true,
            "x": 0,
            "y": "172",
            "width": "230",
            "height": 92,
            "page": "front",
            "padding": "10",
            "background": "transparent",
            "type": "text",
            "required": false,
            "content": "<b>{company_name}</b>\n{user_name}\n{company_address}\n{company_postcode} {company_city}",
            "textAlign": "left"
        },
        {
            "draggable": true,
            "styleable": true,
            "x": 250,
            "y": "172",
            "width": "230",
            "height": 100,
            "page": "front",
            "padding": "10",
            "background": "transparent",
            "type": "text",
            "required": false,
            "content": "<b>{client_name}</b>\n{client_contact}\n{client_address}\n{client_postcode} {client_city}"
        },
        {
            "draggable": true,
            "styleable": true,
            "x": 0,
            "y": 0,
            "width": 40,
            "height": 40,
            "page": "follow",
            "padding": 0,
            "background": "transparent",
            "type": "image",
            "required": false,
            "src": "image-placeholder.png"
        },
        {
            "draggable": true,
            "styleable": true,
            "x": 0,
            "y": "172",
            "width": 480,
            "height": "1",
            "page": "front",
            "background": "#ddd",
            "type": "border",
            "required": false
        },
        {
            "draggable": true,
            "styleable": true,
            "x": 0,
            "y": 309,
            "width": 480,
            "height": 1,
            "page": "front",
            "background": "#ddd",
            "type": "border",
            "required": false
        },
        {
            "draggable": true,
            "styleable": true,
            "x": 0,
            "y": "271",
            "width": 456,
            "height": 36,
            "page": "front",
            "padding": "10",
            "background": "transparent",
            "type": "text",
            "required": false,
            "content": "<b>About:</b> {document_subject}"
        },
        {
            "draggable": true,
            "styleable": true,
            "x": "266",
            "y": 0,
            "width": 105,
            "height": 40,
            "page": "front",
            "padding": "8",
            "background": "transparent",
            "type": "text",
            "required": false,
            "content": "{document_date}",
            "textAlign": "right"
        },
        {
            "draggable": true,
            "styleable": true,
            "x": 0,
            "y": "303",
            "width": 480,
            "height": 277,
            "page": "front",
            "padding": "10",
            "background": "transparent",
            "type": "lines",
            "required": true
        },
        {
            "draggable": true,
            "styleable": true,
            "x": 0,
            "y": "56",
            "width": 480,
            "height": 563,
            "page": "follow",
            "padding": "5",
            "background": "transparent",
            "type": "lines",
            "required": true
        },
        {
            "draggable": true,
            "styleable": true,
            "x": 0,
            "y": 62,
            "width": 480,
            "height": 1,
            "page": "follow",
            "background": "#ddd",
            "type": "border",
            "required": false
        },
        {
            "draggable": false,
            "type": "total",
            "required": true,
            "styleable": false,
            "position": "bottom",
            "totalNet": {
                "display": true,
                "content": "Total (ex. {document_vat}% VAT)"
            },
            "totalVat": {
                "display": false,
                "content": ""
            },
            "totalGross": {
                "display": false,
                "content": ""
            },
            "extraContent": {
                "display": true,
                "content": ""
            }
        }
    ]
};

export default quickStartTemplate;