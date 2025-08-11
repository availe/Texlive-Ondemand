"use strict";

const pdftexButton = document.getElementById('pdftex-button');
const xetexButton = document.getElementById('xetex-button');
const statusElement = document.getElementById('status');
const localTexliveUrl = 'http://localhost:5050/';

async function run(engineCtor, pathLabel, kind) {
    try {
        statusElement.textContent = kind + ': init';
        pdftexButton.disabled = true;
        xetexButton.disabled = true;
        window.ENGINE_PATH = pathLabel;
        const engine = new engineCtor(localTexliveUrl);
        await engine.loadEngine();
        statusElement.textContent = kind + ': compiling…';
        await engine.compileFormat();
        statusElement.textContent = kind + ': sent';
    } catch (e) {
        statusElement.textContent = kind + ' error: ' + e.message;
    } finally {
        pdftexButton.disabled = false;
        xetexButton.disabled = false;
    }
}

pdftexButton.addEventListener('click', () => run(PdfTeXEngine, 'swiftlatex/swiftlatexpdftex.js', 'pdftex'));
xetexButton.addEventListener('click', () => run(XeTeXEngine, 'swiftlatex/swiftlatexxetex.js', 'xetex'));
