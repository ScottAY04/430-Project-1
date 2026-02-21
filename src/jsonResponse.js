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

const getAllCountry = (request, response) => {
    const responseJSON = {
        countryData,
    }
    return respondJSON(request, response, 200, responseJSON);
}

const byContinent = (request, response) => {
    const regionGiven = request.answer;
    console.log(regionGiven);

    let contentOutput = [];

    //loops through every single country
    for(let i = 0; i< totalCountries();i++){
        if(countryData[i].region === 'Asia'){
            contentOutput.push(countryData[i]);
            console.log(countData);
        }
    }
    return respondJSON(request, response, 200, contentOutput);
}

const byLetter = (request, response) => {
    //const {first, last} = request.answer;
    let contentOutput = [];

    for(let i = 0; i < totalCountries();i++){
        if(countryData[i].name[0].toLowerCase() === 'a'){
            //contentOutput.push(countryData[i].name);
        }
        if(countryData[i].name[countryData[i].name.length - 1].toLowerCase() === 'n'){
            contentOutput.push(countryData[i].name);
        }
    }

    return respondJSON(request, response, 200, contentOutput);
}

const getCurrency = (request, response) => {
    let countData = [];

    for(let i =0;i<totalCountries();i++){
        if(countryData[i].name.toLowerCase() === 'china'){
            //cou
        }
    }
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