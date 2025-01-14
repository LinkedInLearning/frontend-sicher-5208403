// Setup the application
const PAGES = `${__dirname}/pages`;
const port = 3000;

const {expressCspHeader, NONCE} = require('express-csp-header');

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/js", express.static("js"));

app.get("/", (req, res) => {
    res.send("Willkommen zu dieser CSP-Demo. Probiere einen der Demo-Endpunkte aus: /basics, /hashes oder /nonces");
});

// Daten mit böswilligen Inhalten
const data = [
    `Timo`,
    `Raupy<img src="none" onerror="console.warn('evil 1')">`,
    `Lenny`,
    `Martina<script>console.warn('evil 2')</script>`
];


/****************
 * Aufgabe 1: Nutzen Sie die Direktive `script-src` die Ausführung von Inline JavaScript zu blockieren
 ****************/

const csp_basics = {
    directives: {
        // Definieren Sie hier die CSP-Richtlinie für diesen Endpunkt.
        // Beachten Sie hierbei, dass der Name der Direktive in Anführungszeichen stehen muss und der Wert ein String-Array ist.
    }
}

// Serve the endpoint with CSP enabled
app.get("/basics", expressCspHeader(csp_basics), (req, res) => {
    // Render the EJS page with the data
    res.render(`${PAGES}/list-names`, {data: data});
});


/****************
 * Aufgabe 2a: Nutzen Sie die Direktive `script-src` mit einem entsprechenden Hash-basierten CSP um die Ausführung von eigenem Inline JavaScript zu erlauben
 ****************/

const csp_hashes = {
    directives: {
        // Definieren Sie hier die CSP-Richtlinie für diesen Endpunkt und fügen Sie den Hash des erlaubten JavaScript-Codes hinzu.
        // Sie können hierfür das kostenlose Online-Tool https://report-uri.io/home/hash nutzen.
        'script-src': ["'self' 'sha256-<HASH>'"]
    }
}
app.get("/hashes", expressCspHeader(csp_hashes), (req, res) => {
    // Render the EJS page with the data
    res.render(`${PAGES}/list-names-with-count`, {data: data});
});


/****************
 * Aufgabe 2b: Nutzen Sie die Direktive `script-src` mit einem entsprechenden Nonce-basierten CSP um die Ausführung von eigenem Inline JavaScript zu erlauben
 ****************/

const csp_nonces = {
    directives: {
        // Definieren Sie hier die CSP-Richtlinie für diesen Endpunkt und fügen Sie den importierten NONCE-Wert ihrer `script-src`-Direktive hinzu.
        'script-src': [] 
    }
}

// Serve the endpoint with CSP enabled
app.get("/nonces", expressCspHeader(csp_nonces), (req, res) => {
    // Render the EJS page with the data
    // The middleware exposes the calculated nonce on req.nonce
    res.render(`${PAGES}/list-names-with-count-nonces`, { data: data, nonce: req.nonce });
});

// Start the app
app.listen(port, () => {
    console.log(`CSP demo available at http://localhost:${port}`);
});
