const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartonSchema = mongoose.Schema(
    {
        carton_no: {
            type: String,
            maxlength: 64,
        },
        carton_weight: {
            type: Number,
            float: true
        },
        carton_length: {
            type: String,
            float: true
        },
        carton_width: {
            type: String,
            float: true
        },
        carton_height: {
            type: String,
            float: true
        },
        carton_volume: {
            type: String,
            float: true
        },
        destination_region: {
            type: String,
        }

    }
);

module.exports = mongoose.model("Carton", CartonSchema)
