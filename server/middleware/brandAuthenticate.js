const jwt = require("jsonwebtoken");
const brand = require("../model/brandSchema");

const brandAuthenticate = async (req, res, next)=>{
    try{

        const token = req.cookies.brandToken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const brandUser = await brand.findOne({_id: verifyToken._id, "tokens.token":token});

        if(!brandUser){
            throw new Error("User Not Found")
        }

        req.token=token;
        req.brandUser = brandUser;
        req.brandId = brandUser._id;
        next();

    }catch(err){
        res.status(401).send('Unauth:no token provided');
        console.log(err)
    }

}

module.exports = brandAuthenticate; 