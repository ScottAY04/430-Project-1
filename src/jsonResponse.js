const fs = require('fs');
const rawDATA = fs.readFileSync(`${__dirname}/../countries.json`);
const countryData = JSON.parse(rawDATA);
const contentOutput = {};

const respondJSON = (request, response, status, object) => {
    const content = JSON.stringify(object);
    response.writeHead(status, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(content, 'utf8'),
    });
    if(request.method !== 'HEAD' || status !== 204){
        response.write(content);
    }
    response.end();
}

const getAllCountry = (request, response) => {
    const responseJSON = {
        countryData,
    }
    return respondJSON(request, response, 200, responseJSON);
}

const NotFound = (request, response) => {

}

module.exports = {
    getAllCountry,
}