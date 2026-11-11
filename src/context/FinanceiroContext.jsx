import { createContext, useCallback, useContext, useMemo } from 'react'
import useLocalStorage from '../utils/useLocalStorage'

const FinanceiroContext = createContext(null)

function novoId() {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`
}

export function FinanceiroProvider({ children }) {
  const [gastos, setGastos] = useLocalStorage('cf_gastos', [])
  const [rendas, setRendas] = useLocalStorage('cf_rendas', [])
  const [orcamento, setOrcamento] = useLocalStorage('cf_orcamento', {})

  const adicionarGasto = useCallback(
    (gasto) => setGastos((atual) => [{ ...gasto, id: novoId() }, ...atual]),
    [setGastos],
  )
  const adicionarRenda = useCallback(
    (renda) => setRendas((atual) => [{ ...renda, id: novoId() }, ...atual]),
    [setRendas],
  )
  const removerGasto = useCallback(
    (id) => setGastos((atual) => atual.filter((g) => g.id !== id)),
    [setGastos],
  )
  const removerRenda = useCallback(
    (id) => setRendas((atual) => atual.filter((r) => r.id !== id)),
    [setRendas],
  )

  const valor = useMemo(
    () => ({
      gastos,
      rendas,
      orcamento,
      setOrcamento,
      adicionarGasto,
      adicionarRenda,
      removerGasto,
      removerRenda,
    }),
    [
      gastos,
      rendas,
      orcamento,
      setOrcamento,
      adicionarGasto,
      adicionarRenda,
      removerGasto,
      removerRenda,
    ],
  )

  return (
    <FinanceiroContext.Provider value={valor}>
      {children}
    </FinanceiroContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFinanceiro() {
  const ctx = useContext(FinanceiroContext)
  if (!ctx) throw new Error('useFinanceiro precisa estar dentro de FinanceiroProvider')
  return ctx
}
