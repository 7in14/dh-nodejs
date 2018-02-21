const Mongoose = require('mongoose');

const dataSourceSchema = new Mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true }
}, { versionKey: false });

module.exports = Mongoose.model('DataSource', dataSourceSchema);