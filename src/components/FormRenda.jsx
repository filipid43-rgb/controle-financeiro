import { useState } from 'react'
import { TIPOS_RENDA } from '../utils/constants'
import { hojeISO } from '../utils/format'

const vazio = () => ({ data: hojeISO(), valor: '', tipo: '', descricao: '' })

export default function FormRenda({ aoSalvar, aoErro }) {
  const [form, setForm] = useState(vazio)
  const mudar = (campo) => (e) => setForm({ ...form, [campo]: e.target.value })

  function enviar(e) {
    e.preventDefault()
    const valor = parseFloat(form.valor)
    if (!form.data || !(valor > 0) || !form.tipo) {
      aoErro('⚠️ Preencha data, valor e tipo')
      return
    }
    aoSalvar({ data: form.data, valor, tipo: form.tipo, descricao: form.descricao.trim() })
    setForm(vazio())
  }

  return (
    <form className="cartao" onSubmit={enviar}>
      <h2 className="cartao-titulo">💰 Registrar renda</h2>
      <div className="linha2">
        <div className="campo">
          <label htmlFor="r-data">Data</label>
          <input id="r-data" type="date" value={form.data} onChange={mudar('data')} />
        </div>
        <div className="campo">
          <label htmlFor="r-valor">Valor R$</label>
          <input id="r-valor" type="number" step="0.01" min="0" inputMode="decimal" placeholder="0,00" value={form.valor} onChange={mudar('valor')} />
        </div>
      </div>
      <div className="campo">
        <label htmlFor="r-tipo">Tipo de renda</label>
        <select id="r-tipo" value={form.tipo} onChange={mudar('tipo')}>
          <option value="">Selecione...</option>
          {TIPOS_RENDA.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div className="campo">
        <label htmlFor="r-desc">Descrição (opcional)</label>
        <input id="r-desc" type="text" placeholder="Ex: salário de novembro..." value={form.descricao} onChange={mudar('descricao')} />
      </div>
      <button className="botao botao-renda" type="submit">＋ Registrar renda</button>
    </form>
  )
}
