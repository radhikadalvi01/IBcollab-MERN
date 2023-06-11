const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    category:{
        type: String,
        required: true
    },

    subCategory:{
        type: Array,
        required: true
    }

})

const category = mongoose.model('category', categoriesSchema );
module.exports = category
