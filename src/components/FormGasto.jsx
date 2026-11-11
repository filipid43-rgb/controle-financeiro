import { useState } from 'react'
import { CATEGORIAS, FORMAS_PAGAMENTO } from '../utils/constants'
import { hojeISO } from '../utils/format'

const vazio = () => ({ data: hojeISO(), valor: '', categoria: '', pagamento: '', descricao: '' })

export default function FormGasto({ aoSalvar, aoErro }) {
  const [form, setForm] = useState(vazio)
  const mudar = (campo) => (e) => setForm({ ...form, [campo]: e.target.value })

  function enviar(e) {
    e.preventDefault()
    const valor = parseFloat(form.valor)
    if (!form.data || !(valor > 0) || !form.categoria) {
      aoErro('⚠️ Preencha data, valor e categoria')
      return
    }
    aoSalvar({
      data: form.data,
      valor,
      categoria: form.categoria,
      pagamento: form.pagamento,
      descricao: form.descricao.trim(),
    })
    setForm(vazio())
  }

  return (
    <form className="cartao" onSubmit={enviar}>
      <h2 className="cartao-titulo">💸 Registrar gasto</h2>
      <div className="linha2">
        <div className="campo">
          <label htmlFor="g-data">Data</label>
          <input id="g-data" type="date" value={form.data} onChange={mudar('data')} />
        </div>
        <div className="campo">
          <label htmlFor="g-valor">Valor R$</label>
          <input id="g-valor" type="number" step="0.01" min="0" inputMode="decimal" placeholder="0,00" value={form.valor} onChange={mudar('valor')} />
        </div>
      </div>
      <div className="campo">
        <label htmlFor="g-cat">Categoria</label>
        <select id="g-cat" value={form.categoria} onChange={mudar('categoria')}>
          <option value="">Selecione...</option>
          {CATEGORIAS.map((c) => (
            <option key={c.nome} value={c.nome}>{c.icone} {c.nome}</option>
          ))}
        </select>
      </div>
      <div className="campo">
        <label htmlFor="g-pgto">Forma de pagamento</label>
        <select id="g-pgto" value={form.pagamento} onChange={mudar('pagamento')}>
          <option value="">Selecione...</option>
          {FORMAS_PAGAMENTO.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>
      <div className="campo">
        <label htmlFor="g-desc">Descrição (opcional)</label>
        <input id="g-desc" type="text" placeholder="Ex: feira, conta de luz..." value={form.descricao} onChange={mudar('descricao')} />
      </div>
      <button className="botao botao-gasto" type="submit">＋ Adicionar gasto</button>
    </form>
  )
}
