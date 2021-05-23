
module.exports = {
    varToString: (obj) => {
        /* Convert a variable into a string that is the name of that variable.
         * Simply for debugging a little faster.
         *
         * Use: varToString({ somevar }) // Syntax sugar for { "somevar": somevar }
         */

        // Can't use this here, it will just use the name of the argument, not the original variable
        // Must use it when passing to this function ie. varToString({ somevar })
        //const obj = { somevar }; // Syntax sugar for { "somevar": somevar }
        return Object.keys(obj)[0];
    },
    _throw: (msg="Error in assert") => {
        throw msg;
    },
    assert: (val, msg=undefined) => val !== true ? this._throw(msg): console.log("assert passed"),
}
