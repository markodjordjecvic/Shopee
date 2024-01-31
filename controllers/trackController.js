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
    const hasedObject = hashDecode(req.body.data);
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
        if( !carrier_tn ||
            !op_code ||
            !update_time ||
            !op_location ||
            !op_location_code ||
            !transport_type ||
            !etd ||
            !eta){
                return res.status(400).json({
                    "retcode": -1200012,
                    "message": "Please check input field"
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

const billTrack = async (req, res) => {
    const hasedObject = hashDecode(req.body.data);
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
        if( !landing_bill ||
            !op_code ||
            !update_time ||
            !op_location ||
            !op_location_code ||
            !transport_type ||
            !etd ||
            !eta){
                return res.status(400).json({
                    "retcode": -1200012,
                    "message": "Please check input field"
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

const containerTrack = async (req, res) => {
    const hasedObject = hashDecode(req.body.data);
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

    if (!landing_bill ||
        !container_no ||
        !op_code ||
        !update_time ||
        !op_location ||
        !op_location_code ||
        !transport_type ||
        !etd ||
        !eta) {
        res.status(400).json({
            "retcode": -1200012,
            "message": "Please check input value."
        });
    }

    const newContainerTrack = new ContainerTrackModel(req.body);
    newContainerTrack.save();
    res.status(200).json({
        "retcode": 0,
        "message": "Received Container Track Info."
    })
}

const parcelTrack = async (req, res) => {
    const hasedObject = hashDecode(req.body.data);
    const {
        sls_tn ,
        op_code,
        op_time,
        time_zone,
        transport_type,
        op_location_code,
    } = hasedObject.data;

    if (!sls_tn ||
        !op_code ||
        !op_time ||
        !time_zone ||
        !transport_type ||
        !op_location_code) {
        res.status(400).json({
            "retcode": -1200012,
            "message": "Please check input value."
        });
    }

    const newParcelTrack = new ParcelTrackModel(req.body);
    newParcelTrack.save();
    res.status(200).json({
        "retcode": 0,
        "message": "Received parcel Track Info."
    })
}

const customTrack = async (req, res) => {
    const hasedObject = hashDecode(req.body.data);
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
            if( !reference_no ||
                !clear_type ||
                !op_time ||
                !op_location ||
                !event_code) {
                    return res.status(400).json({
                        "retcode": -1200012,
                        "message": "Please check input field"
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

module.exports = { cartonTrack, billTrack, containerTrack, parcelTrack, customTrack }