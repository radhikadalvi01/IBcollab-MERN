const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})

const adminSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
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
    tokens:[
        {
            token:{
                type: String,
                required: true                
            }
        }
    ]

})


adminSchema.pre('save', async function(next){

    if(this.isModified('password')){


        this.password = bcrypt.hashSync(this.password, 12);

 
    }
    next();
})

adminSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id : this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token 
    }catch(err){
        console.log(err);
    }
}

const admin = mongoose.model('admin', adminSchema );
module.exports = admin

