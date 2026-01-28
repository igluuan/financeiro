import { useState } from 'react';

function TransactionForm({ onAddTransaction }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('despesa');
  const [categoria, setCategoria] = useState('alimentacao');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!descricao || !valor) {
      alert('Preencha todos os campos!');
      return;
    }

    const novaTransacao = {
      descricao,
      valor: parseFloat(valor),
      tipo,
      categoria,
      data: new Date().toISOString()
    };

    onAddTransaction(novaTransacao);
    
    // Limpa o formulário
    setDescricao('');
    setValor('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Nova Transação</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Tipo */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Tipo</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="receita"
                checked={tipo === 'receita'}
                onChange={(e) => setTipo(e.target.value)}
                className="mr-2"
              />
              Receita
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="despesa"
                checked={tipo === 'despesa'}
                onChange={(e) => setTipo(e.target.value)}
                className="mr-2"
              />
              Despesa
            </label>
          </div>
        </div>

        {/* Descrição */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Descrição</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Almoço, Salário..."
          />
        </div>

        {/* Valor */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Valor (R$)</label>
          <input
            type="number"
            step="0.01"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
          />
        </div>

        {/* Categoria */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Categoria</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="alimentacao">Alimentação</option>
            <option value="transporte">Transporte</option>
            <option value="lazer">Lazer</option>
            <option value="saude">Saúde</option>
            <option value="educacao">Educação</option>
            <option value="moradia">Moradia</option>
            <option value="salario">Salário</option>
            <option value="outros">Outros</option>
          </select>
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            tipo === 'receita' 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          Adicionar {tipo === 'receita' ? 'Receita' : 'Despesa'}
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;