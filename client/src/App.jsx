import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Profile from './pages/Profile'
import TruckMovementDocument from './pages/TruckMovementDocument'
import WeighbridgeReceipt from './pages/WeighbridgeReceipt'
import TruckSafetyInspectionForm from './pages/TruckSafetyInspectionForm'
import ShoreTankQuantityReport from './pages/ShoreTankQuantityReport'
import AgreedFinalOutturnReport from './pages/AgreedFinalOutturnReport'
import StatementOfFactsReport from './pages/StatementOfFactsReport'
import VesselDischargeRateReport from './pages/VesselDischargeRateReport'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/truckMovementDocument/:id?" element={<TruckMovementDocument />} />
          <Route path="/weighbridgeReceipt/:id?" element={<WeighbridgeReceipt />} />
          <Route path="/truckSafetyInspectionForm/:id?" element={<TruckSafetyInspectionForm />} />
          <Route path="/shoreTankQuantityReport/:id?" element={<ShoreTankQuantityReport />} />
          <Route path="/agreedFinalOutturnReport/:id?" element={<AgreedFinalOutturnReport />} />
          <Route path="/statementOfFactsReport/:id?" element={<StatementOfFactsReport />} />
          <Route path="/vesselDischargeRateReport/:id?" element={<VesselDischargeRateReport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}