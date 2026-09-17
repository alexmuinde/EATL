import mongoose from 'mongoose';

const vesselDischargeRateReportSchema = new mongoose.Schema(
  {
    userReference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Section 1: Fixed Inputs (No dynamic add functionality)
    vesselName: { type: String, default: '' },
    dateOfReport: { type: String, default: '' },
    berthNumber: { type: String, default: '' },
    shipTanks: { type: String, default: '' },
    product: { type: String, default: '' },
    cargoGradeBillOfLading: { type: String, default: '' },

    // Section 2: Dynamic Discharge Rate Entries
    dischargeEntries: [
      {
        todaysDate: { type: String, default: '' },
        times: { type: String, default: '' },
        manifoldNumber: { type: String, default: '' },
        manifoldPressure: { type: String, default: '' },
        Temperature: { type: String, default: '' },
        cargoRemainingOnBoard: { type: String, default: '' },
        totalDischarge: { type: String, default: '' },
        dischargeRates: { type: String, default: '' },
      },
    ],
  },
  { timestamps: true }
);

const VesselDischargeRateReport =
  mongoose.models.VesselDischargeRateReport ||
  mongoose.model('VesselDischargeRateReport', vesselDischargeRateReportSchema);

export default VesselDischargeRateReport;