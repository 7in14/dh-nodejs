'use strict'

const Mongoose = require('mongoose');
const DataSource = require('../models/dataSource');

// gets all data sources
exports.getAll = async (ctx) => {
    console.log('getting /dataSources');

    try {
        let result = await DataSource.find();
        console.log(result);
        ctx.body = result;
        ctx.status = 200;
    } catch (error) {
        ctx.status = 500;
        return console.log(error);
    }
}

// gets the datasource with the specified id
exports.get = async (ctx) => {
    console.log('getting /dataSource/id');

    const id = ctx.params.id;

    if (!Mongoose.Types.ObjectId.isValid(id)) {
        console.log("id not valid: " + id)
        ctx.status = 400;
        return;
    }

    try {
        let result = await DataSource.find({ _id: id });
        if (result.length === 0) {
            console.log("Could not find data source with id: " + id);
            ctx.status = 404;
        }
        else {
            console.log("Found data source: " + result);
            ctx.body = result;
            ctx.status = 200;
        }
    } catch (error) {
        ctx.status = 500;
        console.log(error);
    }
}

exports.put = async (ctx) => {
    console.log('putting /dataSource');

    const dataSource = new DataSource(ctx.request.body);

    try {
        const result = await dataSource.save();
        console.log('saved new datasource')
        ctx.body = result;
        ctx.status = 201;
    } catch (error) {
        console.log('could not save datasource: ' + error);
        if (error.name == 'ValidationError') {
            ctx.status = 400;
        }
        else {
            ctx.status = 500;
        }
    }
}

exports.delete = async (ctx) => {
    console.log('deleting /dataSource/id');

    const id = ctx.params.id;

    if (!Mongoose.Types.ObjectId.isValid(id)) {
        console.log("id not valid: " + id)
        ctx.status = 400;   // bad request
        return;
    }

    try {
        let dataSource = await DataSource.findOneAndRemove({ _id: id });
        if (dataSource) {
            console.log("removed: " + dataSource._id);
            ctx.status = 202;
        }
        else {
            console.log("data source not found; could not be removed");
            ctx.status = 404;
        }
    } catch (error) {
        console.log('could not delete datasource: ' + error);
        ctx.status = 500;
    }
}