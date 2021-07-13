const { downloadImage, updateImage } = require("../services/imageService");
const upload = require("../libraries/multerInit");
const formidable = require("formidable")
const winston = require("winston")
const path = require("path")
const fs = require("fs")

const newrelicFormatter = require('@newrelic/winston-enricher')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.label({label: 'movielist'}),
    newrelicFormatter()
  ),
  transports:[
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'E:/NRLogs/new_relic.log'})
  ]
});

const route = require("express").Router();

route.post("/",(req,res) => {
  const incomingForm = new formidable()

  incomingForm.parse(req,function(error,files,fields){
    
    fs.copyFile(fields.upload.path,path.join("public","uploads",fields.upload.name),(err) => {
      
      if(!err){
        
        res.json({status:"server",name:fields.upload.name})
      }
    })

  })
})

route.get("/:imageName",async (req,res) => {
  try {
    logger.info("Get an Image")
    let {imageName} = req.params
    const imageStream = await downloadImage({Key:"images/"+imageName})
    imageStream.pipe(res)
  } catch (error) {
    logger.info(error)
  }
})

route.put("/",upload.single("movieImage"), (req,res) => {

  const {Key} = req.query
  updateImage({file:req.file,Key})
  .then(() => {  
    return res.json({
      status: "Success"
    });
  })
  .catch(error => {
    logger.info(error);
  })

})

module.exports = route