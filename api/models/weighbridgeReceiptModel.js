import mongoose from 'mongoose';

const weighbridgeReceiptSchema = new mongoose.Schema(
  {
    userReference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Header & Basic Info
    weighbridgeReceipt: { type: String, default: '' },
    truckNumber: { type: String, default: '' },
    dayIn: { type: String, default: '' },
    dayOut: { type: String, default: '' },
    timeIn: { type: String, default: '' },
    timeOut: { type: String, default: '' },
    transpoter: { type: String, default: '' },

    // General Loading Details
    client: { type: String, default: '' },
    vessel: { type: String, default: '' },
    product: { type: String, default: '' },
    tankNumber: { type: String, default: '' },
    temperature: { type: String, default: '' },
    loadingTemperature: { type: String, default: '' },

    // Loading Details
    firstCompatment: { type: String, default: '' },
    totalDips: { type: String, default: '' },
    firstCompatmentSeal: { type: String, default: '' },

    // Weight Analysis
    modeOfTransport: { type: String, default: '' },
    grossWeight: { type: String, default: '' },
    tareWeight: { type: String, default: '' },
    netWeight: { type: String, default: '' },
    inspectedBy: { type: String, default: '' },
    timeChecked: { type: String, default: '' },
    firstProduct: { type: String, default: '' },

    // Approvals & Signatures
    weighingPersonnel: { type: String, default: '' },
    cargoSurveyor: { type: String, default: '' },
    customsPersonnel: { type: String, default: '' },
    deliverySupervisor: { type: String, default: '' },
    driversName: { type: String, default: '' },
  },
  { timestamps: true }
);

const WeighbridgeReceipt = mongoose.model('WeighbridgeReceipt', weighbridgeReceiptSchema);

export default WeighbridgeReceipt;