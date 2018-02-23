'use strict'

const Mongoose = require('mongoose');
const DataSource = require('../models/dataSource');
const fetch = require('node-fetch');

// gets all data sources
exports.get = async (ctx) => {
    console.log('getting /dataSources');

    try {
        let result = await DataSource.find();
        let fetches = [];
        for (let item of result) {
            fetches.push((async () => {
                var response = await fetch(item.url);
                var document = await response.json();
                return { name: item.name, document };
            })());
        }

        ctx.body = await Promise.all(fetches);
        ctx.status = 200;
    } catch (error) {
        ctx.status = 500;
        return console.log(error);
    }
}
