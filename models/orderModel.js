const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = mongoose.Schema(
    {
        unique_id: {
            type: String,
            required: true,
            unique: true,
            maxlength: 32
        },
        carton_id: {
            type: Schema.Types.ObjectId,
            ref: "Carton"
        },
        ilh_shopee_no: {
            type: String,
            required: true,
            maxlength: 32
        },
        carrier_tn: {
            type: String,
            maxlength: 64
        },
        goods_type: {
            type: Number,
            maxlength: 2
        },
        service_code: {
            type: String,
            maxlength: 64
        },
        transport_type: {
            type: Number,
            maxlength: 2
        },
        destination_region_name: {
            type: String,
            maxlength: 16
        },
        destination_region: {
            type: String,
            maxlength: 16
        },
        pre_carrier_info: {
            carrier_code: {
                type: String,
                maxlength: 10,
                required: true
            },
            carrier_name: {
                type: String,
                maxlength: 64,
                required: true
            },
            carrier_tn: {
                 type: String,
                 maxlength: 64,
            },
            carrier_ext_tn: {
                type: String,
                maxlength: 64
            }
        },
        next_carrier_info: {
            carrier_code: {
                type: String,
                maxlength: 10,
                required: true
            },
            carrier_name: {
                type: String,
                maxlength: 64,
                required: true
            },
            carrier_tn: {
                 type: String,
                 maxlength: 64,
            },
            carrier_ext_tn: {
                type: String,
                maxlength: 64
            }
        },
        sender: {
            region: {
                type: String,
                maxlength: 32
            },
            region_code: {
                type: String,
                maxlength: 16
            },
            name: {
                type: String,
                maxlength: 1024
            },
            phone: {
                type: String,
                maxlength: 24
            },
            zipcode: {
                type: String,
                maxlength: 16
            },
            email: {
                type: String,
                maxlength: 256
            },
            state: {
                type: String,
                maxlength: 256
            },
            city: {
                type: String,
                maxlength: 256
            },
            district: {
                type: String,
                maxlength: 256
            },
            street: {
                type: String,
                maxlength: 256
            },
            address: {
                type: String,
                maxlength: 1024
            }
        },
        receiver: {
            region: {
                type: String,
                maxlength: 32
            },
            region_code: {
                type: String,
                maxlength: 16
            },
            name: {
                type: String,
                maxlength: 1024
            },
            phone: {
                type: String,
                maxlength: 24
            },
            zipcode: {
                type: String,
                maxlength: 16
            },
            email: {
                type: String,
                maxlength: 256
            },
            state: {
                type: String,
                maxlength: 256
            },
            city: {
                type: String,
                maxlength: 256
            },
            district: {
                type: String,
                maxlength: 256
            },
            street: {
                type: String,
                maxlength: 256
            },
            address: {
                type: String,
                maxlength: 1024
            }
        },
        parcel_qty: {
            type: Number,
            maxlength: 16
        }, 
        parcel_list: {
            type: [String]
        }

    }
);

module.exports = mongoose.model("Order", OrderSchema);