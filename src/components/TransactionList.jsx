function TransactionList({ transacoes, onDelete }) {
  if (transacoes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Transações</h2>
        <p className="text-gray-500 text-center py-8">
          Nenhuma transação ainda. Adicione uma acima!
        </p>
      </div>
    );
  }

  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Transações Recentes</h2>
      
      <ul className="space-y-3">
        {transacoes.map(transacao => (
          <li 
            key={transacao.id} 
            className="flex justify-between items-center p-4 border-l-4 hover:bg-gray-50 transition"
            style={{ borderLeftColor: transacao.tipo === 'receita' ? '#22c55e' : '#ef4444' }}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {transacao.tipo === 'receita' ? '📈' : '📉'}
                </span>
                <div>
                  <p className="font-semibold text-gray-800">{transacao.descricao}</p>
                  <div className="flex gap-3 text-sm text-gray-500">
                    <span className="capitalize">{transacao.categoria}</span>
                    <span>•</span>
                    <span>{formatarData(transacao.data)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`text-xl font-bold ${
                transacao.tipo === 'receita' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transacao.tipo === 'receita' ? '+' : '-'} R$ {transacao.valor.toFixed(2)}
              </span>
              
              <button
                onClick={() => onDelete(transacao.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition"
                title="Excluir"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;