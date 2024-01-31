const mongoose = require('mongoose');
const { Schema } = mongoose;

const ParcelSchema = mongoose.Schema(
    {
        reference_no: {
            type: String,
            required: true,
            maxlength: 32
        },
        shopee_order_no: {
            type: String,
            required: true,
            maxlength: 32
        },
        invoice_date: {
            type: Number,
            maxlength: 32
        },
        domestic_third_party_no: {
            type: String,
            maxlength: 24
        },
        parcel_weight: {
            type:Number,
            float: true
        },
        parcel_length: {
            type:Number,
            float: true
        },
        parcel_width: {
            type:Number,
            float: true
        },
        parcel_height: {
            type:Number,
            float: true
        },
        parcel_volume: {
            type:Number,
            float: true
        },
        receiver_info: {
            receiver_name: {
                type: String,
                maxlength: 64
            },
            receiver_phone: {
                type: String,
                maxlength: 24
            },
            receiver_postal_code: {
                type: String,
                maxlength: 16
            },
            receiver_region: {
                type: String,
                maxlength: 8
            },
            receiver_state: {
                type: String,
                maxlength: 256
            },
            receiver_city: {
                type: String,
                maxlength: 256
            },
            receiver_distric: {
                type: String,
                maxlength: 256
            },
            receiver_street: {
                type: String,
                maxlength: 256
            },
            receiver_address: {
                type: String,
                maxlength: 1024
            },
            receiver_declare_name: {
                type: String,
                maxlength: 64
            },
            receiver_declare_phone: {
                type: String,
                maxlength: 24
            },
            receiver_declare_id: {
                type: String,
                maxlength: 32
            }
        },
        sender_info: {
            sender_name: {
                type: String,
                maxlength: 64
            },
            sender_phone: {
                type: String,
                maxlength: 24
            },
            sender_postal_code: {
                type: String,
                maxlength: 24
            },
            sender_region: {
                type: String,
                maxlength: 8
            },
            sender_state: {
                type: String,
                maxlength: 256
            },
            sender_city: {
                type: String,
                maxlength: 256
            },
            sender_district: {
                type: String,
                maxlength: 256
            },
            sender_street: {
                type: String,
                maxlength: 256
            },
            sender_address: {
                type: String,
                maxlength: 1024
            }
        },
        sku_list: [
            {
                hs_code: {
                    type: String,
                    maxlength: 256
                },
                quantity: {
                    type: Number,
                    maxlength: 32
                },
                declare_name: {
                    type: String,
                    maxlength: 1024
                },
                product_name: {
                    type: String,
                    maxlength: 1024
                },
                declare_value_usd: {
                    type: Number,
                    float: true
                },
                declare_value: {
                    type: Number,
                    float: true
                },
                lvg_tag: {
                    type: Number,
                    maxlength: 32
                }
            }
            
        ],
        action_type: {
            type: Number,
            maxlength:2
        }
    }
);

module.exports = mongoose.model("Parcel", ParcelSchema)