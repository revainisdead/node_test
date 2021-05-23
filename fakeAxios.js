
module.exports = {
    get: (url, waitLonger = 600) => {
        return new Promise((resolve, reject) => {
            const wait = Math.floor(Math.random() * 300) + waitLonger;

            // Explain: RESOLVE is CALLED after WAIT milliseconds.
            //  - Third argument: data passed to first argument function
            setTimeout(resolve, wait, {data: {docs: url + ' data fetched'}});
        });
    },
}
