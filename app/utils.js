"use strict";

const config = require("./config");

module.exports = class {
    getCountries() {
        return config.countries;
    }

    getAtiveCampaignsUrlWithCountry(country) {
        return config.activeCampaignsUrl.replace("{pais}", country);
    }
}