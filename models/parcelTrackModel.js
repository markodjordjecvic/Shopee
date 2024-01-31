const mongoose = require("mongoose");
const { Schema } = mongoose;

const ParcelTrackSchema = mongoose.Schema({
    sls_tn: {
        type: String,
        maxlength: 32
    },
    op_code: {
        type: String,
        maxlength: 32
    },
    op_time: {
        type: String,
        maxlength: 32
    },
    time_zone: {
        type: String,
        maxlength: 32
    },
    transport_type: {
        type: Number,
        maxlength: 16
    },
    operator: {
        type: String,
        maxlength: 128
    },
    operator_phone: {
        type: String,
        maxlength: 24
    },
    op_location: {
        type: String,
        maxlength: 128
    },
    op_location_code: {
        type: String,
        maxlength: 32
    },
    img_url: {
        type: String,
        maxlength: 1025
    },
    transport_no: {
        type: String,
        maxlength: 64
    },
    cnts: {
        type: Number,
        maxlength:16
    },
    pcs: {
        type: Number,
        maxlength: 16
    }
})

module.exports = mongoose.model("ParcelTrackInfo", ParcelTrackSchema);