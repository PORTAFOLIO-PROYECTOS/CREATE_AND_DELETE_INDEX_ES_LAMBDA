"use strict";

const config = require("./config");

module.exports = class {
    getCountries() {
        return config.countries;
    }

    getAtiveCampaignsUrlWithCountry(country) {
        return config.activeCampaignsUrl.replace("{pais}", country);
    }

    getIndicesPorPais(pais, array) {
        let retorno = [];
        for (const key in array) {
            const element = array[key];
            if (element.indexOf(pais) > 0) retorno.push(element);
        }
        return retorno;
    }

    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }
}