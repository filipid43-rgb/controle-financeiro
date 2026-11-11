import { useCallback, useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Aviso from './Aviso'
import Header from './Header'
import Navegacao from './Navegacao'

export default function Layout() {
  const [aviso, setAviso] = useState('')
  const timer = useRef(null)

  const mostrarAviso = useCallback((texto) => {
    setAviso(texto)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setAviso(''), 2600)
  }, [])

  useEffect(() => () => clearTimeout(timer.current), [])

  return (
    <div className="app">
      <Header />
      <main>
        <Outlet context={{ mostrarAviso }} />
      </main>
      <Aviso texto={aviso} />
      <Navegacao />
    </div>
  )
}
