export default function Aviso({ texto }) {
  if (!texto) return null
  return <div className="aviso" role="status">{texto}</div>
}
