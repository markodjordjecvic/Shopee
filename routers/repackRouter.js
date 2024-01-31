const express = require('express');
const router = express.Router();

const { repackCreate, repackUpdate, repackCancel} = require('../controllers/cartonController');
const {  cartonTrack, billTrack, containerTrack, parcelTrack, customTrack  } = require('../controllers/trackController')

router.post("/repack_create", repackCreate);
router.post("/repack_update", repackUpdate);
router.post("/repack_cancel", repackCancel);
router.post("/lh_tracking", cartonTrack);
router.post("/lh_landing_bill_tracking", billTrack);
router.post("/lh_container_tracking", containerTrack);
router.post("/first_leg/tracking_carton", parcelTrack);
router.post("/push_cc_result", customTrack)


module.exports = router;