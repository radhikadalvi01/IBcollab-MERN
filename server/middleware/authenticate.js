const jwt = require("jsonwebtoken");
const influencer = require("../model/influencerSchema"); 

const influencerAuthenticate = async (req, res, next) => {
    try{

        const token = req.cookies.influencerToken;
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
        const influencerUser = await influencer.findOne({_id:verifyToken._id, "tokens.token": token})

        if(!influencerUser){
            throw new Error("User Not Found")
        }

        req.token = token;
        req.influencerUser = influencerUser;
        req.influencerID = influencerUser._id;
        next();

    }catch(err){
        res.status(401).send({message:"Unauth no token provided"})
        console.log(err)
    }
}

module.exports = influencerAuthenticate