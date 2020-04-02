const myCOS = require('ibm-cos-sdk')

const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    cos_reader_config: {
        endpoint: process.env.IBM_COS_ENDPOINT,
        apiKeyId: process.env.IBM_COS_APIKEYID_READER,
        ibmAuthEndpoint: process.env.IBM_AUTH_ENDPOINT,
        serviceInstanceId: process.env.IBM_AUTHSERVICE_INSTANCEID,
        // these two are required to generate presigned URLs
        credentials: new myCOS.Credentials(
            process.env.IBM_COS_HMAC_KEYID, 
            process.env.IBM_COS_HMAC_ACCESSKEY, 
            sessionToken = null
        ),
        signatureVersion: 'v4'
    },
    cos_writer_config: {
        endpoint: process.env.IBM_COS_ENDPOINT,
        apiKeyId: process.env.IBM_COS_APIKEYID_WRITER,
        ibmAuthEndpoint: process.env.IBM_AUTH_ENDPOINT,
        serviceInstanceId: process.env.IBM_AUTHSERVICE_INSTANCEID,
    }
}