var fontkit = require('fontkit');

// open a font synchronously
var font = fontkit.openSync('./Times New Roman.ttf');

var text;
if (process.argv.length > 2) {
    text = process.argv.splice(2, process.argv.length - 2).join(" ");
} else {
    console.error("Usage: text2svg textToConvert");
    return;
}

// get some glyphs for a string, and apply ligature substitutions
var glyphs = font.glyphsForString(text);

var paths = glyphs.map(function(el, i) { return el.path.toSVG(); });
    
console.log(paths);

return paths;