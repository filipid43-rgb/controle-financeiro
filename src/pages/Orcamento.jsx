import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useFinanceiro } from '../context/FinanceiroContext'
import { doMes, totaisPorCategoria } from '../utils/calculos'
import { CATEGORIAS, infoCategoria } from '../utils/constants'
import { formatarMoeda, mesAtual } from '../utils/format'

function situacao(pct) {
  if (pct < 0.7) return { classe: 'ok', texto: '✓ OK' }
  if (pct < 1) return { classe: 'atencao', texto: '⚠ Atenção' }
  return { classe: 'estourou', texto: '🔴 Excedido' }
}

export default function Orcamento() {
  const { gastos, orcamento, setOrcamento } = useFinanceiro()
  const { mostrarAviso } = useOutletContext()
  const [editando, setEditando] = useState(false)
  const [rascunho, setRascunho] = useState({})

  const gastoPorCategoria = useMemo(() => {
    const mapa = {}
    totaisPorCategoria(doMes(gastos, mesAtual())).forEach((c) => { mapa[c.categoria] = c.total })
    return mapa
  }, [gastos])

  const categoriasComLimite = Object.keys(orcamento).filter((c) => orcamento[c] > 0)

  function abrir() {
    setRascunho({ ...orcamento })
    setEditando(true)
  }

  function salvar() {
    const novo = {}
    Object.entries(rascunho).forEach(([cat, v]) => {
      const n = parseFloat(v)
      if (n > 0) novo[cat] = n
    })
    setOrcamento(novo)
    setEditando(false)
    mostrarAviso('🎯 Orçamento salvo!')
  }

  return (
    <div className="pagina">
      <div className="cabecalho-pagina">
        <h2 className="secao-titulo" style={{ margin: 0 }}>🎯 Orçamento mensal</h2>
        <button className="botao botao-pequeno" onClick={abrir}>✏️ Editar</button>
      </div>

      {categoriasComLimite.length === 0 ? (
        <div className="vazio">
          <div className="emoji">🎯</div>
          Toque em “Editar” para definir limites de gasto por categoria.
        </div>
      ) : (
        categoriasComLimite.map((cat) => {
          const limite = orcamento[cat]
          const gasto = gastoPorCategoria[cat] ?? 0
          const pct = Math.min(gasto / limite, 1)
          const s = situacao(gasto / limite)
          return (
            <div className="cartao" key={cat} style={{ padding: 16, marginBottom: 10 }}>
              <div className="orc-topo">
                <span className="orc-nome">{infoCategoria(cat).icone} {cat}</span>
                <span className={`etiqueta ${s.classe}`}>{s.texto}</span>
              </div>
              <div className="orc-numeros">
                <span>{formatarMoeda(gasto)} de {formatarMoeda(limite)}</span>
                <span>{Math.round((gasto / limite) * 100)}%</span>
              </div>
              <div className="trilho">
                <div className="preenchimento" style={{ width: `${pct * 100}%`, background: infoCategoria(cat).cor }} />
              </div>
            </div>
          )
        })
      )}

      {editando && (
        <div className="modal-fundo" onClick={(e) => e.target === e.currentTarget && setEditando(false)}>
          <div className="modal" role="dialog" aria-modal="true" aria-label="Definir orçamento">
            <h2>🎯 Definir orçamento</h2>
            {CATEGORIAS.map((c) => (
              <div className="campo" key={c.nome}>
                <label htmlFor={`orc-${c.nome}`}>{c.icone} {c.nome}</label>
                <input
                  id={`orc-${c.nome}`}
                  type="number" min="0" step="10" inputMode="decimal"
                  placeholder="Limite mensal (R$)"
                  value={rascunho[c.nome] ?? ''}
                  onChange={(e) => setRascunho({ ...rascunho, [c.nome]: e.target.value })}
                />
              </div>
            ))}
            <div className="modal-acoes">
              <button className="botao botao-secundario" onClick={() => setEditando(false)}>Cancelar</button>
              <button className="botao botao-gasto" onClick={salvar}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
