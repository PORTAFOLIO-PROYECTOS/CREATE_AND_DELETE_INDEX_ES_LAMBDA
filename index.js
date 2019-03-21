"use strict";

const _base = require("./app/base");

(async () => {
    const base = new _base();

    let indices = base.createIndice();
    let listar = await indices;

    console.log(listar);
})();