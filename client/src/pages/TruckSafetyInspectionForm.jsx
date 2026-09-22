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

export default function TruckSafetyInspectionForm() {
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
        const res = await fetch(`/api/createDoc/truckSafetyInspectionForm/get/${id}`);
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
        ? `/api/createDoc/truckSafetyInspectionForm/${id}`
        : '/api/createDoc/truckSafetyInspectionForm';

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
        navigate(`/truckSafetyInspectionForm/${savedDocId}`);
      }
    } catch (err) {
      dispatch(saveDocFailure(err.message || 'An error occurred while submitting.'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-2 grid grid-cols-1 gap-2 md:grid-cols-2">
      <div className="md:col-span-2">
        <h1 className="text-xl font-medium p-2 text-center">VEG OIL TERMINAL</h1>
        <h2 className="p-2 text-center">TRUCK SAFETY INSPECTION FORM</h2>
      </div>

      {/* BASIC INFO */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl md:col-span-2">
        <div>
          <label htmlFor="todaysDate" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Todays Date
          </label>
          <input
            onChange={handleChange}
            id="todaysDate"
            type="date"
            value={formData.todaysDate || ''}
            placeholder="Todays Date"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="timeIn" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            timeIn
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
          <label htmlFor="driversName" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Drivers Name
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
      <div className="gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className="col-span-2 border-b-2 border-gray-100">
          <h3 className="font-medium text-wrap p-2 text-center">PARTICULARS</h3>
        </div>

        <p className="p-1">1. The driver has a valid driving license.</p>
        <p className="p-1">2. There is no leakage of oil from any of its parts.</p>
        <p className="p-1">3. There is a serviceable fire extinguisher in place.</p>
        <p className="p-1">4. the tyre wedges , chocks, are on board and in good condition.</p>
        <p className="p-1">5. Driver is not under medication, intoxicated or carrying any weapons that endangers traffic and people in the facility, observation only.</p>
        <p className="p-1">6. Driver must put on PPEs, reflector, safety shoes, safety goggles and safety helmet.</p>
        <p className="p-1">7. Vehicle in good condition, lights, side mirrors, windscreen, horn, wiper, reverse alarm and brakes, steps, no damages or dangling parts.</p>
        <p className="p-1">8. No additional weights that can manipulate tare weight.</p>
        <p className="p-1">
          <strong className="text-red-500">
            NOTE: If any of the above particulars are missing, truck should not be allowed in and EHS Dept be informed immediately for discretion
          </strong>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className="col-span-2">
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
      </div>

      {error && <p className="text-red-500 md:col-span-2">{error}</p>}

      <button
        disabled={loading}
        type="submit"
        className="bg-slate-400 rounded-md p-2 hover:bg-slate-500 w-full md:col-span-2 text-white font-medium cursor-pointer disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}