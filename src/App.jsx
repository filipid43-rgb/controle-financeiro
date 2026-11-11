import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { FinanceiroProvider } from './context/FinanceiroContext'
import Dashboard from './pages/Dashboard'
import Historico from './pages/Historico'
import Lancar from './pages/Lancar'
import Orcamento from './pages/Orcamento'

export default function App() {
  return (
    <FinanceiroProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Lancar />} />
            <Route path="historico" element={<Historico />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orcamento" element={<Orcamento />} />
            <Route path="*" element={<Lancar />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FinanceiroProvider>
  )
}
