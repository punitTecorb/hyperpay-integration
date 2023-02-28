import moment from 'moment-timezone';
import express from 'express';
import https from 'https';
import querystring from 'querystring';
const router = express.Router();

// Checkout api for normal & apple pay
function NormalCheckout(data:any):Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const req_data = data;
            var merchantId = req_data.merchantId;// Unique Identifire         
            var path = '/v1/checkouts';
            const obj:any = {
                "testMode":'EXTERNAL',
                "entityId": req_data.entityId,// According to card
                "merchantTransactionId": merchantId,
                "amount": req_data.amount,
                "currency": req_data.currency,
                "paymentType": 'DB',
                "billing.street1": req_data.street1,
                "billing.city": req_data.city,
                "billing.state":req_data.state,
                "billing.country":'SA',
                "billing.postcode":req_data.postcode,
                "customer.givenName":req_data.givenName,
                "customer.surname":req_data.surname
            }

            if (req_data.regId) { // if registration number is available
               obj.registrations[0].id= req_data.regId;
            }
            var obj_data= querystring.stringify(obj);
            var options = {
                port: 443,
                host: 'test.oppwa.com',//eu-prod.oppwa.com for production
                path: path,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': obj_data.length,
                    Authorization: 'Bearer your token' // provided by hyperPay
                },
            };
            var postRequest = https.request(options, function(res1) {
                res1.setEncoding('utf8');
                res1.on('data', async(chunk) => {
                    var jsonRes = JSON.parse(chunk);
                    resolve(jsonRes);
                });
            });
            postRequest.write(obj_data);
            postRequest.end();
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

function verifypayment(data:any):Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const paymentId =data.paymentId;            
            var path = 'https://test.oppwa.com/v1/checkouts/'+paymentId+'/payment';//For live 'https://eu-prod.oppwa.com/v1/checkouts/'+paymentId+'/payment';
            var postRequest = https.request(path, function(res1) {
                res1.setEncoding('utf8');
                res1.on('data', async(chunk) => {    
                    resolve(chunk);                    
                });
            });
            postRequest.end();
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

function refundPayment(data:any):Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const req_data = data;
            const path = '/v1/payments/' + req_data.paymentId; // you got paymentId from payment detail
            const refundPayment = {
                'entityId': req_data.entityId, // use entityId which one is used for payment card
                'amount': parseInt(req_data.amount), // Refund amount
                'currency': req_data.currency, // currency
                'paymentType': 'RF'
            };
            var obj_data = querystring.stringify(refundPayment);
            var options = {
                port: 443,
                host: 'test.oppwa.com',// For live - eu-prod.oppwa.com 
                path: path,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': obj_data.length,
                    Authorization: 'Bearer Your token', // provided by hyperpay
                },
            };
            var postRequest = https.request(options, function(res1) {
                res1.setEncoding('utf8');

                res1.on('data', async(chunk) => {
                    var jsonRes = JSON.parse(chunk);                    
                });
            });
            postRequest.write(obj_data);
            postRequest.end();
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}


// New payment getway end here

export default {
    NormalCheckout,
    verifypayment,
    refundPayment
} as const;