"use strict";

const _base = require("./app/base");

(() => {
    const base = new _base();

    let indices = base.getElasticIndices();

    console.log(await indices);
})();