const Clients = require("../../../models/Clients")
const AllotedGifts = require('../../../models/AllotedGifts');

module.exports.redeem = async(req, res, next) => {
    const body = req.body;

    if (! body || !Object.keys(body).length || body.constructor !== Object) {
        res.statusCode = 400
        return res.send("Missing all mandatory field ");
    }

    for (let field of [ "flatHouseno", "streetMuncipality", "townCity", "postalCode"]) {
        if (! body[field]){
            res.statusCode=400 
            return res.send("Missing mandatory field " + field);
        }  
    }
    try{

        const allotedgift_id = req.decoded.data;
        const flatHouseno = req.body.flatHouseno; 
        const streetMuncipality = req.body.streetMuncipality;
        const townCity = req.body.townCity;
        const postalCode = req.body.postalCode;
        const landmark = req.body.landmark;

        const allotedgift = await AllotedGifts.findOne({_id:allotedgift_id})
        if(allotedgift.isExpired == false){

            const alloetedGiftAddress = await AllotedGifts.findOneAndUpdate({_id:allotedgift_id},
                {deliveryaddress:flatHouseno +", "+ streetMuncipality + ", "+townCity +", "+ postalCode,
                isRedeemed:true})

            const allotedGiftClient =  await AllotedGifts.findOne({_id:allotedgift_id})   
            const client_id = allotedGiftClient.client_id 
            const clientupdate = await Clients.findOneAndUpdate({_id:client_id},
                {flatHouseno:flatHouseno,streetMuncipality:streetMuncipality,
                    townCity:townCity, postalCode:postalCode, landmark:landmark
                })

            res.send({
                Status:200,
                Message:"Success",
                Data: "Delivery address is successfully updated"
            })          
        } else{
            res.send({
                Status:400,
                Message:"failure",
                Data:"Gift Card has expired"
            })
        }


    }catch(err){
        console.log(err)
        res.send({
            Status: 400,
            Message:"Error",
            Data: "Delivery address is not updated"
        })
    }
}