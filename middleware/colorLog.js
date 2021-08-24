// Custom middleware that logs out the type and path of each request to the server
const clog = (req, res, next) => {
    // const FgBlack = "\x1b[30m"
    // const FgRed = "\x1b[31m"
    // const FgGreen = "\x1b[32m"
    // const FgYellow = "\x1b[33m"
    // const FgBlue = "\x1b[34m"
    // const FgMagenta = "\x1b[35m"
    // const FgCyan = "\x1b[36m"
    // const FgWhite = "\x1b[37m"
    const openHands = String.fromCodePoint(0x1F932);
    const pointing = String.fromCodePoint(0xF595);
    const handWriting = String.fromCodePoint(0x270D);
    const trash = String.fromCodePoint(0xF5d1);
    switch (req.method) {
      case 'GET': {
        // console.info(`📗 ${FgCyan}${req.method} request to ${req.path}`);
        console.log(`${openHands} %c${req.method} request to ${req.path}`, 'color: blue');
        break;
      }
      case 'PUT': {
        // console.info(`📘 ${FgCyan}${req.method} request to ${req.path}`);
        console.log(`${pointing}%c${req.method} request to ${req.path}`, 'color: purple');
        break;
      }
      case 'POST': {
        // console.info(`📘 ${FgCyan}${req.method} request to ${req.path}`);
        console.log(`${handWriting}%c${req.method} request to ${req.path}`, 'color: purple');
        break;
      }
      case 'DELETE': {
        //   console.info(`📘 ${FgRed}${req.method} request to ${req.path}`);
          console.log(`${trash}%c${req.method} request to ${req.path}`, 'color: red');
          break;
        }
        default:
            // console.log(`📙${FgBlack}${req.method} request to ${req.path}`);
            console.log(`%c${req.method} request to ${req.path}`, 'color: black');
    }
  
    next();
  };
  
  exports.clog = clog;
  