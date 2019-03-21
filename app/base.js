"use strict";

const config = require("./config");
const elasticsearch = require("elasticsearch");
const esClient = new elasticsearch.Client({
    host: config.elasticUrl
});

module.exports = class Base {
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
