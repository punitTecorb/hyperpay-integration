import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import hyperController from '@controllers/customer/hyperPay';

// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    NormalCheckout: '/NormalCheckout',
    verifypayment:'/verifypayment',
    refundPayment:'/refundPayment'
} as const;

/////////////////////// Normal Checkout ///////////////////////
router.post(p.NormalCheckout, async (req: any, res: Response) => {
    const data = await hyperController.NormalCheckout(req.body);
    return res.status(OK).send({ data, code: OK, message:'success',result:data});
});

router.post(p.verifypayment, async (req: any, res: Response) => {
    const data = await hyperController.verifypayment(req.body);
    return res.status(OK).send({ data, code: OK, message:'success',result:data});
});

router.post(p.refundPayment, async (req: any, res: Response) => {
    const data = await hyperController.refundPayment(req.body);
    return res.status(OK).send({ data, code: OK, message:'success',result:data});
});

// Export default
export default router;