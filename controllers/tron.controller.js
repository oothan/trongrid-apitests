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
        const contractAddr = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

        // set the owner address
        let isAddress = await tronWeb.isAddress(req.body.address);
        if (!isAddress) {
            res.json({
                err_code: 412,
                err_msg: "to_address is invalid"
            })
        }
        tronWeb.setAddress(req.body.address);

        // sign contract
        let contract = await tronWeb.contract().at(contractAddr);
        let balance = await contract.balanceOf(req.body.address).call();
    } catch (e) {
        res.json({
            err_code: 500,
            err_msg: e
        });
    }
}
