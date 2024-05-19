import fs from 'node:fs/promises';

const inputPathFile = "data.json";
const outputPathFile = "final_data.json";

function errorHandler(error) {
   console.error(`Error: ${error.message}`);
   console.log(error);
}

function readFile(inputPathFile) {
    return fs.readFile(inputPathFile, 'utf8');
}

function writeFile(outputPathFile, data) {
    return fs.writeFile(outputPathFile, data, 'utf8');
}

function processFile(inputPathFile, outputPathFile) {
    readFile(inputPathFile)
        .then(data => {
            const jsonData = JSON.parse(data);
            console.log('Read data:', jsonData);

            jsonData.modified = true;

            const modifiedData = JSON.stringify(jsonData, null, 2);

            return writeFile(outputPathFile, modifiedData)
                .then(() => {
                    console.log('The modified data has been saved successfully to', outputPathFile);
                });
        })
        .catch(errorHandler);
}

processFile(inputPathFile, outputPathFile);
