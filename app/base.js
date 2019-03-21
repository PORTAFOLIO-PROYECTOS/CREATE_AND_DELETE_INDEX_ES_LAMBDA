"use strict";

const utilsClass = require("./utils");
const elasticsearch = require("elasticsearch");
const request = require("async-request");
const config = require("./config");
const utils = new utilsClass();
const esClient = new elasticsearch.Client({
    host: config.elasticUrl
});

module.exports = class Base {
    async createIndice() {
        let indices = await this.getElasticIndices();
        let paises = utils.getCountries();
        let indicesPorPaises = [];

        await utils.asyncForEach(paises, async (pais) => {
            let urlGetCampanias = utils.getAtiveCampaignsUrlWithCountry(pais);
            console.log("urlGetCampanias", urlGetCampanias);
            //let responseCampanias = await 
        });

        console.log("indices", indices);

    }

    async getCampaniasActivas(pais){
        return new Promise 
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
