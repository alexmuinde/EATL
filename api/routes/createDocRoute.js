import express from 'express';
import { 
  genericUpsert, 
  genericGetDoc, 
  getUserDocuments, 
  getAllDocuments,
  searchAllDocuments 
} from '../controllers/genericController.js';

import TruckMovementDocument from '../models/truckMovementDocumentModel.js';
import WeighbridgeReceipt from '../models/weighbridgeReceiptModel.js';
import TruckSafetyInspectionForm from '../models/truckSafetyInspectionFormModel.js';
import ShoreTankQuantityReport from '../models/shoreTankQuantityReportModel.js';
import AgreedFinalOutturnReport from '../models/agreedFinalOutturnReportModel.js';
import StatementOfFactsReport from '../models/statementOfFactsReportModel.js';
import VesselDischargeRateReport from '../models/vesselDischargeRateReportModel.js';

import verifyToken from '../utils/verifyUser.js';

const router = express.Router();

const allDocumentModels = {
  truckMovementDocument: TruckMovementDocument,
  weighbridgeReceipt: WeighbridgeReceipt,
  truckSafetyInspectionForm: TruckSafetyInspectionForm,
  shoreTankQuantityReport: ShoreTankQuantityReport,
  agreedFinalOutturnReport: AgreedFinalOutturnReport,
  statementOfFactsReport: StatementOfFactsReport,
  vesselDischargeRateReport: VesselDischargeRateReport,
};

// Route to get all created documents
router.get('/all', verifyToken, getAllDocuments(allDocumentModels));

// Route to search documents by input content values (truck, product, client, etc.)
router.get('/search', verifyToken, searchAllDocuments(allDocumentModels));

// Route to get user specific documents
router.get('/userDocuments/:id', verifyToken, getUserDocuments(allDocumentModels));

// Truck Movement Document
router.post('/truckMovementDocument', verifyToken, genericUpsert(TruckMovementDocument));
router.put('/truckMovementDocument/:id', verifyToken, genericUpsert(TruckMovementDocument));
router.get('/truckMovementDocument/get/:id', verifyToken, genericGetDoc(TruckMovementDocument));

// Weighbridge Receipt
router.post('/weighbridgeReceipt', verifyToken, genericUpsert(WeighbridgeReceipt));
router.put('/weighbridgeReceipt/:id', verifyToken, genericUpsert(WeighbridgeReceipt));
router.get('/weighbridgeReceipt/get/:id', verifyToken, genericGetDoc(WeighbridgeReceipt));

// Truck Safety Inspection Form
router.post('/truckSafetyInspectionForm', verifyToken, genericUpsert(TruckSafetyInspectionForm));
router.put('/truckSafetyInspectionForm/:id', verifyToken, genericUpsert(TruckSafetyInspectionForm));
router.get('/truckSafetyInspectionForm/get/:id', verifyToken, genericGetDoc(TruckSafetyInspectionForm));

// Shore Tank Quantity Report
router.post('/shoreTankQuantityReport', verifyToken, genericUpsert(ShoreTankQuantityReport));
router.put('/shoreTankQuantityReport/:id', verifyToken, genericUpsert(ShoreTankQuantityReport));
router.get('/shoreTankQuantityReport/get/:id', verifyToken, genericGetDoc(ShoreTankQuantityReport));

// Agreed Final Outturn Report
router.post('/agreedFinalOutturnReport', verifyToken, genericUpsert(AgreedFinalOutturnReport));
router.put('/agreedFinalOutturnReport/:id', verifyToken, genericUpsert(AgreedFinalOutturnReport));
router.get('/agreedFinalOutturnReport/get/:id', verifyToken, genericGetDoc(AgreedFinalOutturnReport));

// Statement Of Facts Report
router.post('/statementOfFactsReport', verifyToken, genericUpsert(StatementOfFactsReport));
router.put('/statementOfFactsReport/:id', verifyToken, genericUpsert(StatementOfFactsReport));
router.get('/statementOfFactsReport/get/:id', verifyToken, genericGetDoc(StatementOfFactsReport));

// Vessel Discharge Rate Report
router.post('/vesselDischargeRateReport', verifyToken, genericUpsert(VesselDischargeRateReport));
router.put('/vesselDischargeRateReport/:id', verifyToken, genericUpsert(VesselDischargeRateReport));
router.get('/vesselDischargeRateReport/get/:id', verifyToken, genericGetDoc(VesselDischargeRateReport));

export default router;