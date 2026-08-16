import { useHistoryTransactions } from '../hooks/useHistoryTransactions';
import HistoryHeader from '../components/history/HistoryHeader';
import HistoryTable from '../components/history/HistoryTable';
import ReceiptModal from '../components/history/ReceiptModal';
import TopProductsChart from '../components/history/TopProductsChart';
import CustomAlertModal from '../components/common/CustomAlertModal';

export default function History() {
  const {
    transactions,
    selectedReceipt,
    setSelectedReceipt,
    totalRevenue,
    totalProfit,
    handlePrint,
    handleDeleteTransaction,
    alertModal,
    closeAlert
  } = useHistoryTransactions();

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-6 font-sans">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #printable-receipt, #printable-receipt * { visibility: visible; }
          #printable-receipt { 
            position: absolute; 
            left: 50%; 
            top: 0; 
            transform: translateX(-50%); 
            width: 100%; 
            max-width: 300px; 
            color: black !important; 
            background: white !important;
            padding: 16px !important;
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto space-y-5">
        <HistoryHeader 
          totalRevenue={totalRevenue}
          totalProfit={totalProfit}
          totalTransactions={transactions.length} 
        />

        {/* Grafik Produk Terlaris (Top Selling Analytics) */}
        <TopProductsChart transactions={transactions} />

        {/* Tabel Riwayat Transaksi */}
        <HistoryTable 
          transactions={transactions} 
          onSelectReceipt={setSelectedReceipt} 
          onDeleteTransaction={handleDeleteTransaction}
        />

        {/* Modal Cetak Struk */}
        <ReceiptModal 
          selectedReceipt={selectedReceipt} 
          onClose={() => setSelectedReceipt(null)} 
          onPrint={handlePrint} 
        />

        {/* Custom Modern Glassmorphic Alert Modal */}
        <CustomAlertModal
          isOpen={alertModal.isOpen}
          onClose={closeAlert}
          onConfirm={alertModal.onConfirm}
          title={alertModal.title}
          message={alertModal.message}
          type={alertModal.type}
          confirmText={alertModal.confirmText}
          cancelText={alertModal.cancelText}
        />
      </div>
    </div>
  );
}
