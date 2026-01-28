import { useState, useEffect } from 'react';
import Balance from './components/Balance';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import { adicionarTransacao, deletarTransacao, escutarTransacoes } from './services/transactionService';

function App() {
  const [transacoes, setTransacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Escuta mudanças em tempo real
  useEffect(() => {
    const unsubscribe = escutarTransacoes((novasTransacoes) => {
      setTransacoes(novasTransacoes);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAdicionarTransacao = async (transacao) => {
    try {
      await adicionarTransacao(transacao);
    } catch (error) {
      alert('Erro ao adicionar transação. Tente novamente.');
    }
  };

  const handleDeletarTransacao = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
      try {
        await deletarTransacao(id);
      } catch (error) {
        alert('Erro ao deletar transação. Tente novamente.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-600">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          💰 Controle Financeiro
        </h1>
        
        <Balance transacoes={transacoes} />
        <TransactionForm onAddTransaction={handleAdicionarTransacao} />
        <TransactionList transacoes={transacoes} onDelete={handleDeletarTransacao} />
      </div>
    </div>
  );
}

export default App;