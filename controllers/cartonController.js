const cartonModels = require("../models/cartonModels");
const CartonModel = require("../models/cartonModels");
const OrderModel = require("../models/orderModel");
const parcelModel = require("../models/parcelModel");

const jwt = require("jsonwebtoken");

const hashDecode = (token) => {
    const secretKey = "password";
    const decorde = jwt.verify(token, secretKey);
    return decorde;
}

const repackCreate = async (req, res) => {
    if(req.body.jwt == undefined || req.body.jwt == null){
        return res.status(400).json({
            "retcode": -1200012,
            "message": "please check the jwt parameters",
            "data": ""
        });
    } else {
        const hasedObject = hashDecode(req.body.jwt);
        const { carton_no,
                carton_weight, 
                carton_length,
                carton_width,
                carton_height,
                carton_volume,
                destination_region,
                parcel_list} = hasedObject.data;            
        try {
            if(!carton_no || !carton_weight) {
                return res.status(400).json({
                    "retcode": -1200012,
                    "message": "please check the field",
                    "data": ""
                });
            };
            const findOrder = await OrderModel.findOne({"parcel_list": { $in: parcel_list }});
            if(!findOrder){
                return res.status(400).json({
                    "retcode": -1203002,
                    "message": `There is no order for ${parcel_list}`,
                    "data": ""
                });
            }
    
            const repackCarton = {
                carton_no: carton_no,
                carton_weight: carton_weight,
                carton_length: carton_length,
                carton_width: carton_width,
                carton_height: carton_height,
                carton_volume: carton_volume,
                destination_region: destination_region,
                parcel_list: parcel_list
            }
            // const findCarton = CartonModel.findOne({"carton_no"})
            const newCarton = new CartonModel(repackCarton);
            const saveCarton =  await newCarton.save();
            findOrder.carrier_tn = carton_no;
            findOrder.carton_id = saveCarton._id;
            await findOrder.save();
            res.status(201).json({
                "retcode": 0,
                "message": "Create caton successed!",
                "data": findOrder.ilh_shopee_no
            })
        } catch (error) {
            res.status(500).json({
                "retcode": -1203002,
                "message": "error",
                "data": ""
            })
        }
    }
    
    
}

const repackUpdate = async (req, res) => {
    if(req.body.jwt == undefined || req.body.jwt == null){
        return res.status(400).json({
            "retcode": -1200012,
            "message": "please check the jwt parameters",
            "data": ""
        });
    } else {
        const hasedObject = hashDecode(req.body.jwt);
        const {
            carrier_tn,
            carton_no,
            ilh_shopee_no,
            destination_region,
            carton_length,
            carton_height,
            carton_width,
            carton_weight,
            carton_volume,
            parcel_list
        } = hasedObject.data;
    
        try {
            if(
                !carrier_tn ||
                !carton_no ||
                !ilh_shopee_no ||
                !destination_region ||
                !carton_weight ||
                !parcel_list
            ){
                return res.status(400).json({
                    "retcode": -1200012,
                    "message": "please check the field",
                    "data": ""
                })
            }
    
            if(parcel_list){
                parcel_list.map((parcle) => {
                    if(!parcle.reference_no || !parcle.action_type){
                        return res.status(400).json({
                            "retcode": -1200012,
                            "message": "please check parcel no and bind status",
                            "data": ""
                        });
                    }
                })
            }
    
            const renewOrder =  await OrderModel.findOne({"ilh_shopee_no": ilh_shopee_no});
            if(!renewOrder){
                return res.status(400).json({
                    "retcode": -1200013,
                    "message": `There is no Order with ${ilh_shopee_no} id.`,
                    "data": ""
                })
            } else {     
                CartonModel.populate(renewOrder, { path: 'carton_id'}, (err, populatedOrder) => {
                    console.log(populatedOrder);
                    if(err){
                        return res.status(400).json({
                            "retcode": -1200012,
                            "message": err
                        })
                    } else {
                        populatedOrder.carton_id.carton_no = carton_no;
                        populatedOrder.carton_id.carton_weight = carton_weight;
                        populatedOrder.carton_id.carton_length = carton_length;
                        populatedOrder.carton_id.carton_width = carton_width;
                        populatedOrder.carton_id.carton_height = carton_height;
                        populatedOrder.carton_id.carton_volume = carton_volume;
                        populatedOrder.carton_id.destination_region = destination_region;
                        populatedOrder.carton_id.save();
                    }            
                })
            } 
            parcel_list.map(async (parcel) => {
                const findParcel = await parcelModel.findOne({"reference_no":parcel.reference_no});
                if (!findParcel) {
                    return res.status(401).json({
                        "retcode": -1203003,
                        "message": `There is no order for the parcel with ${parcel.reference_no} id.`,
                        "data": ""
                    })
                }
                findParcel.action_type = parcel.action_type;
                findParcel.save();
            });
            renewOrder.carrier_tn = carrier_tn;
            await renewOrder.save();
            res.status(201).json({
                "retcode": 0,
                "message": "Carton update successed!"
            })
    
        } catch (error) {
            res.status(500).json({
                "retcode": -1200013,
                "message":  error
            })
        }
    }
    
}

const repackCancel = async (req, res) => {
    if(req.body.jwt == undefined || req.body.jwt == null){
        return res.status(400).json({
            "retcode": -1200012,
            "message": "please check the jwt parameters",
            "data": ""
        });
    } else {
        const hasedObject = hashDecode(req.body.jwt);
        const {
            carrier_tn,
            carton_no,
            ilh_shopee_no,
            destination_region,
            reason_code
        } = hasedObject;
        if (!carrier_tn ||
            !carton_no ||
            !ilh_shopee_no ||
            !destination_region ||
            !reason_code) {
            return res.status(400).json({
                "retcode": -1203004,
                "message": "Please check input field",
                "data": ""
            });
        }
        try {
            // console.log("object");
            const cancelModel = await OrderModel.findOne({"ilh_shopee_no": ilh_shopee_no});
            console.log(cancelModel);
            if (!cancelModel) {
                // console.log("object");
                return res.status(400).json({
                    "retcode": -1203004,
                    "message": `There is no order with ${ilh_shopee_no} ilh_shopee_no`,
                    "data": ""
                });
            }
            const cancelCartonId = cancelModel.carton_id;
            await CartonModel.findOneAndDelete({"_id": cancelCartonId});
            cancelModel.destination_region = "",
            cancelModel.destination_region_name = "",
            cancelModel.carrier_tn = "",
            cancelModel.carton_id = null,
            await cancelModel.save();
            res.status(400).json({
                "retcode": 0,
                "message": "Carton is canceled."
            })
        } catch (error) {
            console.log("update one error", error);
            res.status(500).json({
                "retcode": -1203004,
                "message": error
            })
        }
    }
    
    
}   

module.exports = { repackCreate, repackUpdate, repackCancel }
