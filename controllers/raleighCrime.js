'use strict'

const fetch = require('node-fetch');
const { URL, URLSearchParams } = require('url');
const querystring = require('querystring');

const crimeUrl = new URL('https://data.raleighnc.gov/resource/3bhm-we7a.json');
exports.crimeUrl = crimeUrl;

exports.get = async (ctx) => {
    let raleighCrimeUrl = new URL(crimeUrl);

    // look for query
    if (ctx.request.querystring) {
        console.log('querystring: ' + ctx.request.querystring);
        let qs = querystring.parse(ctx.request.querystring);

        if (qs.query) {
            // unescape nested query string
            let q = querystring.unescape(qs.query);
            console.log(q);
            let up = new URLSearchParams(q);
            // append it to the crime URL
            for (let kvp of up.entries()) {
                raleighCrimeUrl.searchParams.append(kvp[0], kvp[1]);
            }
        }
    }

    // append a limit of 20 crimes
    raleighCrimeUrl.searchParams.append('$limit', '20');
    console.log('URL: ' + raleighCrimeUrl);

    // get the URL arg query and add it to the request URL
    try {
        const response = await fetch(raleighCrimeUrl);
        const json = await response.json();
        ctx.body = json;
        ctx.status = 200;
    } catch (error) {
        console.log('error fetching crime data: ' + error);
        ctx.status = 500;
    }
}
