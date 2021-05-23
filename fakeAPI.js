var SimplePromise = require("./simplepromise").default;

module.exports = {
    fakeSyncAPI: function(simErr) {
        /* Synchronous function that returns plain objects to simulate an API
         */
        const user = {
            username: "revainisdead",
            favoriteNum: 42,
            profile: "https://github.com/revainisdead",
        };

        if (simErr === true) {
            const err = {
                statusCode: 404,
                message: "Could not find user (simulated)",
                error: "Not found (simulated)",
            };

            return err;
        } else {
            return {
                data: user,
                statusCode: 200,
            };
        }
    },
    fakeAsyncCall: function() {
        /* Delayed function, simulated network request.
         */
        return new SimplePromise((resolve, reject) => {
            setTimeout(() => {
                const apiResponse = module.exports.fakeSyncAPI(false);
                //const apiResponse = module.exports.fakeSyncAPI(true);

                if (apiResponse.statusCode >= 400) {
                    reject(apiResponse);
                } else {
                    resolve(apiResponse.data);
                }
            }, 5000);
        });
    },
};
