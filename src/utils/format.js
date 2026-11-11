const moeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function formatarMoeda(valor) {
  return moeda.format(valor || 0)
}

export function formatarMoedaCurta(valor) {
  const v = valor || 0
  return Math.abs(v) >= 1000
    ? `R$${(v / 1000).toFixed(1).replace('.', ',')}k`
    : `R$${Math.round(v)}`
}

// Data local no formato AAAA-MM-DD (evita o erro de fuso do toISOString)
export function hojeISO() {
  const d = new Date()
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  const dia = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mes}-${dia}`
}

export function mesAtual() {
  return hojeISO().slice(0, 7)
}

export function dataComHora(iso) {
  return new Date(`${iso}T12:00:00`)
}

export function rotuloDia(iso) {
  return dataComHora(iso).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  })
}

export function rotuloMes(anoMes, curto = false) {
  const [ano, mes] = anoMes.split('-')
  const d = new Date(Number(ano), Number(mes) - 1, 1)
  if (curto) {
    const nome = d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')
    return `${nome}/${ano.slice(2)}`
  }
  const nome = d.toLocaleDateString('pt-BR', { month: 'long' })
  return `${nome.charAt(0).toUpperCase()}${nome.slice(1)} de ${ano}`
}

// Últimos N meses (AAAA-MM), do mais antigo ao atual
export function ultimosMeses(qtd = 6) {
  const base = new Date()
  const lista = []
  for (let i = qtd - 1; i >= 0; i--) {
    const d = new Date(base.getFullYear(), base.getMonth() - i, 1)
    lista.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
  }
  return lista
}
