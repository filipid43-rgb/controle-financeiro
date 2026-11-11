import { useMemo } from 'react'
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import { useFinanceiro } from '../context/FinanceiroContext'
import { doMes, resumoMensal, somar, totaisPorCategoria } from '../utils/calculos'
import { infoCategoria } from '../utils/constants'
import { formatarMoeda, formatarMoedaCurta, mesAtual, rotuloMes, ultimosMeses } from '../utils/format'

export default function Dashboard() {
  const { gastos, rendas } = useFinanceiro()
  const mes = mesAtual()

  const dados = useMemo(() => {
    const gastosMes = doMes(gastos, mes)
    const totalGastos = somar(gastosMes)
    const totalRenda = somar(doMes(rendas, mes))
    const porCategoria = totaisPorCategoria(gastosMes)
    const historico = resumoMensal(gastos, rendas, ultimosMeses(6)).map((m) => ({
      ...m,
      nome: rotuloMes(m.mes, true),
    }))
    return { totalGastos, totalRenda, porCategoria, historico }
  }, [gastos, rendas, mes])

  const { totalGastos, totalRenda, porCategoria, historico } = dados
  const saldo = totalRenda - totalGastos
  const pct = totalRenda > 0 ? Math.min(totalGastos / totalRenda, 1) : 0
  const maior = porCategoria[0]?.total ?? 1

  return (
    <div className="pagina">
      <section className="painel-saldo">
        <h2>📊 Renda x gastos — este mês</h2>
        <div className="barra-rotulos">
          <span>Gastos <b style={{ color: 'var(--red-light)' }}>{(pct * 100).toFixed(0)}%</b></span>
          <span>Sobra <b style={{ color: 'var(--green-light)' }}>{((1 - pct) * 100).toFixed(0)}%</b></span>
        </div>
        <div className="barra-trilho">
          <div className="barra-preenchimento" style={{ width: `${pct * 100}%` }} />
        </div>
        <div className="painel-numeros">
          <div><strong style={{ color: 'var(--green-light)' }}>{formatarMoeda(totalRenda)}</strong><small>Renda</small></div>
          <div><strong style={{ color: 'var(--red-light)' }}>{formatarMoeda(totalGastos)}</strong><small>Gastos</small></div>
          <div><strong style={{ color: saldo >= 0 ? 'var(--gold-light)' : 'var(--red-light)' }}>{formatarMoeda(saldo)}</strong><small>Saldo</small></div>
        </div>
      </section>

      <section className="cartao">
        <h2 className="cartao-titulo">📈 Últimos 6 meses</h2>
        <div className="grafico">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={historico} margin={{ top: 8, right: 4, left: -12, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(26,26,46,0.1)" />
              <XAxis dataKey="nome" tick={{ fontSize: 11 }} interval={0} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={formatarMoedaCurta} />
              <Tooltip formatter={(v) => formatarMoeda(v)} />
              <Legend />
              <Bar dataKey="renda" name="Renda" fill="#2d6a4f" radius={[6, 6, 0, 0]} />
              <Bar dataKey="gasto" name="Gastos" fill="#9b2335" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="cartao">
        <h2 className="cartao-titulo">🍩 Gastos por categoria</h2>
        {porCategoria.length === 0 ? (
          <div className="vazio"><div className="emoji">📊</div>Sem gastos neste mês</div>
        ) : (
          <>
            <div className="grafico">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={porCategoria} dataKey="total" nameKey="categoria" innerRadius="55%" outerRadius="85%" paddingAngle={2}>
                    {porCategoria.map((c) => (
                      <Cell key={c.categoria} fill={infoCategoria(c.categoria).cor} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => formatarMoeda(v)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="legenda">
              {porCategoria.map((c) => (
                <span className="legenda-item" key={c.categoria}>
                  <span className="legenda-ponto" style={{ background: infoCategoria(c.categoria).cor }} />
                  {c.categoria}
                </span>
              ))}
            </div>
          </>
        )}
      </section>

      {porCategoria.length > 0 && (
        <>
          <h2 className="secao-titulo">📋 Por categoria</h2>
          {porCategoria.map((c) => {
            const cat = infoCategoria(c.categoria)
            return (
              <div className="cartao cat-linha" key={c.categoria}>
                <div className="cat-topo">
                  <span>{cat.icone} {c.categoria}</span>
                  <span className="cat-valor">{formatarMoeda(c.total)}</span>
                </div>
                <div className="trilho">
                  <div className="preenchimento" style={{ width: `${(c.total / maior) * 100}%`, background: cat.cor }} />
                </div>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}
