const CartonTrackModel = require("../models/cartonTrackModel");
const OrderModel = require("../models/orderModel");
const BillTrackModel = require("../models/billTrackModel");
const ContainerTrackModel  = require("../models/containerTrackModel");
const ParcelTrackModel = require("../models/parcelTrackModel");
const CustonmTrackModel = require("../models/customModel");

const jwt = require("jsonwebtoken");

const hashDecode = (token) => {
    const secretKey = "password";
    const decorde = jwt.verify(token, secretKey);
    return decorde;
}

const cartonTrack = async (req, res) => {
    if(req.body.jwt == undefined || req.body.jwt == null){
        return res.status(400).json({
            "retcode": 1,
            "message": "please check the jwt parameters",
            "data": ""
        });
    } else {
        const hasedObject = hashDecode(req.body.jwt);
        const {
            carrier_tn,
            op_code,
            update_time,
            operator,
            operator_phone,
            op_location,
            op_location_code,
            img_url,
            transport_type,
            etd,
            eta,
            reason_code,
            reason_description
        } = hasedObject.data;
    
        try {            
            if(!carrier_tn) {
                return res.status(400).json({
                    "retcode": 1,
                    "message": "Please check the carrier_tn field"
                })
            }

            if(!op_code) {
                return res.status(400).json({
                    "retcode": 1,
                    "message": "Please check the op_code field"
                })
            }

            if(!update_time) {
                return res.status(400).json({
                    "retcode": 1,
                    "message": "Please check the update_time field"
                })
            }

            if(!op_location) {
                return res.status(400).json({
                    "retcode": 1,
                    "message": "Please check the op_location field"
                })
            }

            if(!op_location_code) {
                return res.status(400).json({
                    "retcode": 1,
                    "message": "Please check the op_location_code field"
                })
            }

            if(!transport_type) {
                return res.status(400).json({
                    "retcode": 1,
                    "message": "Please check the transport_type field"
                })
            }

            if(!etd) {
                return res.status(400).json({
                    "retcode": 1,
                    "message": "Please check the etd field"
                })
            }

            if(!eta) {
                return res.status(400).json({
                    "retcode": 1,
                    "message": "Please check the eta field"
                })
            }

            const findOrder = await OrderModel.findOne({"carrier_tn": carrier_tn});
            if(!findOrder) {
                return res.status(400).json({
                    "retcode": -1200013,
                    "message": `There is no no Order with ${carrier_tn} carrier`
                });
            }
            console.log("findOrder._id", findOrder);
            const newCartonTrack = {
                order_id:findOrder._id,
                op_code: op_code,
                update_time: update_time,
                operator:operator,
                operator_phone: operator_phone,
                op_location: op_location,
                op_location_code: op_location_code,
                img_url: img_url,
                transport_type: transport_type,
                etd: etd,
                eta: eta,
                reason_code: reason_code,
                reason_description:reason_description
            }
            const saveCartonTrack = new CartonTrackModel(newCartonTrack);
            await saveCartonTrack.save();
            res.status(200).json({
                "retcode": 0,
                "message": "Recived carton track information."
            })
        } catch (error) {
            
        }
    }
   
}

const billTrack = async (req, res) => {
    if(req.body.jwt == undefined || req.body.jwt == null){
        return res.status(400).json({
            "retcode": 1,
            "message": "please check the jwt parameters",
            "data": ""
        });
    } else {
        const hasedObject = hashDecode(req.body.jwt);
        const {
            landing_bill,
            op_code,
            update_time,
            op_location,
            op_location_code,
            transport_type,
            etd,
            eta
        } = hasedObject.data;
        try {
            if(!landing_bill) {
                return res.status(400).json({
                    "retcode": 1,
                    "message": "Please check the landing_bill field"
                })
            }

            if(!op_code) {
                return res.status(400).json({
                    "retcode": 1,
                    "message": "Please check the op_code field"
                })
            }

            if(!update_time) {
                return res.status(400).json({
                    "retcode": 1,
                    "message": "Please check the update_time field"
                })
            }

            if(!op_location) {
                return res.status(400).json({
                    "retcode": 1,
                    "message": "Please check the op_location field"
                })
            }

            if(!op_location_code) {
                return res.status(400).json({
                    "retcode": 1,
                    "message": "Please check the op_location_code field"
                })
            }

            if(!transport_type) {
                return res.status(400).json({
                    "retcode": 1,
                    "message": "Please check the transport_type field"
                })
            }

            if(!etd) {
                return res.status(400).json({
                    "retcode": 1,
                    "message": "Please check the etd field"
                })
            }

            if(!eta) {
                return res.status(400).json({
                    "retcode": 1,
                    "message": "Please check the eta field"
                })
            }
            const newBillTrackInfo = new BillTrackModel(req.body);
            await newBillTrackInfo.save();
            res.status(200).json({
                "retcode": 0,
                "message": "Received Bill Info!"
            })
        } catch (error) {
            res.status(500).json({
                "retcode": -1200013,
                "message":""
            })
        }   
    }
    
}

