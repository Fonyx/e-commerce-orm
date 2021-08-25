const clog = require('../helpers/colorLogger');

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
        clog(`${openHands}  ${req.method} request to ${req.path}`, 'green');
        // clog.logGreen(`${openHands}  ${req.method} request to ${req.path}`);
        break;
      }
      case 'POST': {
        clog(`${handWriting}  ${req.method} request to ${req.path}`, 'blue');
        // clog.logBlue(`${handWriting}  ${req.method} request to ${req.path}`);
        break;
      }
      case 'PUT': {
        clog(`${pointing}  ${req.method} request to ${req.path}`, 'magenta');
        // clog.logMagenta(`${pointing}  ${req.method} request to ${req.path}`)
        break;
      }
      case 'DELETE': {
        clog(`${bomb}  ${req.method} request to ${req.path}`, 'red');
        // clog.logRed(`${bomb}  ${req.method} request to ${req.path}`)
        break;
      }
      default:
        clog(`${req.method} request to ${req.path}`, 'white')
    }
  
    next();
  };
  
  module.exports= colorLog;
  