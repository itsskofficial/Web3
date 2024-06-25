const pinataSDK = require("@pinata/sdk");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const fs = require("fs");

const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);

const uploadImages = async (imagesDir) => {
    const imagesPath = path.resolve(imagesDir);
    const files = fs.readdirSync(imagesPath);
    let responses = []
    for (fileIndex in files) {
        const readableStreamForFile = fs.createReadStream(`${imagesPath}/${files[fileIndex]}`);
        const options = {
            pinataMetadata: {
                name: files[fileIndex],
            }
        };
        try {
            const response = await pinata.pinFileToIPFS(readableStreamForFile, options);
            responses.push(response);
        } catch (error) {
            console.log(error);
        }
    }

    return { responses, files }    
}

const storeTokenURIMetadata = async (metadata) => {
    try {
        const response = await pinata.pinJSONToIPFS(metadata)
        return response
    } catch (error) {
        console.log(error)
    }

    return null 
}

module.exports = { uploadImages, storeTokenURIMetadata };
