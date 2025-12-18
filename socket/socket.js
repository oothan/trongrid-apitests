const tronweb = require("../tronweb/tronweb");

module.exports = {
    start: (wss) => {
        wss.on("connection", async function connection(w, req) {
            const ip = req.socket.remoteAddress;

            try {
                const contractAddr = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
                let contract = await tronweb.contract().at(contractAddr);
                await contract.Transfer().watch((err, event) => {
                    if(err)
                        return console.error('Error with "Message" event: ', err);

                    console.group('new event received');
                    w.send(JSON.stringify({
                        "contract": event.contract,
                        "event_name": event.name,
                        "transaction": event.transaction,
                        "block": event.block,
                        "from_address": tronweb.address.fromHex(event.result.from),
                        "to_address": tronweb.address.fromHex(event.result.to),
                        "amount": event.result.value / 1000000,
                    }));
                })
            } catch (e) {
                console.error(e)
            }
        })
    }
}
