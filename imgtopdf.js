PDFDocument = require('pdfkit');
const argv = require('minimist')(process.argv.slice(2));

var input="./img";
var output="./prezi.pdf";

if("im" in argv) input = argv.im;
if("out" in argv) output = argv.out;

fs = require('fs');
doc = new PDFDocument({
    autoFirstPage: false
});

imgs = [];

doc.pipe(fs.createWriteStream(output));

console.log("Creating pdf",output);

fs.readdir(input, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        imgs.push(file.substring(6).replace(".png",""));
    });
    x = imgs.sort(function(a, b) {
        return a - b;
    });
    for(var i in x){
        console.log(`writing Image #${i} to pdf`);
        var img = doc.openImage(`${input}/prezi-${i}.png`);
        doc.addPage()
            .image(`${input}/prezi-${i}.png`, {
            fit: [img.width, img.height]
        });
        doc.image(img, 0, 0);
    }

    console.log("saving to",output);
    doc.end();
    
    // delete files if wished
    if("del" in argv){
        fs.readdir(input, (err, files) => {
            if (err) throw err;
            for (const file of files) {
                fs.unlink(path.join(input, file), err => {
                    if (err) throw err;
                });
            }
        });
    }
});
