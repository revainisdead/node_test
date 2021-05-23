var tools = require("./tools");

// Module tests
const testVarToStr = () => {
    const test1 = 1;
    const test2 = "test2";
    const test3 = {testing: "value3"};

    tools.assert(tools.varToString({ test1 }) === "test1");
    tools.assert(tools.varToString({ test2 }) === "test2");
    tools.assert(tools.varToString({ test3 }) === "test3");
}
testVarToStr();
