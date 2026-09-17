import mongoose from 'mongoose';

const truckSafetyInspectionFormSchema = new mongoose.Schema(
  {
    userReference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Basic Info
    todaysDate: { type: String, default: '' },
    timeIn: { type: String, default: '' },
    truckNumber: { type: String, default: '' },
    driversName: { type: String, default: '' },
    transpoter: { type: String, default: '' },

    // Inspection Details & Signatures
    tareWeight: { type: String, default: '' },
    securityName: { type: String, default: '' },
  },
  { timestamps: true }
);

const TruckSafetyInspectionForm = mongoose.models.TruckSafetyInspectionForm || 
  mongoose.model('TruckSafetyInspectionForm', truckSafetyInspectionFormSchema);

export default TruckSafetyInspectionForm;