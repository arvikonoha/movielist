const AWS = require("./awsSDK")
const params = {}

if(process.env.DEVELOPMENT==="TRUE"){
  params.endpoint = 'http://127.0.0.1:9000'
  params.s3ForcePathStyle = true
}

module.exports = new AWS.S3(params)
