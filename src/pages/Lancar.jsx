import { useOutletContext } from 'react-router-dom'
import FormGasto from '../components/FormGasto'
import FormRenda from '../components/FormRenda'
import { useFinanceiro } from '../context/FinanceiroContext'

export default function Lancar() {
  const { adicionarGasto, adicionarRenda } = useFinanceiro()
  const { mostrarAviso } = useOutletContext()

  return (
    <div className="pagina">
      <FormGasto
        aoSalvar={(g) => { adicionarGasto(g); mostrarAviso('✅ Gasto adicionado!') }}
        aoErro={mostrarAviso}
      />
      <FormRenda
        aoSalvar={(r) => { adicionarRenda(r); mostrarAviso('💰 Renda registrada!') }}
        aoErro={mostrarAviso}
      />
    </div>
  )
}
