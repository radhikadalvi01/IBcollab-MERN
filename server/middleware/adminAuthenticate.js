const jwt = require("jsonwebtoken");
const brand = require("../model/adminSchema");

const adminAuthenticate = async (req, res, next)=>{
    try{

        const token = req.cookies.adminToken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const adminUser = await brand.findOne({_id: verifyToken._id, "tokens.token":token});

        if(!adminUser){
            throw new Error("User Not Found")
        }

        req.token=token;
        next();

    }catch(err){
        res.status(401).send('Unauth:no token provided');
        console.log(err)
    }

}

module.exports = adminAuthenticate; 