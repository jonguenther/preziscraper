const puppeteer = require('puppeteer-core');
const argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');

var prezi = null;
var out = "img";

// set prezi url
if("url" in argv){
    prezi= argv.url;
} else{
    throw "PREZI nOT FONT"
}

if("out" in argv){
    out = argv.out;
}

if (!fs.existsSync(`./${out}`)){
    fs.mkdirSync(`./${out}`);
}

// uncomment if you want to emulate different devices
// const devices = require('puppeteer-core/DeviceDescriptors');
// const iPad = devices['iPad Pro'];

// default values
if(process.platform === "win32"){
    var chromePath = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
} else {
    var chromePath = "/usr/bin/google-chrome";
}
var height = 842;
var width = 595;

// overwrite default if present
if("chromePath" in argv){
    chromePath = argv.chromePath;
}

if("width" in argv){
    width = argv.width
}

if("height" in argv){
    height = argv.height
}

// prezi control
const fullscr = ".webgl-viewer-navbar-fullscreen-enter-icon";
const nxt = ".webgl-viewer-navbar-next-icon";
const breaker = ".viewer-common-info-overlay-button-label";

(async () => {
    const browser = await puppeteer.launch(
        {
            executablePath: chromePath,
            headless:true
        }
    );
    const page = await browser.newPage();
    // await page.emulate(iPad);
    await page.setViewport({
        width: width,
        height: height,
        deviceScaleFactor: 1,   
    });
    await page.goto(prezi,{
        timeout: 3000000
    });

    n = 0;
    // TODO: Refactor code into promise
    await page.waitForSelector(fullscr);
    await page.click(fullscr);

    // TODO: work on check if bar is existing
    // await page.waitFor(() => !document.querySelector(nxt));
    await page.screenshot({path: `img/prezi-${n}.png`});
    await page.mouse.move(100, 100);
    await page.waitForSelector(".webgl-viewer-navbar-next-icon");
    await page.click(".webgl-viewer-navbar-next-icon");

    while(true){
        // await page.waitFor(() => !document.querySelector(nxt));
        n++;
        await page.waitFor(1200);
        if (await page.$(breaker) !== null) break;
        await page.screenshot({path: `img/prezi-${n}.png`});
        await page.mouse.move(100, 100);
        await page.waitForSelector(nxt);
        await page.click(nxt);
    }

    await browser.close();
})();