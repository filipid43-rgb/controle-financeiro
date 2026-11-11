export function somar(lista) {
  return lista.reduce((total, item) => total + item.valor, 0)
}

export function doMes(lista, anoMes) {
  return lista.filter((item) => item.data.slice(0, 7) === anoMes)
}

export function totaisPorCategoria(gastos) {
  const mapa = {}
  gastos.forEach((g) => {
    mapa[g.categoria] = (mapa[g.categoria] ?? 0) + g.valor
  })
  return Object.entries(mapa)
    .map(([categoria, total]) => ({ categoria, total }))
    .sort((a, b) => b.total - a.total)
}

export function resumoMensal(gastos, rendas, meses) {
  return meses.map((mes) => {
    const renda = somar(doMes(rendas, mes))
    const gasto = somar(doMes(gastos, mes))
    return { mes, renda, gasto, saldo: renda - gasto }
  })
}
