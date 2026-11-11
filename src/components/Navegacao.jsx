import { NavLink } from 'react-router-dom'

const ABAS = [
  { para: '/', icone: '＋', rotulo: 'Lançar' },
  { para: '/historico', icone: '🧾', rotulo: 'Histórico' },
  { para: '/dashboard', icone: '📊', rotulo: 'Dashboard' },
  { para: '/orcamento', icone: '🎯', rotulo: 'Orçamento' },
]

export default function Navegacao() {
  return (
    <nav className="nav" aria-label="Navegação principal">
      <div className="nav-interno">
        {ABAS.map((aba) => (
          <NavLink
            key={aba.para}
            to={aba.para}
            end={aba.para === '/'}
            className={({ isActive }) => (isActive ? 'ativo' : '')}
          >
            <span className="icone" aria-hidden="true">{aba.icone}</span>
            {aba.rotulo}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
