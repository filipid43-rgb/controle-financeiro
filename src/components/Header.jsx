import { useFinanceiro } from '../context/FinanceiroContext'
import { doMes, somar } from '../utils/calculos'
import { formatarMoedaCurta, mesAtual, rotuloMes } from '../utils/format'

export default function Header() {
  const { gastos, rendas } = useFinanceiro()
  const mes = mesAtual()
  const renda = somar(doMes(rendas, mes))
  const gasto = somar(doMes(gastos, mes))
  const saldo = renda - gasto

  return (
    <header className="header">
      <div className="header-topo">
        <div className="logo">dinheiro<span>.</span></div>
        <div className="pilula-mes">{rotuloMes(mes)}</div>
      </div>
      <div className="header-cards">
        <div className="hcard renda">
          <div className="hcard-rotulo">Renda</div>
          <div className="hcard-valor">{formatarMoedaCurta(renda)}</div>
        </div>
        <div className="hcard gasto">
          <div className="hcard-rotulo">Gastos</div>
          <div className="hcard-valor">{formatarMoedaCurta(gasto)}</div>
        </div>
        <div className={`hcard saldo${saldo < 0 ? ' negativo' : ''}`}>
          <div className="hcard-rotulo">Saldo</div>
          <div className="hcard-valor">{formatarMoedaCurta(saldo)}</div>
        </div>
      </div>
    </header>
  )
}
