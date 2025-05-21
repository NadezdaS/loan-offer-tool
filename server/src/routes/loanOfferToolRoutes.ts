import express from 'express';
import { handleLoanApplication, getOffers } from '../controllers/loanOfferToolControllers';
import { validateLoanApplication } from '../middleware/validateLoanApplication'

export const loanOfferToolRoutes = express.Router();

loanOfferToolRoutes.post('/loan-application', validateLoanApplication, handleLoanApplication);
loanOfferToolRoutes.get('/lender-offers/:applicationId', getOffers);