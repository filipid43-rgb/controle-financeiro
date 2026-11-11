import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import ItemGasto from '../components/ItemGasto'
import { useFinanceiro } from '../context/FinanceiroContext'
import { somar } from '../utils/calculos'
import { FILTROS } from '../utils/constants'
import { dataComHora, formatarMoeda, hojeISO, mesAtual, rotuloDia } from '../utils/format'

function filtrar(gastos, filtro) {
  const hoje = hojeISO()
  const limiteSemana = new Date()
  limiteSemana.setDate(limiteSemana.getDate() - 7)
  return gastos.filter((g) => {
    if (filtro === 'hoje') return g.data === hoje
    if (filtro === 'semana') return dataComHora(g.data) >= limiteSemana
    if (filtro === 'mes') return g.data.slice(0, 7) === mesAtual()
    return true
  })
}

export default function Historico() {
  const { gastos, removerGasto } = useFinanceiro()
  const { mostrarAviso } = useOutletContext()
  const [filtro, setFiltro] = useState('mes')

  const grupos = useMemo(() => {
    const porDia = {}
    filtrar(gastos, filtro).forEach((g) => {
      ;(porDia[g.data] ??= []).push(g)
    })
    return Object.entries(porDia).sort(([a], [b]) => b.localeCompare(a))
  }, [gastos, filtro])

  function remover(id) {
    if (!window.confirm('Apagar este gasto?')) return
    removerGasto(id)
    mostrarAviso('🗑 Removido')
  }

  return (
    <div className="pagina">
      <div className="filtros" role="tablist">
        {FILTROS.map((f) => (
          <button
            key={f.id}
            className={`filtro${filtro === f.id ? ' ativo' : ''}`}
            onClick={() => setFiltro(f.id)}
          >
            {f.rotulo}
          </button>
        ))}
      </div>

      {grupos.length === 0 ? (
        <div className="vazio">
          <div className="emoji">📭</div>
          Nenhum gasto neste período
        </div>
      ) : (
        grupos.map(([dia, lista]) => (
          <section className="dia" key={dia}>
            <div className="dia-rotulo">
              {rotuloDia(dia)} <span>{formatarMoeda(somar(lista))}</span>
            </div>
            {lista.map((g) => (
              <ItemGasto key={g.id} gasto={g} aoRemover={remover} />
            ))}
          </section>
        ))
      )}
    </div>
  )
}
