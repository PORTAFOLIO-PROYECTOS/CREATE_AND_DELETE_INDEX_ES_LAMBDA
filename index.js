"use strict";

//import { request } from "request";
const elasticsearch = require("elasticsearch");

const config = {
    countries: ['PE'],
    elasticUrl: 'https://vpc-es-sbsearch-qa-6lqloaf2kfljixcaekbyqxu2aa.us-east-1.es.amazonaws.com',
    activeCampaignsUrl: 'http://localhost:63185/api/Campania/activas/{pais}/0/3'
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

const _funciones = {
    inicializar: function () {
        _funciones.getElasticIndices();
    },

    getElasticIndices: function () {
        let params = {
            "h": ["index"],
            "format": "json",
            "index": "producto*"
        }

        let indices = [];

        esClient.cat.indices(params, (error, response, status) => {
            response.forEach(element => {
                indices.push(element.index);
                console.log("INDICES AL OBTENER", element.index);
            });
        });

        return indices;
    }
}

_funciones.inicializar();



