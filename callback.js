import fs from 'node:fs';

const inputPathFile = "data.json";
const outputPathFile = "modified_data.json";

function errorHandler(error){
   console.error(`Error: ${error.message}`);
   console.log(error);
}

function readFile1(inputPathFile, callback) {
    fs.readFile(inputPathFile, 'utf8', (err, data) => {
        if (err) {
            callback(err);
            return;
        }

        const jsonData = JSON.parse(data);
        console.log('Read data:', jsonData);

        jsonData.modified = true;

        const modifiedData = JSON.stringify(jsonData, null, 2);

        fs.writeFile(outputPathFile, modifiedData, (err) => {
            if (err) {
                callback(err);
                return;
            }
            console.log('The modified data has been saved successfullyу', outputPathFile);
        });
    });
}

readFile1(inputPathFile, errorHandler);