const containerTrack = async (req, res) => {
    if(req.body.jwt == undefined || req.body.jwt == null){
        return res.status(400).json({
            "retcode": 1,
            "message": "please check the jwt parameters",
            "data": ""
        });
    } else {
        const hasedObject = hashDecode(req.body.jwt);
        const {
            landing_bill,
            container_no,
            op_code,
            update_time,
            op_location,
            op_location_code,
            transport_type,
            etd,
            eta
        } = hasedObject.data;

        if(!landing_bill) {
            res.status(400).json({
                "retcode": 1,
                "message": "Please check the landing_bill value."
            });
        }

        if(!container_no) {
            res.status(400).json({
                "retcode": 1,
                "message": "Please check the container_no value."
            });
        }

        if(!op_code) {
            res.status(400).json({
                "retcode": 1,
                "message": "Please check the op_code value."
            });
        }
    
        if(!update_time) {
            res.status(400).json({
                "retcode": 1,
                "message": "Please check the update_time value."
            });
        }

        if(!op_location) {
            res.status(400).json({
                "retcode": 1,
                "message": "Please check the op_location value."
            });
        }

        if(!op_location_code) {
            res.status(400).json({
                "retcode": 1,
                "message": "Please check the op_location_code value."
            });
        }

        if(!transport_type) {
            res.status(400).json({
                "retcode": 1,
                "message": "Please check the transport_type value."
            });
        }

        if(!etd) {
            res.status(400).json({
                "retcode": 1,
                "message": "Please check the etd value."
            });
        }

        if(!eta) {
            res.status(400).json({
                "retcode": 1,
                "message": "Please check the eta value."
            });
        }
        const newContainerTrack = new ContainerTrackModel(req.body);
        newContainerTrack.save();
        res.status(200).json({
            "retcode": 0,
            "message": "Received Container Track Info."
        })
    }
   
}

const parcelTrack = async (req, res) => {
    if(req.body.jwt == undefined || req.body.jwt == null){
        return res.status(400).json({
            "retcode": 1,
            "message": "please check the jwt parameters",
            "data": ""
        });
    } else {
        const hasedObject = hashDecode(req.body.jwt);
        const {
            sls_tn ,
            op_code,
            op_time,
            time_zone,
            transport_type,
            op_location_code,
        } = hasedObject.data;
    
        if(!sls_tn) {
            res.status(400).json({
                "retcode": 1,
                "message": "Please check the sls_tn field."
            });
        }

        if(!op_code) {
            res.status(400).json({
                "retcode": 1,
                "message": "Please check the op_code field."
            });
        }

        if(!op_time) {
            res.status(400).json({
                "retcode": 1,
                "message": "Please check the op_time field."
            });
        }

        if(!time_zone) {
            res.status(400).json({
                "retcode": 1,
                "message": "Please check the time_zone field."
            });
        }

        if(!transport_type) {
            res.status(400).json({
                "retcode": 1,
                "message": "Please check the transport_type field."
            });
        }

        if(!op_location_code) {
            res.status(400).json({
                "retcode": 1,
                "message": "Please check the op_location_code field."
            });
        }
    
        const newParcelTrack = new ParcelTrackModel(req.body);
        newParcelTrack.save();
        res.status(200).json({
            "retcode": 0,
            "message": "Received parcel Track Info."
        })
    }
   
}

const customTrack = async (req, res) => {
    if(req.body.jwt == undefined || req.body.jwt == null){
        return res.status(400).json({
            "retcode": 1,
            "message": "please check the jwt parameters",
            "data": ""
        });
    } else {
        const hasedObject = hashDecode(req.body.jwt);
        const { cc_results } = hasedObject.data;
        console.log(cc_results);
        cc_results.map( async (cc_result) => {
            const {
                reference_no,
                clear_type,
                op_time,
                op_location,
                event_code
            } = cc_result;
            try {                
                if(!clear_type) {
                    return res.status(400).json({
                        "retcode": 1,
                        "message": "Please check the clear_type field"
                    });
                }

                if(!reference_no) {
                    return res.status(400).json({
                        "retcode": 1,
                        "message": "Please check the reference_no field"
                    });
                }

                if(!op_time) {
                    return res.status(400).json({
                        "retcode": 1,
                        "message": "Please check the op_time field"
                    });
                }

                if(!op_location) {
                    return res.status(400).json({
                        "retcode": 1,
                        "message": "Please check the op_location field"
                    });
                }

                if(!event_code) {
                    return res.status(400).json({
                        "retcode": 1,
                        "message": "Please check the event_code field"
                    });
                }
                const findOrder = await OrderModel.findOne({"parcel_list": reference_no});
                if(!findOrder) {
                    return res.status(400).json({
                        "retcode": -1200013,
                        "message": `There is no parcel with ${reference_no}`
                    });
            
                }
                const newCustom = new CustonmTrackModel(cc_result);
                await newCustom.save();
                res.status(200).json({
                    "retcode": 0,
                    "message": "Successed!"
                })
            } catch (error) {
                res.status(500).json({
                    "retcode": -1200013,
                    "message":error
                })
            } 
        })
    }
   
}

module.exports = { cartonTrack, billTrack, containerTrack, parcelTrack, customTrack }