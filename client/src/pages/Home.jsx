import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllDocuments = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('/api/createDoc/all');
        const data = await res.json();

        if (data.success === false) {
          setError(data.message);
          setLoading(false);
          return;
        }

        const sortedDocs = (data || []).sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        setDocuments(sortedDocs);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch documents.');
        setLoading(false);
      }
    };

    fetchAllDocuments();
  }, []);

  const getDocumentTitle = (doc) => {
    if (doc.docType === 'weighbridgeReceipt') return 'WEIGHBRIDGE RECEIPT';
    if (doc.docType === 'vesselDischargeRateReport') return 'VESSEL DISCHARGE RATE REPORT';
    if (doc.docType === 'statementOfFactsReport') return 'STATEMENT OF FACTS REPORT';
    if (doc.docType === 'truckSafetyInspectionForm') return 'TRUCK SAFETY INSPECTION FORM';
    if (doc.docType === 'truckMovementDocument') return 'TRUCK MOVEMENT DOCUMENT';
    if (doc.docType === 'shoreTankQuantityReport') return 'SHORE TANK QUANTITY REPORT';
    if (doc.docType === 'agreedFinalOutturnReport') return 'AGREED FINAL OUTTURN REPORT';
    return doc.docType?.toUpperCase() || 'DOCUMENT';
  };

  const getSummaryFields = (doc) => {
  const fields = [];

  if (doc.docType === 'truckMovementDocument') {
    if (doc.firstTruckNumber || doc.secondTruckNumber || doc.truckNumber) {
      fields.push({
        label: 'Truck No',
        value: doc.firstTruckNumber || doc.secondTruckNumber || doc.truckNumber,
      });
    }
    if (doc.driversName) {
      fields.push({ label: 'Driver', value: doc.driversName });
    }
    if (doc.transporter) {
      fields.push({ label: 'Transporter', value: doc.transporter });
    }
    if (doc.firstClient || doc.secondClient || doc.client) {
      fields.push({
        label: 'Client',
        value: doc.firstClient || doc.secondClient || doc.client,
      });
    }
    if (doc.firstProduct || doc.secondProduct || doc.thirdProduct) {
      fields.push({
        label: 'Product',
        value: doc.firstProduct || doc.secondProduct || doc.thirdProduct,
      });
    }
    if (doc.firstTodaysDate || doc.secondTodaysDate || doc.thirdTodaysDate) {
      fields.push({
        label: 'Date',
        value: doc.firstTodaysDate || doc.secondTodaysDate || doc.thirdTodaysDate,
      });
    }

    return fields.slice(0, 3);
  }

  // Fallback for other document types
  if (doc.weighbridgeReceipt) fields.push({ label: 'Receipt No', value: doc.weighbridgeReceipt });
  if (doc.truckNumber || doc.firstTruckNumber) fields.push({ label: 'Truck No', value: doc.truckNumber || doc.firstTruckNumber });
  if (doc.vesselName || doc.vessel) fields.push({ label: 'Vessel', value: doc.vesselName || doc.vessel });
  if (doc.product || doc.firstProduct) fields.push({ label: 'Product', value: doc.product || doc.firstProduct });
  if (doc.portName) fields.push({ label: 'Port', value: doc.portName });
  if (doc.todaysDate || doc.dateOfReport || doc.firstTodaysDate) {
    fields.push({ label: 'Date', value: doc.todaysDate || doc.dateOfReport || doc.firstTodaysDate });
  }

  return fields.slice(0, 3);
};

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col gap-4 border-b-2 border-gray-200 p-4 shadow-md hover:shadow-xl bg-white">
        <div className="p-2 w-full border-b-2 border-gray-100">
          <h4 className="text-center font-bold uppercase text-gray-800 text-lg">
            All Recent Documents
          </h4>
        </div>

        {loading && <p className="text-center text-gray-500 text-sm">Loading documents...</p>}
        {error && <p className="text-center text-red-500 text-sm">{error}</p>}

        {!loading && documents.length === 0 && (
          <p className="text-center text-gray-500 text-sm">No documents found.</p>
        )}

        <div className="flex flex-col gap-3 max-h-[70vh] overflow-y-auto pr-1">
          {documents.map((doc) => {
            const summary = getSummaryFields(doc);
            const creatorUsername = doc.userReference?.username || 'Unknown User';

            return (
              <div
                key={doc._id}
                onClick={() => navigate(`/${doc.docType}/${doc._id}`)}
                className="flex flex-col gap-2 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl hover:border-blue-500 cursor-pointer transition-all"
              >
                <div className="flex justify-between items-center border-b pb-1">
                  <span className="font-semibold text-blue-600 text-xs">
                    {getDocumentTitle(doc)}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    By: <span className="font-semibold text-gray-700">{creatorUsername}</span>
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  {summary.map((item, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-[10px] font-semibold text-gray-500 uppercase">
                        {item.label}
                      </span>
                      <span className="text-xs text-gray-800 truncate font-medium">
                        {item.value || 'N/A'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}