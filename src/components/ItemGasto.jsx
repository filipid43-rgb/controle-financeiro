import { infoCategoria } from '../utils/constants'
import { formatarMoeda } from '../utils/format'

export default function ItemGasto({ gasto, aoRemover }) {
  const cat = infoCategoria(gasto.categoria)
  return (
    <div className="item">
      <div className="item-icone" style={{ background: `${cat.cor}22` }}>{cat.icone}</div>
      <div className="item-info">
        <div className="item-desc">{gasto.descricao || gasto.categoria}</div>
        <div className="item-meta">{gasto.categoria} · {gasto.pagamento || '—'}</div>
      </div>
      <div className="item-direita">
        <div className="item-valor">{formatarMoeda(gasto.valor)}</div>
        <button
          className="item-remover"
          aria-label={`Remover ${gasto.descricao || gasto.categoria}`}
          onClick={() => aoRemover(gasto.id)}
        >
          ✕
        </button>
      </div>
    </div>
  )
}
