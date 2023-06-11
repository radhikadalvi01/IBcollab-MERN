const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})

const brandSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    brandLogo:{
        type: String
    },
    company:{
        type: String,
        required: true
    },
    Designation:{
        type: String,
        required: true
    },
    companyEmail:{
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
    companyWebsite:{
        type: String
    },
    companySize:{
        type: String
    },
    companyType:{
        type: String
    },
    industry:{
        type: String
    },
    state:{
        type: String
    }, 
    city:{
        type: String
    },
    accepted:{
        type:Boolean
    },
    category:{
        type:Array
    },
    accepted:{
        type:Number,
        required:true
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


brandSchema.pre('save', async function(next){

    if(this.isModified('password')){


        this.password = bcrypt.hashSync(this.password, 12);

 
    }
    next();
})

brandSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id : this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token 
    }catch(err){
        console.log(err);
    }
}

const brand = mongoose.model('brand', brandSchema );
module.exports = brand

