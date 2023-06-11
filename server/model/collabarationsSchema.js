const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})
const collabarationSchema = new mongoose.Schema({
    fromBrand:{
        type: String,
        required: true
    },
    toInfluencer:{
        type: String,
        required: true
    },
    typeOFPost:{
        type: String,
        required: true
    },
    sumOfMoney:{
        type: String,
        required: true
    },
    dateOfPost:{
        type: String,
        required: true
    },
    dateOfCollab:{
        type: Number,
        required: true
    },
    productName:{
        type: String,
        required: true
    },
    categoryOfProduct:{
        type: String,
        required: true
    },
    accepted:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
})

const collabaration = mongoose.model('brand', collabarationSchema );
module.exports = collabaration
