// Custom middleware that logs out the type and path of each request to the server
const colorLog = (req, res, next) => {
    // https://thenewstack.io/tutorial-getting-creative-with-console-statements/
    // https://unicode.org/emoji/charts/full-emoji-list.html?utm_source=thenewstack&utm_medium=website&utm_campaign=platform#1f932    
    const FgBlack = "\x1b[30m"
    const FgRed = "\x1b[31m"
    const FgGreen = "\x1b[32m"
    const FgYellow = "\x1b[33m"
    const FgBlue = "\x1b[34m"
    const FgMagenta = "\x1b[35m"
    const FgCyan = "\x1b[36m"
    const FgWhite = "\x1b[37m"
    const openHands = String.fromCodePoint(0x1F932);
    const handWriting = String.fromCodePoint(0x270D);
    const pointing = String.fromCodePoint(0x1F446);
    const bomb = String.fromCodePoint(0x1F631);		
    switch (req.method) {
      case 'GET': {
        console.log(`${openHands}  ${FgGreen}${req.method} request to ${req.path}`);
        break;
      }
      case 'POST': {
        console.log(`${handWriting}  ${FgBlue}${req.method} request to ${req.path}`);
        break;
      }
      case 'PUT': {
        console.log(`${pointing}  ${FgMagenta}${req.method} request to ${req.path}`);
        break;
      }
      case 'DELETE': {
        console.log(`${bomb}  ${FgRed}${req.method} request to ${req.path}`);
        break;
      }
      default:
          console.log(`${FgBlack} ${req.method} request to ${req.path}`);
    }
  
    next();
  };
  
  module.exports= colorLog;
  