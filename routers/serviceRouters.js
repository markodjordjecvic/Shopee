const express = require('express');
const router = express.Router();

const { createOrder, updateOrder, cancelOrder, parcelInfo, preAlert } = require('../controllers/orderController')


router.post("/ilh_shipment/create", createOrder);
router.post("/ilh_shipment/update", updateOrder);
router.post("/ilh_shipment/cancel", cancelOrder);
router.post("/ilh_shipment/push_info", parcelInfo);
router.post("/ilh_shipment/pre-alert", preAlert);

module.exports = router;