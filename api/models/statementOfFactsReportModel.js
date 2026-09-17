import mongoose from 'mongoose';

const statementOfFactsReportSchema = new mongoose.Schema(
  {
    userReference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Section 1: Basic & Dynamic Details
    todaysDate: { type: String, default: '' },
    vessel: { type: String, default: '' },
    portName: { type: String, default: '' },

    // Grouped Products with corresponding Bill of Lading
    products: [
      {
        productName: { type: String, default: '' },
        billOfLading: { type: String, default: '' },
      },
    ],

    // Section 2: Dynamic Statement Entries
    statementEntries: [
      {
        todaysDate: { type: String, default: '' },
        time: { type: String, default: '' },
        particulars: { type: String, default: '' },
      },
    ],
  },
  { timestamps: true }
);

const StatementOfFactsReport =
  mongoose.models.StatementOfFactsReport ||
  mongoose.model('StatementOfFactsReport', statementOfFactsReportSchema);

export default StatementOfFactsReport;