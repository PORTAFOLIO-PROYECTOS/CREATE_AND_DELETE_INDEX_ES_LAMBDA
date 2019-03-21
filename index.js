"use strict";

//import { request } from "request";
const elasticsearch = require("elasticsearch");
const config = require("./config");
const _base = require("./base");

const config = {
    
};

const esClient = new elasticsearch.Client({
    host: config.elasticUrl
});

// Utils
const _utils = {
    getCountries: function () {
        return config.countries;
    },

    getAtiveCampaignsUrlWithCountry: function (country) {
        return config.activeCampaignsUrl.replace("{pais}", country);
    }
}
// Fin Utils

class Funciones {
    async createIndices() {
        try {
            let params = {
                "h": ["index"],
                "format": "json",
                "index": "producto*"
            }

            let indices = [];

            return new Promise((resolve, reject) => {
                esClient.cat.indices(params, (error, response, status) => {
                    console.log(error);
                    response.forEach(element => {
                        indices.push(element.index);
                    });
                    resolve(indices);
                });
            });
        } catch (error) {
            console.error(error);
        }
    }
}

async function init() {
    const _funciones = new Funciones();
    console.log("entro");
    console.log(await _funciones.createIndices());
}

init();