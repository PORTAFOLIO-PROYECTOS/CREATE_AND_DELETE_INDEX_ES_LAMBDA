const data = {
    createIndex: {
        "settings": {
            "number_of_shards": 1,
            "number_of_replicas": 1,
            "analysis": {
                "analyzer": {
                    "analyzer_ngram": {
                        "tokenizer": "tokenizer_ngram",
                        "filter": ["standard", "lowercase", "asciifolding"]
                    }
                },
                "tokenizer": {
                    "tokenizer_ngram": {
                        "type": "edge_ngram",
                        "min_gram": 3,
                        "max_gram": 3,
                        "token_chars": [
                            "letter",
                            "digit"
                        ]
                    }
                }
            }
        },
        "mappings": {
            "_doc": {
                "properties": {
                    "ID": { "type": "long" },
                    "title": {
                        "type": "text",
                        "fields": {
                            "ngram": {
                                "type": "text",
                                "analyzer": "analyzer_ngram"
                            }
                        }
                    }
                }
            }
        }
    }
}

module.exports = data;