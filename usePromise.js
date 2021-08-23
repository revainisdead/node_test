// run `node usePromise.js`

// https://levelup.gitconnected.com/learn-javascript-promises-by-building-a-fully-working-promise-from-scratch-c9eabe73fa3
// Promise: Plain Old Javascript Object (POJO)
//  - Wrapper about an asynchronous operation

var fakeAxios = require("./fakeAxios");
var fakeAPI = require("./fakeAPI");
var SimplePromise =  require("./simplepromise").default; 
var tools = require("./tools");
var tests = require("./tests"); // Run tests by simply importing

// Lesson 1: A promise is just an object.
tools.assert(typeof new Promise((resolve, reject) => { return null }) === 'object')


// Lesson 2: To enable waiting on the server, and execute code within then:
//           You MUST return a Promise object.
const myFetch = function(url) {
    const p = new Promise((resolve, reject) => {
        //fakeAxios.get("/bogusUrl")

        /*
        request((error, apiResponse) => {
            if (error) {
                reject(error);
            }

            resolve(apiResponse);
        };
        */
    });
    return p;
}


// Lesson 3: Once the client receives the response, it initiates the code in .then()
//           by calling resolve(response)

// My attempt
/*
const callback = (resolve, reject) => {
    return fakeAxios.get("/myApi")
        .then((res) => {
            console.log(tools.varToString(res), res);
            //resolve(res);

            let resExt = Object.assign(res, {"more": "testing"});
            return resExt;
        })
        .then((res2) => {
            console.log(tools.varToString(res2), res2);

            let resExt2 = Object.assign(res2, {"moremore": "testing"});
            return resExt2;
        })
        .then((res3) => {
            console.log(tools.varToString(res3), res3);

            let resExt3 = Object.assign(res3, {"moremoremore": "testing"});
            return resExt3;
        })
        .catch((err) => {
            console.log("error occurred", err);
        })
}
const spromise = new SimplePromise(callback);
*/

// Tutorial
fakeAPI.fakeAsyncCall()
    .then((user) => {
        console.log("In the first then: ", user);

        return user;
    })
    .then((user) => {
        console.log("Returning user's profile:", user.profile);

        return user.profile;
    })
    .then((profile) => {
        console.log("Final then with no return");
    })
    .catch((error) => {
        console.log(error.message);
    })

// Notes
// IF
//  1. Your asynchronous function calls reject(error) OR
//  2. Your try/catch recognizes an error
//
//  then, your asynchronous function will be passed to onReject which calls the function
//  that you passed to .catch()


// Learned that chaining promises works great because then will run no matter WHEN it's resolved
// Another interesting perk: the then will run instantly (seemingly synchronously)
let t = Promise.resolve(42)
t.then((result) => {
    console.log("Adding 1 then, even after resolve it will run.")
    console.log("result:", result)
});
t.then((result) => {
    console.log("Adding 2 then, even after resolve it will run.")
    console.log("result:", result)
});

