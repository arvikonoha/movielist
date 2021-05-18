const { downloadImage, updateImage } = require("../services/imageService");
const upload = require("../libraries/multerInit");
const formidable = require("formidable")
const path = require("path")
const fs = require("fs")

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
    let {imageName} = req.params
    const imageStream = await downloadImage({Key:"images/"+imageName})
    imageStream.pipe(res)
  } catch (error) {
    console.log(error)
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
    console.log(error);
  })

})

module.exports = route