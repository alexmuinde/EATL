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

export default function TruckMovementDocument() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.document);
  const [formData, setFormData] = useState({});

  // 1. Fetch document data on page mount if ID exists in URL
  useEffect(() => {
    if (!id) return;

    const fetchDocument = async () => {
      try {
        dispatch(fetchDocStart());
        const res = await fetch(`/api/createDoc/truckMovementDocument/get/${id}`);
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
        ? `/api/createDoc/truckMovementDocument/${id}`
        : '/api/createDoc/truckMovementDocument';

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
        navigate(`/truckMovementDocument/${savedDocId}`);
      }
    } catch (err) {
      dispatch(saveDocFailure(err.message || 'An error occurred while submitting.'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-2 grid grid-cols-1 gap-2 md:grid-cols-2">
      <div className="md:col-span-2">
        <h1 className="text-xl font-medium p-2 text-center">VEG OIL TERMINAL</h1>
        <h2 className="p-2 text-center">TRUCK MOVEMENT DOCUMENT</h2>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl md:col-span-2">
        <div>
          <label htmlFor="firstTodaysDate" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Today's Date
          </label>
          <input
            onChange={handleChange}
            id="firstTodaysDate"
            type="date"
            value={formData.firstTodaysDate || ''}
            placeholder="Todays Date"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="firstClient" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Client
          </label>
          <input
            onChange={handleChange}
            id="firstClient"
            type="text"
            value={formData.firstClient || ''}
            placeholder="Client"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="firstTruckNumber" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Truck Number
          </label>
          <input
            onChange={handleChange}
            id="firstTruckNumber"
            type="text"
            value={formData.firstTruckNumber || ''}
            placeholder="Truck Number"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="transporter" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Transporter
          </label>
          <input
            onChange={handleChange}
            id="transporter"
            type="text"
            value={formData.transporter || ''}
            placeholder="Transporter"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>
      </div>

      {/* Security Section */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className="col-span-2 border-b-2 border-gray-100">
          <h3 className="font-medium text-wrap p-2 text-center">SECURITY</h3>
        </div>

        <div>
          <label htmlFor="secondTodaysDate" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Today's Date
          </label>
          <input
            onChange={handleChange}
            id="secondTodaysDate"
            type="date"
            value={formData.secondTodaysDate || ''}
            placeholder="Todays Date"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="thirdTodaysDate" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Today's Date
          </label>
          <input
            onChange={handleChange}
            id="thirdTodaysDate"
            type="date"
            value={formData.thirdTodaysDate || ''}
            placeholder="Todays Date"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="secondClient" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Client
          </label>
          <input
            onChange={handleChange}
            id="secondClient"
            type="text"
            value={formData.secondClient || ''}
            placeholder="Client"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="secondTruckNumber" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Truck Number
          </label>
          <input
            onChange={handleChange}
            id="secondTruckNumber"
            type="text"
            value={formData.secondTruckNumber || ''}
            placeholder="Truck Number"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>
      </div>

      {/* Surveyor Section */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className="col-span-2 border-b-2 border-gray-100">
          <h3 className="font-medium text-wrap p-2 text-center">SURVEYOR : SGS/ITS/B VERITAS/PAUPHILE</h3>
        </div>

        <div>
          <label htmlFor="securityName" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Security Name
          </label>
          <input
            onChange={handleChange}
            id="securityName"
            type="text"
            value={formData.securityName || ''}
            placeholder="Security Name"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
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

        <div>
          <label htmlFor="idNumber" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            ID Number
          </label>
          <input
            onChange={handleChange}
            id="idNumber"
            type="text"
            value={formData.idNumber || ''}
            placeholder="ID Number"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="firstTimeIn" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Time In
          </label>
          <input
            onChange={handleChange}
            id="firstTimeIn"
            type="time"
            value={formData.firstTimeIn || ''}
            placeholder="Time In"
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

      {/* Surveyor/Driver/Clerk Section */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className="col-span-2 border-b-2 border-gray-100">
          <h3 className="font-medium text-wrap p-2 text-center">SURVEYOR/DRIVER/CLERK</h3>
        </div>
        <div className="col-span-2">
          <label htmlFor="firstCompartment" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            First Compartment
          </label>
          <input
            onChange={handleChange}
            id="firstCompartment"
            type="text"
            value={formData.firstCompartment || ''}
            placeholder="First Compartment"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>
      </div>

      {/* Weighing Personnel Section */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className="col-span-2 border-b-2 border-gray-100">
          <h3 className="font-medium text-wrap p-2 text-center">WEIGHING PERSONNEL</h3>
        </div>

        <div>
          <label htmlFor="firstName" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Name
          </label>
          <input
            onChange={handleChange}
            id="firstName"
            type="text"
            value={formData.firstName || ''}
            placeholder="Name"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="secondProduct" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Product
          </label>
          <input
            onChange={handleChange}
            id="secondProduct"
            type="text"
            value={formData.secondProduct || ''}
            placeholder="Product"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="secondTimeIn" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Time In
          </label>
          <input
            onChange={handleChange}
            id="secondTimeIn"
            type="time"
            value={formData.secondTimeIn || ''}
            placeholder="Time In"
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
      </div>

      {/* Delivery Supervisor Section 1 */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className="col-span-2 border-b-2 border-gray-100">
          <h3 className="font-medium text-wrap p-2 text-center">DELIVERY SUPERVISOR</h3>
        </div>

        <div>
          <label htmlFor="secondName" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Name
          </label>
          <input
            onChange={handleChange}
            id="secondName"
            type="text"
            value={formData.secondName || ''}
            placeholder="Name"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="thirdProduct" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Product
          </label>
          <input
            onChange={handleChange}
            id="thirdProduct"
            type="text"
            value={formData.thirdProduct || ''}
            placeholder="Product"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="loadingTank" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Loading Tank
          </label>
          <input
            onChange={handleChange}
            id="loadingTank"
            type="text"
            value={formData.loadingTank || ''}
            placeholder="Loading Tank"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="loaderName" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Loader Name
          </label>
          <input
            onChange={handleChange}
            id="loaderName"
            type="text"
            value={formData.loaderName || ''}
            placeholder="Loader Name"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>
      </div>

      {/* Delivery Supervisor Section 2 */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className="col-span-2 border-b-2 border-gray-100">
          <h3 className="font-medium text-wrap p-2 text-center">DELIVERY SUPERVISOR</h3>
        </div>

        <div>
          <label htmlFor="timeOutofBay" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Time Out Of Bay
          </label>
          <input
            onChange={handleChange}
            id="timeOutofBay"
            type="time"
            value={formData.timeOutofBay || ''}
            placeholder="Time Out Of Bay"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="bayNumber" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Bay Number
          </label>
          <input
            onChange={handleChange}
            id="bayNumber"
            type="text"
            value={formData.bayNumber || ''}
            placeholder="Bay Number"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="firstCompartmentSeal" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            First Compartment Seal
          </label>
          <input
            onChange={handleChange}
            id="firstCompartmentSeal"
            type="text"
            value={formData.firstCompartmentSeal || ''}
            placeholder="First Compartment Seal"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>
      </div>

      {/* Dispatch Supervisor Section */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className="col-span-2 border-b-2 border-gray-100">
          <h3 className="font-medium text-wrap p-2 text-center">DISPATCH SUPERVISOR</h3>
        </div>
        <div className="col-span-2">
          <label htmlFor="thirdName" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Name
          </label>
          <input
            onChange={handleChange}
            id="thirdName"
            type="text"
            value={formData.thirdName || ''}
            placeholder="Name"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>
      </div>

      {/* Dispatch Personnel Section */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className="col-span-2 border-b-2 border-gray-100">
          <h3 className="font-medium text-wrap p-2 text-center">DISPATCH PERSONNEL</h3>
        </div>
        <div className="col-span-2">
          <label htmlFor="fourthName" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Name
          </label>
          <input
            onChange={handleChange}
            id="fourthName"
            type="text"
            value={formData.fourthName || ''}
            placeholder="Name"
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