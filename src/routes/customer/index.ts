import { Router } from 'express';
import hyperPay from './hyperPay';
const baseRouter = Router();
console.log("enter1")

// Setup routers
baseRouter.use('/hyperPay', hyperPay);


// Export default.
export default baseRouter;