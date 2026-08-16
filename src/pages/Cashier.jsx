import { useCashierStore } from '../hooks/useCashierStore';
import CashierHeader from '../components/cashier/CashierHeader';
import CashierFilter from '../components/cashier/CashierFilter';
import ProductGrid from '../components/cashier/ProductGrid';
import CartPanel from '../components/cashier/CartPanel';
import SuccessModal from '../components/cashier/SuccessModal';

export default function Cashier() {
  const {
    cart,
    setCart,
    isProcessing,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    paymentAmount,
    setPaymentAmount,
    successModal,
    setSuccessModal,
    fetchProducts,
    addToCart,
    decreaseQty,
    totalAmount,
    paymentNum,
    changeAmount,
    handleCheckout,
    categoriesList,
    filteredProducts
  } = useCashierStore();

  return (
    <div className="flex h-screen bg-[#09090b] text-zinc-100 font-sans overflow-hidden">
      {/* SISI KIRI: KATALOG & FILTER */}
      <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden p-6 gap-5">
        <CashierHeader onRefresh={fetchProducts} />
        <CashierFilter 
          categoriesList={categoriesList}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div className="flex-1 overflow-y-auto pr-1">
          <ProductGrid 
            products={filteredProducts}
            cart={cart}
            onAddToCart={addToCart}
          />
        </div>
      </div>

      {/* SISI KANAN: PANEL KERANJANG */}
      <CartPanel 
        cart={cart}
        setCart={setCart}
        decreaseQty={decreaseQty}
        addToCart={addToCart}
        paymentAmount={paymentAmount}
        setPaymentAmount={setPaymentAmount}
        paymentNum={paymentNum}
        changeAmount={changeAmount}
        totalAmount={totalAmount}
        handleCheckout={handleCheckout}
        isProcessing={isProcessing}
      />

      {/* MODAL SUKSES TRANSAKSI */}
      <SuccessModal 
        successModal={successModal}
        onClose={() => setSuccessModal(null)}
      />
    </div>
  );
}
