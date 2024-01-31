const mongoose = require("mongoose");
const { Schema } = mongoose;

const CustomeSchema =  mongoose.Schema({
    reference_no:{
        type: String,
        maxlength:32
    },
    clear_type: {
        type: Number,
        maxlength: 32
    },
    op_time: {
        type: Number,
        maxlength: 32
    },
    op_location: {
        type: String,
        maxlength: 64
    },
    event_code: {
        type: String,
        maxlength: 64
    },
    operator: {
        type: String,
        maxlength: 64
    },
    img_url: {
        type: String,
        maxlength: 256
    },
    tax_base_type: {
        type: Number,
        maxlength: 256
    },
    taxable_amount: {
        type: Number,
        float: true,
    },
    duty_rate: {
        type: Number,
        float: true,
        maxlength:32
    },
    duty_amount: {
        type: Number,
        float: true,
        maxlength: 32
    },
    vat_rate: {
        type: Number,
        float: true,
        maxlength: 32
    },
    vat_amount: {
        type: Number,
        float: true,
        maxlength: 32
    },
    customs_clearance_fee: {
        type: Number,
        float: true,
        maxlength: 32
    },
    tax_proof: {
        type: String,
        maxlength: 256
    },
    reason: {
        type: String,
        maxlength: 256
    },
    remark: {
        type: String,
        maxlength: 256
    }
});

module.exports = mongoose.model("Custom", CustomeSchema);