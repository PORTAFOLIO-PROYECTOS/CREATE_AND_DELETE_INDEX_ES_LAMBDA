"use strict";

const utilsClass = require("./utils");
const elasticsearch = require("elasticsearch");
const requestAsync = require("async-request");
const request = require("request");
const config = require("./config");
const data = require("./data");
const utils = new utilsClass();
const esClient = new elasticsearch.Client({
    host: config.elasticUrl
});

module.exports = class Base {
    async inicio() {
        let indicesElastic = await this.getElasticIndices();
        let paises = utils.getCountries();

        await utils.asyncForEach(paises, async (pais) => {
            let response = await this.getCampaniasActivas(pais);
            let indicesCreados = utils.getIndicesPorPais(pais.toLowerCase(), indicesElastic);

            console.log(`Pais: ${pais} | campañas: ${JSON.stringify(response)}`);
            console.log("Indices creados", indicesCreados);
            console.log("Todos los indices", indicesElastic);

            for (const key in response) {
                const element = response[key];
                let indiceBuscar = `${config.indexName}_${pais.toLowerCase()}_${element.toString()}`;

                if (indicesElastic.indexOf(indiceBuscar) < 0) { // SI ES MENOR QUE CERO
                    this.createIndex(indiceBuscar);
                } else {
                    let index = indicesCreados.indexOf(indiceBuscar);
                    if (index > -1) indicesCreados.splice(index, 1);
                }
            }

            for (const key in indicesCreados) {
                const element = indicesCreados[key];

            }
            console.log("Indices creados", indicesCreados);
        });

    }

    createIndex(nameIndex) {
        console.log(`se crea el indice ${nameIndex}`);
        request({
            url: `${config.elasticUrl}/${nameIndex}`,
            method: "PUT",
            json: data.createIndex
        }, (error, res, status) => {
            if (error) return console.error(error);
            console.log(`indice creado: ${nameIndex} | ${JSON.stringify(res)}`);
        });
    }

    async getCampaniasActivas(pais) {
        try {
            let urlGetCampanias = utils.getAtiveCampaignsUrlWithCountry(pais);
            let responseCampanias = await requestAsync(urlGetCampanias);
            return JSON.parse(responseCampanias.body);
        } catch (error) {
            console.error(error);
        }
    }

    async getElasticIndices() {
        try {
            let params = {
                "h": ["index"],
                "format": "json",
                "index": "producto*"
            }

            let indices = [];

            return new Promise((resolve, reject) => {
                esClient.cat.indices(params, (error, response, status) => {
                    if (error) reject(error);
                    response.forEach(element => {
                        indices.push(element.index);
                    });
                    resolve(indices);
                });
            });
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}
