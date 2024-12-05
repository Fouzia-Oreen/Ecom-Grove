import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const uploadFolder = "D:/Deploy Projects/Ecom-Grove/api/uploads/";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
     // if your image name is (example Me.webp) --> change to lowercase, remove spaces, add a timestamp to it (example-me-3455546637.webp)
      const fileExt = path.extname(file.originalname);
      const fileName = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("-") + "-" + Date.now()
      cb(null, fileName + fileExt)
    },
});
  
const upload = multer({
    storage : storage,
    limits : {
        fileSize: 1000000  // file size
    },
    fileFilter: (req, file, cb) => {
        if ( 
            file.mimetype === "image/png" || 
            file.mimetype === "image/jpg" || 
            file.mimetype === "image/jpeg" || 
            file.mimetype === "image/webp") {
            cb(null, true)
        }else {
            // if you do not want user/client to upload file then use null in cb --> cb(null)
            cb(new Error("Only .jpg, .png, .jpeg or .webp formats are allowed"))
        }
    }
})

router.post("/",  upload.fields([
  { name:"image1", maxCount:1},
  { name:"image2", maxCount:1},
  { name:"image3", maxCount:1},
  { name:"image4", maxCount:1},

  ]), ( req, res) => {
  res.status(200).send({message :"Image successfully uploaded"}) 
})


export default router;