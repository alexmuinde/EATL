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

export default function AgreedFinalOutturnReport() {
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
        const res = await fetch(`/api/createDoc/agreedFinalOutturnReport/get/${id}`);
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
        ? `/api/createDoc/agreedFinalOutturnReport/${id}`
        : '/api/createDoc/agreedFinalOutturnReport';

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
        navigate(`/agreedFinalOutturnReport/${savedDocId}`);
      }
    } catch (err) {
      dispatch(saveDocFailure(err.message || 'An error occurred while submitting.'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-2 gap-2">
      <div className="w-full">
        <h1 className="text-xl font-medium p-2 text-center">EAST AFRICAN TERMINAL LIMITED</h1>
        <h2 className="p-2 text-center uppercase">AGREED FINAL OUTTURN REPORT</h2>
      </div>

      {/* BASIC INFO */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl mt-5">
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
          <label htmlFor="overallDip" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Overall Dip
          </label>
          <input
            onChange={handleChange}
            id="overallDip"
            type="text"
            value={formData.overallDip || ''}
            placeholder="Overall Dip"
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

        <div className="col-span-2">
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
      </div>

      {/* SINGLE DIPPING SCHEDULE SECTION */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl mt-2">
        <div className="col-span-2 border-b-2 border-gray-100">
          <h3 className="font-medium text-wrap p-2 text-center uppercase">AGREED FINAL OUTTURN REPORT</h3>
        </div>

        <div>
          <label htmlFor="dippingTime" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Dipping Time
          </label>
          <input
            onChange={handleChange}
            id="dippingTime"
            type="time"
            value={formData.dippingTime || ''}
            placeholder="Dipping Time"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="productDip" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Product Dip
          </label>
          <input
            onChange={handleChange}
            id="productDip"
            type="text"
            value={formData.productDip || ''}
            placeholder="Product Dip"
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
          <label htmlFor="density" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Density
          </label>
          <input
            onChange={handleChange}
            id="density"
            type="text"
            value={formData.density || ''}
            placeholder="Density"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="observedVolume" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Observed Volume
          </label>
          <input
            onChange={handleChange}
            id="observedVolume"
            type="text"
            value={formData.observedVolume || ''}
            placeholder="Observed Volume"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label htmlFor="weightInAir" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Weight In Air
          </label>
          <input
            onChange={handleChange}
            id="weightInAir"
            type="text"
            value={formData.weightInAir || ''}
            placeholder="Weight In Air"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>
      </div>

      {error && <p className="text-red-500 my-2">{error}</p>}

      <button
        disabled={loading}
        type="submit"
        className="bg-slate-400 rounded-md p-2 hover:bg-slate-500 w-full text-white font-medium my-2 disabled:opacity-50 cursor-pointer"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}