const db = require("../models/models");
const { tronWeb } = require("../tronweb/tronweb");
const { web3 } = require("web3");
const assert = require("assert");

exports.getTRXUSDTBalance = async (req, res) => {
    try {
        if (!req.body.address) {
            res.json({
                err_code: 412,
                err_msg: "to_address field is required"
            });
        }
        const contract = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

        // set the owner address
    } catch (e) {
        res.json({
            err_code: 500,
            err_msg: e
        });
    }
}
