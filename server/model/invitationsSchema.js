const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const invitationsSchema = new mongoose.Schema({
    to: {
        type: Array,
        required: true
    },
    from: {
        type: Array,
        required: true
    },
    status: {
        type: Number,
        required: true
    }
})



const invitations = mongoose.model('invitations', invitationsSchema);
module.exports = invitations

