const validators = require('../helpers/validators');

describe('Testing string spaces no number validator', () =>{
    describe('Testing happy path with valid strings', ()=>{
        it('Should return true when upper case string passed', ()=>{
            let testString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let result = validators.stringSpacesNoNumbers(testString);
            expect(result).toBe(true);
        }),
        it('Should return true when lower case string passed', ()=>{
            let testString = 'abcdefghijklmnopqrstuvwxyz';
            let result = validators.stringSpacesNoNumbers(testString);
            expect(result).toBe(true);
        }),
        it('Should return true when mixed case spacious string passed', ()=>{
            let testString = 'This is a valid test string';
            let result = validators.stringSpacesNoNumbers(testString);
            expect(result).toBe(true);
        })
    });
    
    describe('Testing unhappy paths', ()=> {
        it('Should raise Error if string with number in it', ()=>{
            expect(() => {
                let testString = 'abc5dfoisd';
                let _ = validators.stringSpacesNoNumbers(testString);
            }).toThrow('Only alphabet and space is allowed');
    
        }),
        it('Should raise Error if string contains non space special character', ()=>{
            let testString = 'asbweroin&%$';
            expect(() => {
                let _ = validators.stringSpacesNoNumbers(testString);
            }).toThrow('Only alphabet and space is allowed');
        }),
        it('Should raise Error if non string passed in', ()=>{
            let testString = ['Bad structure'];
            expect(() => {
                let _ = validators.stringSpacesNoNumbers(testString);
            }).toThrow('Type must be string, not object');
        })
    });
});