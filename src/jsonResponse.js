const fs = require('fs');
const rawDATA = fs.readFileSync(`${__dirname}/../countries.json`);
const countryData = JSON.parse(rawDATA);
const totalCountries = () =>{return countryData.length};

const respondJSON = (request, response, status, object) => {
    const content = JSON.stringify(object);
    response.writeHead(status, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(content, 'utf8'),
    });

    //console.log(countryData[0].name);

    //if it is a head request or updates nothing it doesn't write a response
    if(request.method !== 'HEAD' && status !== 204){
        response.write(content);
    }
    response.end();
}

const getAllCountry = (request, response, parsedUrl) => {
    const responseJSON = {
        countryData,
    }
    return respondJSON(request, response, 200, responseJSON);
}

const byContinent = (request, response, parsedUrl) => {
    let contentOutput = [];
    //let filtered = countryData;

    //loops through every single country
    const region = parsedUrl.searchParams.get('region');

    // if(region){
    //     filtered = filtered.filter((country)=>{
    //         country.region.toLowerCase() === region.toLowerCase();
    //     })
    // }
    // console.log(filtered);

    for(let i = 0; i< totalCountries();i++){
        if(countryData[i].region.toLowerCase() === region.toLowerCase()){
            contentOutput.push(countryData[i]);
        }
    }

    return respondJSON(request, response, 200, contentOutput);
}

const byLetter = (request, response, parsedUrl) => {
    const first = parsedUrl.searchParams.get('first');
    const last = parsedUrl.searchParams.get('last');
    let contentOutput = [];

    for(let i = 0; i < totalCountries();i++){
        if(first && countryData[i].name[0].toLowerCase() === first.toLowerCase()){
            contentOutput.push(countryData[i].name);
        }
        if(last && countryData[i].name[countryData[i].name.length - 1].toLowerCase() === last){
            contentOutput.push(countryData[i].name);
        }
    }

    return respondJSON(request, response, 200, contentOutput);
}

const getCurrency = (request, response, parsedUrl) => {
    const country = parsedUrl.searchParams.get('country');
    let contentOutput = [];

    for(let i =0;i<totalCountries();i++){
        if(countryData[i].name.toLowerCase() === country.toLowerCase()){
            contentOutput.push(countryData[i].finance.currency);
        }
    }
    return respondJSON(request, response, 200, contentOutput);
}

const notFound = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    };

    respondJSON(request, response, 404, responseJSON);
};

module.exports = {
    getAllCountry,
    byContinent,
    byLetter,
    getCurrency,
    notFound
}