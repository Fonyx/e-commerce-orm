

const FgBlack = "\x1b[30m"
const FgRed = "\x1b[31m"
const FgGreen = "\x1b[32m"
const FgYellow = "\x1b[33m"
const FgBlue = "\x1b[34m"
const FgMagenta = "\x1b[35m"
const FgCyan = "\x1b[36m"
const FgWhite = "\x1b[37m"


function logGreen(text){
    console.log(`${FgGreen}${text}`);
}

function logBlue(text){
    console.log(`${FgBlue}${text}`);
}

function logMagenta(text){
    console.log(`${FgMagenta}${text}`);
}

function logRed(text){
    console.log(`${FgRed}${text}`);
}

function logWhite(text){
    console.log(`${FgWhite}${text}`);
}

const colorLogger = {
    logGreen,
    logBlue,
    logMagenta,
    logRed,
    logWhite
}

module.exports = colorLogger;