const colorNames = ['green','blue','magenta','red','white','black','yellow','cyan'];
const colorCodes = ["\x1b[32m","\x1b[34m","\x1b[35m","\x1b[31m","\x1b[37m","\x1b[30m","\x1b[33m","\x1b[36m"];
    

function getColorCode(colorChoice){
    let colorPrefIndex = colorNames.indexOf(colorChoice);
    if(colorPrefIndex !== -1){
        let colorCode = colorCodes[colorPrefIndex];
        return colorCode;
    } else {
        throw new Error('Color not available');
    }
}


function clog(text, colorPref){
    let colorCode = getColorCode(colorPref);
    console.log(`${colorCode}`);
    console.log(text);
    let blackCode = getColorCode('black');
    console.log(`${blackCode}`);
}


module.exports = clog;