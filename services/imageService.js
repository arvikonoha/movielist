const fs = require("fs")
const s3 = require("../libraries/s3Instance")

module.exports.uploadImageToBucket = async function ({filePath}){
  return new Promise(async (resolve,reject) => {
    try{
      
      const fileData = await s3.upload({
          Bucket:process.env.BUCKET,
          Body: fs.createReadStream(filePath),
          Key: `images/${filePath.split("/").pop()}`
      }).promise()

      fs.unlink(filePath,(err) => {
        if(err){
          reject(err)
        }else{
          resolve(fileData)
        }
      })
      
    } catch(err){
      reject(err)
    }
  })
}


module.exports.downloadImage = async function ({Key}){
  return new Promise((resolve,reject) => {
    try{
      
      let imageData = s3.getObject({Key,Bucket:process.env.BUCKET}) 
      resolve(imageData.createReadStream())
    } catch(err){
      reject(err)
    }
  })
}

module.exports.updateImage = async function ({file,Key}){
  return new Promise(async (resolve,reject) => {
    try{
      
      let fileData = await s3.putObject(
        {
          Key,
          Bucket:process.env.BUCKET,
          Body:fs.createReadStream(file.path)
        }
      ).promise()

      fs.unlink(file.path,(err) => {
        if(err){
          reject(err)
        }else{
          resolve(fileData)
        }
      })
    } catch(err){
      reject(err)
    }
  })
}