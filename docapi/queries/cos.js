const dotenv = require('dotenv')
dotenv.config()

const myCOS = require('ibm-cos-sdk')
var multer = require('multer');
var multerS3 = require('multer-s3');

var s3config = {
    endpoint: process.env.IBM_COS_ENDPOINT,
    apiKeyId: process.env.IBM_COS_APIKEYID,
    ibmAuthEndpoint: process.env.IBM_AUTH_ENDPOINT,
    serviceInstanceId: process.env.IBM_AUTHSERVICE_INSTANCEID,
}

var cos = new myCOS.S3(s3config);
const bucketName = "docbucket-bakkaya"

const uploadText = (_req, _res) => {
    const date = new Date()
    const itemName = `file_${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}_${date.getTime()}.txt`

    const { fileText } = _req.body
    console.log(fileText)
    console.log(`Uploading file ${itemName} to ${bucketName}`)

    return cos.putObject({
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
            s3: cos,
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
    uploadImage,
    uploadText
}