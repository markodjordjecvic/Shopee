const mongoose = require("mongoose");
const { preAlert } = require("../controllers/orderController");
const { Schema } = mongoose;

const PreAlertSchema = mongoose.Schema({
    lading_bill: {
        type: String,
        maxlength: 32
    },
    action_type: {
        type: Number,
        maxlength: 16
    },
    departure_location: {
        type: String,
        maxlength: 32
    },
    arrival_location: {
        type: String,
        maxlength: 32
    },
    pcs: {
        type: String,
        maxlength: 256
    },
    lading_bill_weight: {
        type: Number,
        float: true,
        maxlength: 256
    },
    lading_bill_vol_weight:{
        type: Number,
        float: true,
        maxlength: 256
    },
    lading_bill_chargeable_weight: {
        type: Number,
        float: true,
        maxlength: 256
    },
    lading_bill_sequence: {
        type: Number,
        maxlength: 16
    },
    lading_bill_total_number: {
        type: Number,
        maxlength: 16
    },
    previous_lading_bill: {
        type: String,
        maxlength: 32
    },
    etd: {
        type: Number,
        maxlength: 32
    },
    eta: {
        type: Number,
        maxlength: 32
    },
    transport_company_name: {
        type: String,
        maxlength: 32
    },
    vessel_no: {
        type: String,
        maxlength: 32
    },
    carton_list: [
        {
            carrier_tn:{
                type: String,
                maxlength: 64
            }
        }
    ]
});

module.exports = mongoose.model("PreAlert", PreAlertSchema)