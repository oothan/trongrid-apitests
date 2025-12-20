const TronWeb = require('tronweb');

let fullNodeUrl = process.env.TRONGRID_ENDPOINT;
let apiKey = process.env.TRONGRID_KEY;

const httpProvider = TronWeb.providers.HttpProvider;
const tronNode = new httpProvider(fullNodeUrl);
const etherNode = new httpProvider(fullNodeUrl);
const eventServer = new httpProvider(fullNodeUrl);

const tronWeb = new TronWeb(tronNode, etherNode, eventServer);
tronWeb.setHeader({"TRON-PRO-API-KEY": apiKey});

module.exports = tronWeb;
