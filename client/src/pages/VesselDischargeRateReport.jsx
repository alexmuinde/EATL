import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchDocStart,
  fetchDocSuccess,
  fetchDocFailure,
  saveDocStart,
  saveDocSuccess,
  saveDocFailure,
} from '../redux/document/documentSlice'

export default function VesselDischargeRateReport() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading, error } = useSelector((state) => state.document)

  const [formData, setFormData] = useState({
    vesselName: '',
    dateOfReport: '',
    berthNumber: '',
    shipTanks: '',
    product: '',
    cargoGradeBillOfLading: '',
    dischargeEntries: [
      {
        todaysDate: '',
        times: '',
        manifoldNumber: '',
        manifoldPressure: '',
        Temperature: '',
        cargoRemainingOnBoard: '',
        totalDischarge: '',
        dischargeRates: '',
      },
    ],
  })

  useEffect(() => {
    if (!id) return

    const fetchDocument = async () => {
      try {
        dispatch(fetchDocStart())
        const res = await fetch(`/api/createDoc/vesselDischargeRateReport/get/${id}`)
        const data = await res.json()

        if (data.success === false) {
          dispatch(fetchDocFailure(data.message))
          return
        }

        setFormData({
          ...data,
          dischargeEntries: data.dischargeEntries?.length
            ? data.dischargeEntries
            : [
                {
                  todaysDate: '',
                  times: '',
                  manifoldNumber: '',
                  manifoldPressure: '',
                  Temperature: '',
                  cargoRemainingOnBoard: '',
                  totalDischarge: '',
                  dischargeRates: '',
                },
              ],
        })
        dispatch(fetchDocSuccess(data))
      } catch (err) {
        dispatch(fetchDocFailure(err.message || 'Failed to fetch document details.'))
      }
    }

    fetchDocument()
  }, [id, dispatch])

  // Top Section Field Handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  // Section 2 Dynamic Entry Handlers
  const handleEntryChange = (index, field, value) => {
    const updatedEntries = [...formData.dischargeEntries]
    updatedEntries[index] = { ...updatedEntries[index], [field]: value }
    setFormData({ ...formData, dischargeEntries: updatedEntries })
  }

  const addDischargeEntry = () => {
    setFormData({
      ...formData,
      dischargeEntries: [
        ...formData.dischargeEntries,
        {
          todaysDate: '',
          times: '',
          manifoldNumber: '',
          manifoldPressure: '',
          Temperature: '',
          cargoRemainingOnBoard: '',
          totalDischarge: '',
          dischargeRates: '',
        },
      ],
    })
  }

  const removeDischargeEntry = (index) => {
    if (formData.dischargeEntries.length === 1) return
    const updatedEntries = formData.dischargeEntries.filter((_, i) => i !== index)
    setFormData({ ...formData, dischargeEntries: updatedEntries })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(saveDocStart())

      const isUpdating = Boolean(id)
      const method = isUpdating ? 'PUT' : 'POST'
      const endpoint = isUpdating
        ? `/api/createDoc/vesselDischargeRateReport/${id}`
        : '/api/createDoc/vesselDischargeRateReport'

      const payload = { ...formData }
      delete payload._id
      delete payload.__v
      delete payload.createdAt
      delete payload.updatedAt
      delete payload.userReference

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (data.success === false) {
        dispatch(saveDocFailure(data.message))
        return
      }

      dispatch(saveDocSuccess(data))

      const savedDocId = data.data?._id || data._id || id

      if (!id && savedDocId) {
        navigate(`/vesselDischargeRateReport/${savedDocId}`)
      }
    } catch (err) {
      dispatch(saveDocFailure(err.message || 'An error occurred while submitting.'))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full p-2 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2 w-full">
        <h1 className="text-xl font-medium p-2 text-center">
          EAST AFRICAN TERMINAL LIMITED
        </h1>
        <h2 className="p-2 text-center uppercase">VESSEL DISCHARGE RATE REPORT</h2>
      </div>

      {/* SECTION 1: GENERAL & VESSEL DETAILS (Fixed 2 Columns) */}
      <div className="flex flex-col gap-4 border-b-2 md:border-b-0 md:border-r-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className="border-b-2 border-gray-100 pb-2">
          <h3 className="font-medium text-center uppercase">Vessel Details</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="vesselName" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Vessel Name
            </label>
            <input
              onChange={handleChange}
              id="vesselName"
              type="text"
              placeholder="Vessel Name"
              value={formData.vesselName || ''}
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
            />
          </div>

          <div>
            <label htmlFor="dateOfReport" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Date Of Report
            </label>
            <input
              onChange={handleChange}
              id="dateOfReport"
              type="date"
              value={formData.dateOfReport || ''}
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
            />
          </div>

          <div>
            <label htmlFor="berthNumber" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Berth Number
            </label>
            <input
              onChange={handleChange}
              id="berthNumber"
              type="text"
              placeholder="Berth Number"
              value={formData.berthNumber || ''}
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
            />
          </div>

          <div>
            <label htmlFor="shipTanks" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Ship Tanks
            </label>
            <input
              onChange={handleChange}
              id="shipTanks"
              type="text"
              placeholder="Ship Tanks"
              value={formData.shipTanks || ''}
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
              placeholder="Product"
              value={formData.product || ''}
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
            />
          </div>

          <div>
            <label htmlFor="cargoGradeBillOfLading" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Cargo Grade / B/L
            </label>
            <input
              onChange={handleChange}
              id="cargoGradeBillOfLading"
              type="text"
              placeholder="Cargo Grade / B/L"
              value={formData.cargoGradeBillOfLading || ''}
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: DYNAMIC DISCHARGE RATE ENTRIES */}
      <div className="flex flex-col gap-4 p-2 shadow-md hover:shadow-xl">
        <div className="border-b-2 border-gray-100 pb-2">
          <h3 className="font-medium text-center uppercase">Discharge Rate Log</h3>
        </div>

        {formData.dischargeEntries.map((entry, index) => (
          <div key={index} className="border-b-2 border-gray-200 pb-4 mb-2 flex flex-col gap-3 relative">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-500">Entry #{index + 1}</span>
              {formData.dischargeEntries.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDischargeEntry(index)}
                  className="text-red-500 hover:text-red-700 text-xs font-semibold uppercase cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Inputs arranged in 2 Columns */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={entry.todaysDate || ''}
                  onChange={(e) => handleEntryChange(index, 'todaysDate', e.target.value)}
                  className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Times
                </label>
                <input
                  type="time"
                  value={entry.times || ''}
                  onChange={(e) => handleEntryChange(index, 'times', e.target.value)}
                  className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Manifold No.
                </label>
                <input
                  type="text"
                  placeholder="Manifold Number"
                  value={entry.manifoldNumber || ''}
                  onChange={(e) => handleEntryChange(index, 'manifoldNumber', e.target.value)}
                  className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Manifold Pressure
                </label>
                <input
                  type="text"
                  placeholder="Pressure"
                  value={entry.manifoldPressure || ''}
                  onChange={(e) => handleEntryChange(index, 'manifoldPressure', e.target.value)}
                  className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Temperature
                </label>
                <input
                  type="text"
                  placeholder="Temperature"
                  value={entry.Temperature || ''}
                  onChange={(e) => handleEntryChange(index, 'Temperature', e.target.value)}
                  className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Cargo Remaining On Board
                </label>
                <input
                  type="text"
                  placeholder="Cargo Remaining"
                  value={entry.cargoRemainingOnBoard || ''}
                  onChange={(e) => handleEntryChange(index, 'cargoRemainingOnBoard', e.target.value)}
                  className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Total Discharge
                </label>
                <input
                  type="text"
                  placeholder="Total Discharge"
                  value={entry.totalDischarge || ''}
                  onChange={(e) => handleEntryChange(index, 'totalDischarge', e.target.value)}
                  className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Discharge Rates
                </label>
                <input
                  type="text"
                  placeholder="Discharge Rates"
                  value={entry.dischargeRates || ''}
                  onChange={(e) => handleEntryChange(index, 'dischargeRates', e.target.value)}
                  className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addDischargeEntry}
          className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 w-full font-medium text-xs uppercase cursor-pointer"
        >
          + Add Entry
        </button>
      </div>

      {error && <p className="text-red-500 md:col-span-2 my-2">{error}</p>}

      <button
        disabled={loading}
        type="submit"
        className="bg-slate-400 rounded-md p-2 hover:bg-slate-500 w-full text-white font-medium my-2 md:col-span-2 disabled:opacity-50 cursor-pointer"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}