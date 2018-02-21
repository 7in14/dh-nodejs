'use strict'

const fs = require('fs');
const util = require('util');

exports.get = async (ctx) => {
    console.log('getting /file');

    const readFile = util.promisify(fs.readFile);

    try {
        let content = await readFile('README.md', 'utf-8');
        console.log('completed file read');

        ctx.body = content;
        ctx.status = 200;
    }
    catch (error) {
        console.log('error reading file: ' + error);
        ctx.status = 500;
    }
}