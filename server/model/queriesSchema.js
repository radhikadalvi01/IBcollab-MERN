const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})
const queriesSchema = new mongoose.Schema({
    from:{
        type: String,
        required: true
    },
    entityType:{
        type: String,
        required: true
    },
    contactEmail:{
        type: String,
        required: true
    },
    contactNo:{
        type: String,
        required: true
    },
    dateOfQuery:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    query:{
        type: String,
        required: true
    }

})

const collabaration = mongoose.model('query', queriesSchema );
module.exports = collabaration