export const CATEGORIAS = [
  { nome: 'Mercado', icone: '🛒', cor: '#e63946' },
  { nome: 'Água', icone: '💧', cor: '#2196f3' },
  { nome: 'Luz', icone: '⚡', cor: '#f4a261' },
  { nome: 'Internet', icone: '📡', cor: '#457b9d' },
  { nome: 'Telefone', icone: '📱', cor: '#6a994e' },
  { nome: 'Cartão de Crédito', icone: '💳', cor: '#9b2335' },
  { nome: 'Aluguel', icone: '🏠', cor: '#5c4b8a' },
  { nome: 'Transporte', icone: '🚗', cor: '#2d6a4f' },
  { nome: 'Saúde', icone: '🏥', cor: '#e76f51' },
  { nome: 'Educação', icone: '📚', cor: '#1d4e89' },
  { nome: 'Lazer', icone: '🎉', cor: '#c9a84c' },
  { nome: 'Restaurante', icone: '🍽️', cor: '#bc6c25' },
  { nome: 'Vestuário', icone: '👗', cor: '#8338ec' },
  { nome: 'Outros', icone: '📦', cor: '#6c757d' },
]

export const FORMAS_PAGAMENTO = [
  'Dinheiro',
  'Débito',
  'Crédito',
  'PIX',
  'Boleto',
  'Transferência',
]

export const TIPOS_RENDA = [
  'Meu Salário',
  'Salário Cônjuge',
  'Freelance / Extra',
  'Aluguel Recebido',
  'Investimentos',
  'Presente / Doação',
  'Outros',
]

export const FILTROS = [
  { id: 'mes', rotulo: 'Este mês' },
  { id: 'semana', rotulo: 'Esta semana' },
  { id: 'hoje', rotulo: 'Hoje' },
  { id: 'todos', rotulo: 'Todos' },
]

export function infoCategoria(nome) {
  return (
    CATEGORIAS.find((c) => c.nome === nome) ?? {
      nome,
      icone: '📦',
      cor: '#6c757d',
    }
  )
}
