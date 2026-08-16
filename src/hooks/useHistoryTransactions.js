import { useState, useEffect } from 'react';
import axios from 'axios';

export function useHistoryTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    onConfirm: null,
    confirmText: 'Ya, Lanjutkan',
    cancelText: 'Batal'
  });

  const showAlert = (title, message, type = 'info', onConfirm = null, confirmText = 'Ya, Lanjutkan') => {
    setAlertModal({
      isOpen: true,
      title,
      message,
      type,
      onConfirm,
      confirmText,
      cancelText: 'Batal'
    });
  };

  const closeAlert = () => {
    setAlertModal(prev => ({ ...prev, isOpen: false }));
  };

  const fetchTransactions = () => {
    axios.get('http://127.0.0.1:8000/api/transactions')
      .then(res => {
        const list = Array.isArray(res.data.data) ? res.data.data : (Array.isArray(res.data) ? res.data : []);
        setTransactions(list);
      })
      .catch(err => console.error("Gagal mengambil data transaksi:", err));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDeleteTransaction = (id, invoiceNumber) => {
    showAlert(
      'Hapus Riwayat Transaksi?',
      `Apakah Anda yakin ingin menghapus nota transaksi "${invoiceNumber}" ini? Data yang dihapus tidak bisa dikembalikan.`,
      'confirm',
      () => {
        axios.delete(`http://127.0.0.1:8000/api/transactions/${id}`)
          .then(() => {
            fetchTransactions();
            showAlert('Transaksi Dihapus', `Nota "${invoiceNumber}" telah berhasil dihapus.`, 'success');
          })
          .catch(() => showAlert('Gagal Hapus', 'Terjadi kesalahan saat menghapus transaksi.', 'error'));
      },
      'Ya, Hapus Nota'
    );
  };

  const totalRevenue = transactions.reduce((sum, t) => sum + Number(t.total_amount || 0), 0);

  const totalProfit = transactions.reduce((sum, trx) => {
    const trxProfit = (trx.details || []).reduce((dSum, item) => {
      const costPrice = Number(item.product?.cost_price ?? (Number(item.price || 0) * 0.85));
      const profitPerItem = (Number(item.price || 0) - costPrice) * Number(item.quantity || 0);
      return dSum + profitPerItem;
    }, 0);
    return sum + trxProfit;
  }, 0);

  return {
    transactions,
    selectedReceipt,
    setSelectedReceipt,
    totalRevenue,
    totalProfit,
    handlePrint,
    handleDeleteTransaction,
    fetchTransactions,
    alertModal,
    closeAlert
  };
}
