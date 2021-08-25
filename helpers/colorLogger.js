

const FgGreen = "\x1b[32m"
const FgBlue = "\x1b[34m"
const FgMagenta = "\x1b[35m"
const FgRed = "\x1b[31m"
const FgWhite = "\x1b[37m"
const FgBlack = "\x1b[30m"
const FgYellow = "\x1b[33m"
const FgCyan = "\x1b[36m"


function logGreen(text){
    console.log(`${FgGreen}${text}`);
}

function logYellow(text){
    console.log(`${FgYellow}${text}`);
}

function logCyan(text){
    console.log(`${FgCyan}${text}`);
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

function logBlack(text){
    console.log(`${FgBlack}${text}`);
}

const colorLogger = {
    logGreen,
    logBlue,
    logMagenta,
    logRed,
    logYellow,
    logCyan,
    logBlack,
    logWhite
}

module.exports = colorLogger;