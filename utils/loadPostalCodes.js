const fs = require('fs');
const path = require('path');

function loadPostalCodes() {
    const file = path.join(__dirname, 'cities-and-postalcode-by-district.json')
    const rawData = fs.readFileSync(file);
    const rawObject = JSON.parse(rawData);

    const keys = Object.keys(rawObject);
    const postalCodes = [];
    keys.forEach(key => {
        rawObject[key].forEach(entry => {
            postalCodes.push(entry);
        });
    });
    return postalCodes;
    
}

module.exports = loadPostalCodes;