## HyperPay payment getway in nodejs using TypeScript

## Introduction
    HyperPay payment getway in node js using TypeScript.HyperPay payment getway used for payment in soudi. HyperPay payment getway provide method for create checkout,verify Payment and Refund payment.

    1. Create checkout methods-:
        Create checkout method used for create checkoutId. For create checkout we need to provide entityId,Payment Amount,
        merchantId,currency,user givenName, user surname,user postcode, user state,user city,user street,user country and hyperPay authorization token.

    2. Verify payment method -:
        Verify payment method used for verify payment like - Transaction pending/done/cancel.For verify payment we need to provide paymentId.we get paymentId after complete payment process.

    3. Refund payment method -:
        Refund payment method used for refund payment to customer. For refund payment we need to provide paymentId(get from payment details),refund amount,entityId(payment entityId according to card),currency,hyperpay authorization token
    
      
## Setup Steps:
  ### Install project dependency
  `npm install`
  ### local server
  `npm run start:dev`
  ### prod build
  `npm run build`
  ### prod build run
  `node dist/index.js`

## Hyperpay demo payment apis - 
  #### Checkout api for normal/ApplePay checkout
  `{{Your Ip}}/api/v1/hyperPay/NormalCheckout`

  #### Hyperpay payment verify api
  `{{Your Ip}}/api/v1/hyperPay/verifypayment`

  #### Hyperpay refund api
  `{{Your Ip}}/api/v1/hyperPay/refundPayment`