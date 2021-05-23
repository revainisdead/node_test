
class SimplePromise {
    constructor(executionFunction) {
        /* Format of executionFunction argument:
         *   let executionFunctionEx = (resolve, reject) => {};
         */
        this.promiseChain = [];
        this.handleError = () => {};

        this.onResolve = this.onResolve.bind(this);
        this.onReject = this.onReject.bind(this);

        // Pass the promise's onResolve and onReject to callback argument
        executionFunction(this.onResolve, this.onReject);
    }

    then(handleSuccess) {
        this.promiseChain.push(handleSuccess);

        return this;
    }

    catch(handleError) {
        this.handleError = handleError;

        return this;
    }

    onResolve(value) {
        let storedValue = value;

        try {
            this.promiseChain.forEach((nextFn) => {
                storedValue = nextFn(storedValue);
            });
        } catch (error) {
            this.promiseChain = [];

            this.onReject(error);
        }
    }

    onReject(error) {
        this.handleError(error);
    }
}

module.exports.default = SimplePromise;

