

class colorLogger{
    constructor(){
        this.colorNames = [
            'green',
            'blue',
            'magenta',
            'red',
            'white',
            'black',
            'yellow',
            'cyan',
        ];
        this.colorCodes = [
            "\x1b[32m",
            "\x1b[34m",
            "\x1b[35m",
            "\x1b[31m",
            "\x1b[37m",
            "\x1b[30m",
            "\x1b[33m",
            "\x1b[36m",
        ];
    }

    getColorCode(colorChoice){
        let colorPrefIndex = this.colorNames.indexOf(colorChoice);
        if(colorPrefIndex !== -1){
            let colorCode = this.colorCodes[colorPrefIndex];
            return colorCode;
        } else {
            throw new Error('Color not available');
        }
    }

    log(text, colorPref){
        let colorCode = this.getColorCode(colorPref);
        console.log(`${colorCode}${text}`);
    }
}



// function logGreen(text){
//     console.log(`${FgGreen}${text}`);
// }

// function logYellow(text){
//     console.log(`${FgYellow}${text}`);
// }

// function logCyan(text){
//     console.log(`${FgCyan}${text}`);
// }

// function logBlue(text){
//     console.log(`${FgBlue}${text}`);
// }

// function logMagenta(text){
//     console.log(`${FgMagenta}${text}`);
// }

// function logRed(text){
//     console.log(`${FgRed}${text}`);
// }

// function logWhite(text){
//     console.log(`${FgWhite}${text}`);
// }

// function logBlack(text){
//     console.log(`${FgBlack}${text}`);
// }

// const colorLogger = {
//     logGreen,
//     logBlue,
//     logMagenta,
//     logRed,
//     logYellow,
//     logCyan,
//     logBlack,
//     logWhite
// }

module.exports = colorLogger;