function Balance({ transacoes }) {
  const receitas = transacoes
    .filter(t => t.tipo === 'receita')
    .reduce((acc, t) => acc + t.valor, 0);

  const despesas = transacoes
    .filter(t => t.tipo === 'despesa')
    .reduce((acc, t) => acc + t.valor, 0);

  const saldo = receitas - despesas;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Receitas */}
      <div className="bg-green-500 text-white rounded-lg shadow-md p-6">
        <h3 className="text-sm opacity-90 mb-2">Receitas</h3>
        <p className="text-2xl font-bold">R$ {receitas.toFixed(2)}</p>
      </div>

      {/* Despesas */}
      <div className="bg-red-500 text-white rounded-lg shadow-md p-6">
        <h3 className="text-sm opacity-90 mb-2">Despesas</h3>
        <p className="text-2xl font-bold">R$ {despesas.toFixed(2)}</p>
      </div>

      {/* Saldo */}
      <div className={`${saldo >= 0 ? 'bg-blue-500' : 'bg-orange-500'} text-white rounded-lg shadow-md p-6`}>
        <h3 className="text-sm opacity-90 mb-2">Saldo</h3>
        <p className="text-2xl font-bold">R$ {saldo.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Balance;