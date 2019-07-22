# preziscraper

This is a little tool written in Node.JS to download and convert a Prezi presentation into a pdf.

## Why create this?

One of my lecturers created his lecture in Prezi and I wanted to work with it on my iPad. Unfortunetaly, Prezi won't let you download their slide sets as PDF unless you have a Pro Account which is ridiculous and way too expensive.

So I created this Prezi scraper that lets me download the Prezi slides and convert them into a single PDF file.

## Requirements

You need a chromium browser (e.g. Google Chrome) installation on your pc.

Alternatively you can change `puppeteer-core` to `puppeteer` in `[preziscraper.js](preziscraper.js)`

## Installation

Simply clone this package and run `npm install`.

## Using this tool

Currently, the tool is split into two scripts. `[preziscraper.js](preziscraper.js)` contains the scraper, while `[imgtopdf.js](imgtopdf.js)` contains the pdf creation tool, to make a pdf out of the scraped Prezi slides.

If I find the time, I will merge them into one script.

### Scrape Prezis

To scrape a Prezi and save them as images, simply run `node preziscraper.js --url [PREZI URL]` 

**Additional options are:**
- `--width` to set the width [default is `595`]
- `--height` to set the height [default is `842`]
- `--out` to set the output folder of the scraped Prezi slides [default is `img` in the repo folder]
- `--chromePath` to set the path to the chromium executable [default is `C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe` for windows and `/usr/bin/google-chrome` for everything else] 

### Transform Prezi Slides to PDF
To transformt the scraped Prezi to PDF, run `node imgtopdf.js`.

**Additional options are:**
- `--in` to set the input folder [default is `./img` in the repo folder]
- `--out` to set the output path [default is `./prezi.pdf` in the repo folder]
- `--del` add this flag to delete all previously scraped images after the convertion is done

## How it works

The script uses [puppeteer](https://github.com/GoogleChrome/puppeteer) to control chromium, in order to access the Prezi. It will then go over each slide and take a screenshot.

In the end the images of the Prezi slides can be converted to a single PDF file.

## Issues

### Transition
Currently the script does not detect when a transition is done. I therefore hardcoded a timeout of `1200` ms in `[preziscraper.js](preziscraper.js)`. However, there is a chance that if the transition takes to long, e.g. when transitioning from an overview to a slide, the screenshot will be taken while the actual slide is not yet zoomed in.

### Full Screen
When `[preziscraper.js](preziscraper.js)` is being run in headless mode, it will not go into full screen mode for some reason. Needs to be investigated.