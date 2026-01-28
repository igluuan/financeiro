import { collection, addDoc, getDocs, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION_NAME = 'transacoes';

// Adicionar transação
export const adicionarTransacao = async (transacao) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), transacao);
    return { id: docRef.id, ...transacao };
  } catch (error) {
    console.error('Erro ao adicionar transação:', error);
    throw error;
  }
};

// Buscar todas as transações
export const buscarTransacoes = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    throw error;
  }
};

// Deletar transação
export const deletarTransacao = async (id) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error('Erro ao deletar transação:', error);
    throw error;
  }
};

// Escutar mudanças em tempo real
export const escutarTransacoes = (callback) => {
  return onSnapshot(collection(db, COLLECTION_NAME), (snapshot) => {
    const transacoes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(transacoes);
  });
};