const dotenv = require('dotenv')
dotenv.config()

const myCOS = require('ibm-cos-sdk')
var multer = require('multer');
var multerS3 = require('multer-s3');

var { cos_reader_config, cos_writer_config } = require('../config/cos')

var cosReader = new myCOS.S3(cos_reader_config);
var cosWriter = new myCOS.S3(cos_writer_config);

const bucketName = "docbucket-bakkaya"

const fetchURL = itemKey => {
    return cosReader.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: itemKey
    })
}

const getFiles = (_req, _res) => {
    console.log(`Retrieving bucket contents from: ${bucketName}`);

    return cosReader.listObjects(
        {Bucket: bucketName},
    ).promise()
    .then((data) => {
        if (data != null && data.Contents != null) {
            const resultObj = data.Contents.map(content => {
                console.log(`Item: ${content.Key} (${content.size} bytes).`)
                return {
                    ...content,
                    ObjectURL: fetchURL(content.Key)
                }
            })
            _res.status(200).json(resultObj)
        }    
    })
    .catch((e) => {
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
        _res.status(400).send(`ERROR: ${e.code} - ${e.message}\n`)
    });
}

const getItemURL = (_req, _res) => {
    const { itemName } = _req.params

    const url = fetchURL(itemName)

    if(url) {
        _res.status(200).json({ url: url })
    } else {
        _res.status(400).send("URL Not Found")
    }

    return
}

const uploadText = (_req, _res) => {
    const date = new Date()
    const itemName = `file_${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}_${date.getTime()}.txt`

    const { fileText } = _req.body
    console.log(fileText)
    console.log(`Uploading file ${itemName} to ${bucketName}`)

    return cosWriter.putObject({
        Bucket: bucketName, 
        Key: itemName, 
        Body: fileText
    }).promise()
    .then(() => {
        console.log(`Item: ${itemName} created!`);
        _res.status(201).send("File created on COS")
    })
    .catch((e) => {
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
        _res.status(400).send("Unsuccessful")
    });
}

const uploadImage = (_req, _res) => {
    // const date = new Date()
    // const timestamp = `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}_${date.getTime()}`

    const uploader = multer({
        storage: multerS3({
            s3: cosWriter,
            bucket: bucketName,
            key: function (req, file, cb) {
                // cb(null, `${username}_${timestamp}_${file.originalname}`);
                cb(null, file.originalname)
                console.log(file);
            }
        })
    }).single('imgfile')

    uploader(_req, _res, function(error) {
        if(error) _res.status(400)
        
        _res.status(201).json({ msg: "SUCCESSFUL UPLOAD" })
    })
}

module.exports = {
    getFiles,
    getItemURL,
    uploadImage,
    uploadText
}