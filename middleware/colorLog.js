const cLogger = require('../helpers/colorLogger');

// Custom middleware that logs out the type and path of each request to the server
const colorLog = (req, res, next) => {
    // https://thenewstack.io/tutorial-getting-creative-with-console-statements/
    // https://unicode.org/emoji/charts/full-emoji-list.html?utm_source=thenewstack&utm_medium=website&utm_campaign=platform#1f932    
    const openHands = String.fromCodePoint(0x1F932);
    const handWriting = String.fromCodePoint(0x270D);
    const pointing = String.fromCodePoint(0x1F446);
    const bomb = String.fromCodePoint(0x1F631);	
    let clog = new cLogger();	
    switch (req.method) {
      case 'GET': {
        clog.log(`${openHands}  ${req.method} request to ${req.path}`, 'green');
        // clog.logGreen(`${openHands}  ${req.method} request to ${req.path}`);
        break;
      }
      case 'POST': {
        clog.log(`${handWriting}  ${req.method} request to ${req.path}`, 'blue');
        // clog.logBlue(`${handWriting}  ${req.method} request to ${req.path}`);
        break;
      }
      case 'PUT': {
        clog.log(`${pointing}  ${req.method} request to ${req.path}`, 'magenta');
        // clog.logMagenta(`${pointing}  ${req.method} request to ${req.path}`)
        break;
      }
      case 'DELETE': {
        clog.log(`${bomb}  ${req.method} request to ${req.path}`, 'red');
        // clog.logRed(`${bomb}  ${req.method} request to ${req.path}`)
        break;
      }
      default:
        clog.log(`${req.method} request to ${req.path}`, 'white')
    }
  
    next();
  };
  
  module.exports= colorLog;
  