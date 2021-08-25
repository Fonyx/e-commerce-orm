const Category = require('../models/Category');

describe('Testing category method happy paths', ()=>{
    it('Should return a valid category object when get is called', ()=>{
        let result = false;
        expect(result).toBe(true);
    })
})

describe('Testing category method unhappy paths', ()=>{
    it('Should throw an error when body.category_name is missing', ()=>{
        expect(() => {
            let testString = 'abc5dfoisd';
            let _ = validators.stringSpacesNoNumbers(testString);
        }).toThrow('Only alphabet and space is allowed');
    }),
    it('Should return response with error code 400 when creating duplicate category', ()=>{
        expect(() => {
            let testString = 'abc5dfoisd';
            let _ = validators.stringSpacesNoNumbers(testString);
        }).toThrow('Only alphabet and space is allowed');
    })
})

describe('Testing category routes', ()=>{
    it('Should return a valid category object when get route is called', ()=>{
        let result = false;
        expect(result).toBe(true);
    })
})