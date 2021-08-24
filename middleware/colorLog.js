const cLogger = require('../helpers/colorLogger');

// Custom middleware that logs out the type and path of each request to the server
const colorLog = (req, res, next) => {
    // https://thenewstack.io/tutorial-getting-creative-with-console-statements/
    // https://unicode.org/emoji/charts/full-emoji-list.html?utm_source=thenewstack&utm_medium=website&utm_campaign=platform#1f932    
    const openHands = String.fromCodePoint(0x1F932);
    const handWriting = String.fromCodePoint(0x270D);
    const pointing = String.fromCodePoint(0x1F446);
    const bomb = String.fromCodePoint(0x1F631);		
    switch (req.method) {
      case 'GET': {
        cLogger.logBlue(`${openHands}  ${req.method} request to ${req.path}`);
        break;
      }
      case 'POST': {
        cLogger.logBlue(`${handWriting}  ${req.method} request to ${req.path}`);
        break;
      }
      case 'PUT': {
        cLogger.logMagenta(`${pointing}  ${req.method} request to ${req.path}`)
        break;
      }
      case 'DELETE': {
        cLogger.logRed(`${bomb}  ${req.method} request to ${req.path}`)
        break;
      }
      default:
        cLogger.logWhite(`${req.method} request to ${req.path}`)
    }
  
    next();
  };
  
  module.exports= colorLog;
  