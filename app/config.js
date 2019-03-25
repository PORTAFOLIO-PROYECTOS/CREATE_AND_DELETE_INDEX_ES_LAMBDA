"use strict";

const config = {
    countries: ["CO", "PE"],
    elasticUrl: "https://vpc-es-sbsearch-ppr-rnioiss6o347c74q4w2u7w2uhu.us-east-1.es.amazonaws.com",
    activeCampaignsUrl: "http://10.12.6.131:5005/api/Campania/activas/{pais}/0/3",
    indexName: "producto_v1"
}

module.exports = config;