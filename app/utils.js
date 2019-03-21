"use strict";

const config = require("./config");

module.exports = class {
    getCountries() {
        return config.countries;
    }

    getAtiveCampaignsUrlWithCountry(country) {
        return config.activeCampaignsUrl.replace("{pais}", country);
    }

    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }
}