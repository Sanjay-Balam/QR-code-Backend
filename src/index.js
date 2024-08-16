const express = require("express");
const QRcode = require("qrcode");
const cors = require("cors");
const path = require("path")
const app = express();
app.use(express.json());
app.use(cors());
app.set("view engine","ejs")



app.post("/generate-url",(req,res)=>{
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({
        message: "Bad Request: URL is required"
        });
    }

    // convert url to dataurl 
    QRcode.toDataURL(url,(err,qrcodeUrl)=>{
        if(err){
            res.status(500).json({
                message:"Internal server error"
            })
        }
        else{
            res.json({
                message:"QR link send successfully",
                qrcodeUrl:qrcodeUrl
            })
        }
    })

})

app.listen(3000);
