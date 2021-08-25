
function stringNoSpacesNoNumbers(text){
    for(let i=0; i < text.length; i++){
        let current = text[i];
        let textMatch = /[a-z A-Z]/g;
        let valid = textMatch.test(current);
        if(!valid){
            throw new Error('Only alphabet and space is allowed');
        }
    }
}

const validators = {
    stringNoSpacesNoNumbers,
}

module.exports = validators;
