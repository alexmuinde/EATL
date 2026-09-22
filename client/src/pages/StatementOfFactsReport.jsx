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

export default function StatementOfFactsReport() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading, error } = useSelector((state) => state.document)

  const [formData, setFormData] = useState({
    todaysDate: '',
    vessel: '',
    portName: '',
    products: [
      {
        productName: '',
        billOfLading: '',
      },
    ],
    statementEntries: [
      {
        todaysDate: '',
        time: '',
        particulars: '',
      },
    ],
  })

  useEffect(() => {
    if (!id) return

    const fetchDocument = async () => {
      try {
        dispatch(fetchDocStart())
        const res = await fetch(`/api/createDoc/statementOfFactsReport/get/${id}`)
        const data = await res.json()

        if (data.success === false) {
          dispatch(fetchDocFailure(data.message))
          return
        }

        setFormData({
          ...data,
          products: data.products?.length
            ? data.products
            : [{ productName: '', billOfLading: '' }],
          statementEntries: data.statementEntries?.length
            ? data.statementEntries
            : [{ todaysDate: '', time: '', particulars: '' }],
        })
        dispatch(fetchDocSuccess(data))
      } catch (err) {
        dispatch(fetchDocFailure(err.message || 'Failed to fetch document details.'))
      }
    }

    fetchDocument()
  }, [id, dispatch])

  // Basic Field Handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  // Grouped Product Handlers (Product Name & Bill of Lading)
  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...formData.products]
    updatedProducts[index] = { ...updatedProducts[index], [field]: value }
    setFormData({ ...formData, products: updatedProducts })
  }

  const addProduct = () => {
    setFormData({
      ...formData,
      products: [
        ...formData.products,
        { productName: '', billOfLading: '' },
      ],
    })
  }

  const removeProduct = (index) => {
    if (formData.products.length === 1) return
    const updatedProducts = formData.products.filter((_, i) => i !== index)
    setFormData({ ...formData, products: updatedProducts })
  }

  // Dynamic Handlers for Statement Entries
  const handleEntryChange = (index, field, value) => {
    const updatedEntries = [...formData.statementEntries]
    updatedEntries[index] = { ...updatedEntries[index], [field]: value }
    setFormData({ ...formData, statementEntries: updatedEntries })
  }

  const addStatementEntry = () => {
    setFormData({
      ...formData,
      statementEntries: [
        ...formData.statementEntries,
        { todaysDate: '', time: '', particulars: '' },
      ],
    })
  }

  const removeStatementEntry = (index) => {
    if (formData.statementEntries.length === 1) return
    const updatedEntries = formData.statementEntries.filter((_, i) => i !== index)
    setFormData({ ...formData, statementEntries: updatedEntries })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(saveDocStart())

      const isUpdating = Boolean(id)
      const method = isUpdating ? 'PUT' : 'POST'
      const endpoint = isUpdating
        ? `/api/createDoc/statementOfFactsReport/${id}`
        : '/api/createDoc/statementOfFactsReport'

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
        navigate(`/statementOfFactsReport/${savedDocId}`)
      }
    } catch (err) {
      dispatch(saveDocFailure(err.message || 'An error occurred while submitting.'))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full p-2 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2 w-full">
        <h1 className="text-xl font-medium p-2 text-center">
          VEG OIL TERMINAL
        </h1>
        <h2 className="p-2 text-center uppercase">STATEMENT OF FACTS REPORT</h2>
      </div>

      {/* SECTION 1: GENERAL INFO & PRODUCTS */}
      <div className="flex flex-col gap-4 border-b-2 md:border-b-0 md:border-r-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className="border-b-2 border-gray-100 pb-2">
          <h3 className="font-medium text-center uppercase">General Information</h3>
        </div>

        {/* 2-Column Inputs by default, single column on small screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="todaysDate" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Todays Date
            </label>
            <input
              onChange={handleChange}
              id="todaysDate"
              type="date"
              value={formData.todaysDate || ''}
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

          <div className="col-span-1 sm:col-span-2">
            <label htmlFor="portName" className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Port Name
            </label>
            <input
              onChange={handleChange}
              id="portName"
              type="text"
              value={formData.portName || ''}
              placeholder="Port Name"
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
            />
          </div>
        </div>

        {/* Grouped Products & Bill of Lading Section */}
        <div className="mt-2 border-t-2 border-gray-100 pt-2 flex flex-col gap-3">
          <label className="block text-xs font-semibold text-gray-600 uppercase">
            Products & Bills of Lading
          </label>

          {formData.products.map((item, index) => (
            <div key={index} className="border-b-2 border-gray-200 pb-3 mb-2 flex flex-col gap-2 relative">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-500">Item #{index + 1}</span>
                {formData.products.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="text-red-500 hover:text-red-700 text-xs font-semibold uppercase cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Product Inputs: 2 Columns by default, single column on small screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={item.productName || ''}
                    placeholder={`Product #${index + 1}`}
                    onChange={(e) => handleProductChange(index, 'productName', e.target.value)}
                    className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Bill of Lading
                  </label>
                  <input
                    type="text"
                    value={item.billOfLading || ''}
                    placeholder={`Bill of Lading #${index + 1}`}
                    onChange={(e) => handleProductChange(index, 'billOfLading', e.target.value)}
                    className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addProduct}
            className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 w-full font-medium text-xs uppercase cursor-pointer"
          >
            + Add Product & Bill of Lading
          </button>
        </div>
      </div>

      {/* SECTION 2: STATEMENT ENTRIES */}
      <div className="flex flex-col gap-4 p-2 shadow-md hover:shadow-xl">
        <div className="border-b-2 border-gray-100 pb-2">
          <h3 className="font-medium text-center uppercase">STATEMENT OF FACTS REPORT</h3>
        </div>

        {formData.statementEntries.map((entry, index) => (
          <div key={index} className="border-b-2 border-gray-200 pb-4 mb-2 flex flex-col gap-3 relative">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-500">Entry #{index + 1}</span>
              {formData.statementEntries.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeStatementEntry(index)}
                  className="text-red-500 hover:text-red-700 text-xs font-semibold uppercase cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Date & Time: 2 Columns by default, single column on small screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  Time
                </label>
                <input
                  type="time"
                  value={entry.time || ''}
                  onChange={(e) => handleEntryChange(index, 'time', e.target.value)}
                  className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                Particulars
              </label>
              <textarea
                rows="3"
                value={entry.particulars || ''}
                placeholder="Enter particulars..."
                onChange={(e) => handleEntryChange(index, 'particulars', e.target.value)}
                className="w-full border-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl rounded-md"
              ></textarea>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addStatementEntry}
          className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 w-full font-medium cursor-pointer"
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