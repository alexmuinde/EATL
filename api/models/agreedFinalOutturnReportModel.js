import mongoose from 'mongoose';

const agreedFinalOutturnReportSchema = new mongoose.Schema(
  {
    userReference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Basic Info
    todaysDate: { type: String, default: '' },
    tankNumber: { type: String, default: '' },
    overallDip: { type: String, default: '' },
    vessel: { type: String, default: '' },
    product: { type: String, default: '' },

    // Single Dipping Section
    dippingTime: { type: String, default: '' },
    productDip: { type: String, default: '' },
    temperature: { type: String, default: '' },
    density: { type: String, default: '' },
    observedVolume: { type: String, default: '' },
    weightInAir: { type: String, default: '' },
  },
  { timestamps: true }
);

const AgreedFinalOutturnReport =
  mongoose.models.AgreedFinalOutturnReport ||
  mongoose.model('AgreedFinalOutturnReport', agreedFinalOutturnReportSchema);

export default AgreedFinalOutturnReport;