### Document property handler

Converts tags like `{document_date}` to the date of the document. 

So there has to be data like the `document`, `client`, etc put into the handler. 
Each item has a `getParsedValue()` function, that parses the tag into the value that appears in the rendered version (screen, print).


The file `content-parser.js` is used to parse the data.

This whole concept is open for improvement.