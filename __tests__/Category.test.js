const Category = require('../models/Category');
const fetch = require('node-fetch');

describe('Testing category method happy paths', ()=>{
    it('Should return a valid category object when get is called', ()=>{
        let result = false;
        expect(result).toBe(true);
    })
})

describe('Testing category method unhappy paths', ()=>{
    it('Should throw an error when body.category_name is missing', ()=>{
        let result = false;
        expect(result).toBe(true);
        // expect(() => {
        //     let testString = 'abc5dfoisd';
        //     let _ = validators.stringSpacesNoNumbers(testString);
        // }).toThrow('Only alphabet and space is allowed');
    })
})

describe('Testing category routes Happy paths', ()=>{
    it('Should return a valid category object when get route is called', ()=>{
        let result = false;
        expect(result).toBe(true);
    })
})

describe('Testing category routes unhappy paths', ()=>{
    it('Should return response with error code 400 when creating duplicate category', async ()=>{
        let testName = 'testCategory';
        // create the testCategory once
        let categoryObj = await fetch('http://localhost:3001/api/categories', {
            method: 'POST',
            body: {
                category_name: testName
            }
        }).then((resultObj) => {
            console.log(`Created category named: ${resultObj.category_name}`);
            return resultObj;
        }).catch((err) => {
            console.log(err);
        })
        // try to create it again, make sure the response has error code of 400 for bad request
        let _ = await fetch('http://localhost:3001/api/categories', {
            method: 'POST',
            body: {
                category_name: testName
            }
        }).then().catch((err) => {
            // make sure the server returns 400 and a duplicate warning
            expect(err.status === 400);
            expect(err.message === `Category ${testName} already exists`);
        })
        // // delete the instance of the testCategory
        // categoryObj.destroy();
        // // check category instance no longer exists in database
        // await fetch('http://localhost:3001/api/categories/'+categoryObj.id,{
        //     method: 'GET',
        // }).then((res)=>{
        //     expect(res.message === `No category for id ${categoryObj.id}`);
        // }).catch((err) => {
        //     console.err(err);
        // })
    })
})