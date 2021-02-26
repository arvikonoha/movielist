const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage(
  {
    destination: (req,file,cb) => {
      return cb(null,path.join("","public","uploads"))
    },
    filename: (req,file,cb) => {
      cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
  }
)

module.exports = multer({storage})