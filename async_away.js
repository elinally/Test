import fs from 'node:fs/promises';

const inputPathFile = "data.json";
const outputPathFile = "modified_data.json";
const additionalFile = "additional_data.json";

async function errorHandler(error) {
   console.error(`Error: ${error.message}`);
   console.log(error);
}

async function readFile(inputPathFile) {
    return fs.readFile(inputPathFile, 'utf8');
}

async function writeFile(outputPathFile, data) {
    return fs.writeFile(outputPathFile, data, 'utf8');
}

async function fetchAdditionalData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ additional: "This is additional data from API" });
        }, 1000);
    });
}

async function processFile(inputPathFile, outputPathFile, additionalFile) {
    try {
        const data = await readFile(inputPathFile);
        
        if (!data) {
            throw new Error("Input file is empty");
        }

        const jsonData = JSON.parse(data);
        console.log('Read data:', jsonData);

        jsonData.modified = true;

        const additionalData = await fetchAdditionalData();
        jsonData.additional = additionalData;

        const additionalFileData = await readFile(additionalFile);
        
        if (!additionalFileData) {
            throw new Error("Additional file is empty");
        }

        const additionalJson = JSON.parse(additionalFileData);
        jsonData.additionalFileData = additionalJson;

        const modifiedData = JSON.stringify(jsonData, null, 2);

        await writeFile(outputPathFile, modifiedData);
        console.log('The modified data has been saved successfully to', outputPathFile);
    } catch (error) {
        errorHandler(error);
    }
}

processFile(inputPathFile, outputPathFile, additionalFile);
