const mongoose = require("mongoose");
const { Schema } = mongoose;

const BillTrackSchema = mongoose.Schema({
    landing_bill: {
        type: String,
        maxlength: 32
    },
    op_code: {
        type: String,
        maxlength: 32
    },
    update_time: {
        type: Number,
        maxlength: 32
    },
    operator: {
        type: String,
        maxlength: 32
    },
    operator_phone: {
        type: String,
        maxlength: 32
    },
    op_location: {
        type: String,
        maxlength: 32
    },
    op_location_code: {
        type: String,
        maxlength: 32
    },
    img_url: {
        type: String,
        maxlength: 256
    },
    transport_type: {
        type: Number,
        maxlength: 16
    },
    etd: {
        type: Number,
        maxlength: 32
    },
    eta: {
        type: Number,
        maxlength: 32
    },
    reason_code: {
        type: String,
        maxlength: 32
    },
    reason_description: {
        type: String,
        maxlength: 256
    }
})

module.exports = mongoose.model("BillInfo", BillTrackSchema)