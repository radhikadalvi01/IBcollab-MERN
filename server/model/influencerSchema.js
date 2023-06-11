const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})

const influencerSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    DOB:{
        type: String,
        required: true
    },
    age:{
        type: Number,
    },
    instaURL:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    contactNo:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    instaID:{
        type: String
    },
    followers:{
        type: String
    },
    likes:{
        type: String
    },
    views:{
        type: String
    },
    engagementRate:{
        type: Number
        
    },
    state:{
        type: String
        
    },
    city:{
        type: String
        
    },

    accepted:{
        type:  Number,
        required:true
    },

    category:{
        type:Array
    },


    tokens:[
        {
            token:{
                type: String,
                required: true                
            }
        }
    ]

})


influencerSchema.pre('save', async function(next){

    if(this.isModified('password')){


        this.password = bcrypt.hashSync(this.password, 12);

 
    }
    next();
})

influencerSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id : this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token 
    }catch(err){
        console.log(err);
    }
}

const influencer = mongoose.model('influencer', influencerSchema );
module.exports = influencer

