import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchDocStart,
  fetchDocSuccess,
  fetchDocFailure,
  saveDocStart,
  saveDocSuccess,
  saveDocFailure,
} from '../redux/document/documentSlice';

export default function WeighbridgeReceipt() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.document);
  const [formData, setFormData] = useState({});

  // Fetch document data on page mount if ID exists in URL
  useEffect(() => {
    if (!id) return;

    const fetchDocument = async () => {
      try {
        dispatch(fetchDocStart());
        const res = await fetch(`/api/createDoc/weighbridgeReceipt/get/${id}`);
        const data = await res.json();

        if (data.success === false) {
          dispatch(fetchDocFailure(data.message));
          return;
        }

        setFormData(data);
        dispatch(fetchDocSuccess(data));
      } catch (err) {
        dispatch(fetchDocFailure(err.message || 'Failed to fetch document details.'));
      }
    };

    fetchDocument();
  }, [id, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(saveDocStart());

      // Dynamic HTTP Method & Endpoint configuration
      const isUpdating = Boolean(id);
      const method = isUpdating ? 'PUT' : 'POST';
      const endpoint = isUpdating
        ? `/api/createDoc/weighbridgeReceipt/${id}`
        : '/api/createDoc/weighbridgeReceipt';

      // Clean payload: strip internal database metadata before sending
      const payload = { ...formData };
      delete payload._id;
      delete payload.__v;
      delete payload.createdAt;
      delete payload.updatedAt;
      delete payload.userReference;

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(saveDocFailure(data.message));
        return;
      }

      dispatch(saveDocSuccess(data));

      // Extract target ID from returned data wrapper
      const savedDocId = data.data?._id || data._id || id;

      // If creating a fresh entry, navigate to the newly created document URL
      if (!id && savedDocId) {
        navigate(`/weighbridgeReceipt/${savedDocId}`);
      }
    } catch (err) {
      dispatch(saveDocFailure(err.message || 'An error occurred while submitting.'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-2 grid grid-cols-1 gap-2 md:grid-cols-2">
      <div className="md:col-span-2">
        <h1 className="text-xl font-medium p-2 text-center">BULKSTREAM LIMITED</h1>
        <h2 className="p-2 text-center">WEIGHBRIDGE RECEIPT</h2>
      </div>

      {/* BASIC INFO */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl md:col-span-2">
        <div>
          <label htmlFor="weighbridgeReceipt" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Weighbridge Receipt
          </label>
          <input
            onChange={handleChange}
            id="weighbridgeReceipt"
            type="text"
            value={formData.weighbridgeReceipt || ''}
            placeholder="Weighbridge Receipt"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="truckNumber" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Truck Number
          </label>
          <input
            onChange={handleChange}
            id="truckNumber"
            type="text"
            value={formData.truckNumber || ''}
            placeholder="Truck Number"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="dayIn" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Day In
          </label>
          <input
            onChange={handleChange}
            id="dayIn"
            type="date"
            value={formData.dayIn || ''}
            placeholder="Day In"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="dayOut" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Day Out
          </label>
          <input
            onChange={handleChange}
            id="dayOut"
            type="date"
            value={formData.dayOut || ''}
            placeholder="Day Out"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="timeIn" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Time In
          </label>
          <input
            onChange={handleChange}
            id="timeIn"
            type="time"
            value={formData.timeIn || ''}
            placeholder="Time In"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="timeOut" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Time Out
          </label>
          <input
            onChange={handleChange}
            id="timeOut"
            type="time"
            value={formData.timeOut || ''}
            placeholder="Time Out"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="transpoter" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Transporter
          </label>
          <input
            onChange={handleChange}
            id="transpoter"
            type="text"
            value={formData.transpoter || ''}
            placeholder="Transporter"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>
      </div>

      {/* GENERAL LOADING DETAILS */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className="col-span-2 border-b-2 border-gray-100">
          <h3 className="font-medium text-wrap p-2 text-center">GENERAL LOADING DETAILS</h3>
        </div>

        <div>
          <label htmlFor="client" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Client
          </label>
          <input
            onChange={handleChange}
            id="client"
            type="text"
            value={formData.client || ''}
            placeholder="Client"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="vessel" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Vessel
          </label>
          <input
            onChange={handleChange}
            id="vessel"
            type="text"
            value={formData.vessel || ''}
            placeholder="Vessel"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="product" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Product
          </label>
          <input
            onChange={handleChange}
            id="product"
            type="text"
            value={formData.product || ''}
            placeholder="Product"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="tankNumber" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Tank Number
          </label>
          <input
            onChange={handleChange}
            id="tankNumber"
            type="text"
            value={formData.tankNumber || ''}
            placeholder="Tank Number"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="temperature" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Temperature
          </label>
          <input
            onChange={handleChange}
            id="temperature"
            type="text"
            value={formData.temperature || ''}
            placeholder="Temperature"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="loadingTemperature" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Loading Temperature
          </label>
          <input
            onChange={handleChange}
            id="loadingTemperature"
            type="text"
            value={formData.loadingTemperature || ''}
            placeholder="Loading Temperature"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>
      </div>

      {/* LOADING DETAILS */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className="col-span-2 border-b-2 border-gray-100">
          <h3 className="font-medium text-wrap p-2 text-center">LOADING DETAILS</h3>
        </div>

        <div className="col-span-2">
          <label htmlFor="firstCompatment" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            First Compartment
          </label>
          <input
            onChange={handleChange}
            id="firstCompatment"
            type="text"
            value={formData.firstCompatment || ''}
            placeholder="First Compartment"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="totalDips" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Total Dips
          </label>
          <input
            onChange={handleChange}
            id="totalDips"
            type="text"
            value={formData.totalDips || ''}
            placeholder="Total Dips"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="firstCompatmentSeal" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            First Compartment Seal
          </label>
          <input
            onChange={handleChange}
            id="firstCompatmentSeal"
            type="text"
            value={formData.firstCompatmentSeal || ''}
            placeholder="First Compartment Seal"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>
      </div>

      {/* WEIGHT ANALYSIS */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className="col-span-2 border-b-2 border-gray-100">
          <h3 className="font-medium text-wrap p-2 text-center">WEIGHT ANALYSIS</h3>
        </div>

        <div>
          <label htmlFor="modeOfTransport" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Mode Of Transport
          </label>
          <input
            onChange={handleChange}
            id="modeOfTransport"
            type="text"
            value={formData.modeOfTransport || ''}
            placeholder="Mode Of Transport"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="grossWeight" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Gross Weight
          </label>
          <input
            onChange={handleChange}
            id="grossWeight"
            type="text"
            value={formData.grossWeight || ''}
            placeholder="Gross Weight"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="tareWeight" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Tare Weight
          </label>
          <input
            onChange={handleChange}
            id="tareWeight"
            type="text"
            value={formData.tareWeight || ''}
            placeholder="Tare Weight"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="netWeight" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Net Weight
          </label>
          <input
            onChange={handleChange}
            id="netWeight"
            type="text"
            value={formData.netWeight || ''}
            placeholder="Net Weight"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="inspectedBy" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Inspected By
          </label>
          <input
            onChange={handleChange}
            id="inspectedBy"
            type="text"
            value={formData.inspectedBy || ''}
            placeholder="Inspected By"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="timeChecked" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Time Checked
          </label>
          <input
            onChange={handleChange}
            id="timeChecked"
            type="time"
            value={formData.timeChecked || ''}
            placeholder="Time Checked"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="firstProduct" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Product
          </label>
          <input
            onChange={handleChange}
            id="firstProduct"
            type="text"
            value={formData.firstProduct || ''}
            placeholder="Product"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>
      </div>

      {/* WEIGHING PERSONNEL */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className="col-span-2 border-b-2 border-gray-100">
          <h3 className="font-medium text-wrap p-2 text-center">WEIGHING PERSONNEL</h3>
        </div>
        <div className="col-span-2">
          <label htmlFor="weighingPersonnel" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Weighing Personnel
          </label>
          <input
            onChange={handleChange}
            id="weighingPersonnel"
            type="text"
            value={formData.weighingPersonnel || ''}
            placeholder="Weighing Personnel"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>
      </div>

      {/* CARGO SURVEYOR */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className="col-span-2 border-b-2 border-gray-100">
          <h3 className="font-medium text-wrap p-2 text-center">CARGO SURVEYOR</h3>
        </div>
        <div className="col-span-2">
          <label htmlFor="cargoSurveyor" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Cargo Surveyor
          </label>
          <input
            onChange={handleChange}
            id="cargoSurveyor"
            type="text"
            value={formData.cargoSurveyor || ''}
            placeholder="Cargo Surveyor"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>
      </div>

      {/* CUSTOMS APPROVAL */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className="col-span-2 border-b-2 border-gray-100">
          <h3 className="font-medium text-wrap p-2 text-center">CUSTOMS APPROVAL</h3>
        </div>
        <div className="col-span-2">
          <label htmlFor="customsPersonnel" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Customs Personnel
          </label>
          <input
            onChange={handleChange}
            id="customsPersonnel"
            type="text"
            value={formData.customsPersonnel || ''}
            placeholder="Customs Personnel"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>
      </div>

      {/* DELIVERY SUPERVISOR */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className="col-span-2 border-b-2 border-gray-100">
          <h3 className="font-medium text-wrap p-2 text-center">DELIVERY SUPERVISOR</h3>
        </div>
        <div className="col-span-2">
          <label htmlFor="deliverySupervisor" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Delivery Supervisor
          </label>
          <input
            onChange={handleChange}
            id="deliverySupervisor"
            type="text"
            value={formData.deliverySupervisor || ''}
            placeholder="Delivery Supervisor"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>
      </div>

      {/* TRUCK DRIVER */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className="col-span-2 border-b-2 border-gray-100">
          <h3 className="font-medium text-wrap p-2 text-center">TRUCK DRIVER</h3>
        </div>
        <div className="col-span-2">
          <label htmlFor="driversName" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Driver's Name
          </label>
          <input
            onChange={handleChange}
            id="driversName"
            type="text"
            value={formData.driversName || ''}
            placeholder="Drivers Name"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>
      </div>

      {error && <p className="text-red-500 md:col-span-2">{error}</p>}

      <button
        disabled={loading}
        type="submit"
        className="bg-slate-400 rounded-md p-2 hover:bg-slate-500 w-full md:col-span-2 text-white font-medium disabled:opacity-50 cursor-pointer"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}