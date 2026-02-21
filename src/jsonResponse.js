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
    let filtered = countryData;

    //loops through every single country
    const regionGiven = parsedUrl.searchParams.get('region');

    //missing params
    if(!regionGiven){
        let responseJSON = {
            id: 'missingParams',
            message: 'Region is required.'
        }
        return respondJSON(request, response, 400, responseJSON);
    }

    let contentOutput = [];

    //filters out the json
    if(regionGiven){
        filtered = filtered.filter((country)=>{
            if(country.region.toLowerCase() === regionGiven.toLowerCase()){
                contentOutput.push(country);
            }
        })
    }

    console.log(contentOutput);
    return respondJSON(request, response, 200, contentOutput);
}

const byLetter = (request, response, parsedUrl) => {
    const first = parsedUrl.searchParams.get('first');
    const last = parsedUrl.searchParams.get('last');

    //requires inputs
    if(!first && !last){
        let responseJSON = {
            id: 'missingParams',
            message: 'At least one field needs to be filled.'
        }
        return respondJSON(request, response, 400, responseJSON);
    }

    let filtered = countryData;
    let contentOutput = [];

    if(first && !last){
        filtered = filtered.filter((country)=>{
            if(country.name.charAt(0).toLowerCase() === first.toLowerCase()){
                contentOutput.push(country.name);
            }
        })
        console.log(contentOutput);
    }else if(!first && last){
         filtered = filtered.filter((country)=>{
            if(country.name.charAt(country.name.length-1).toLowerCase() === last.toLowerCase()){
                contentOutput.push(country.name);
            }
        })
        console.log(contentOutput);    
    }else if(first && last){
        //filter the first letters then filter the last letters
        filtered = filtered.filter((country)=>{
            if(country.name.charAt(0).toLowerCase() === first.toLowerCase() && 
            country.name.charAt(country.name.length-1).toLowerCase() === last.toLowerCase()){
                contentOutput.push(country.name);
            }
        })
    }

    return respondJSON(request, response, 200, contentOutput);
}

const getCurrency = (request, response, parsedUrl) => {
    const country = parsedUrl.searchParams.get('country');

    if(!country){
        let responseJSON = {
            id: 'missingParams',
            message: 'Country is required.'
        }
        return respondJSON(request, response, 400, responseJSON);
    }

    let contentOutput = [];
    let filtered = countryData;

    //adds to the output
    if(country){
        filtered = filtered.filter((name)=>{
            if(name.name.toLowerCase() === country.toLowerCase()){
                contentOutput.push(name.finance.currency);
            }
        })
    }

    return respondJSON(request, response, 200, contentOutput);
}

const addFamousLocation = (request, response) => {
    const responseJSON = {
        message: 'Both Country and Location required'
    }

    const {name, location} = request.body;

    if(!name || !location){
        responseJSON.id = 'missingParams';
        return respondData(request, response, 400, responseJSON);
    }

    let responseCode = 204;


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