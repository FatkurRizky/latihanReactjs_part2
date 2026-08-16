import { useState, useEffect } from 'react';
import axios from 'axios';

export function useCashierStore() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [successModal, setSuccessModal] = useState(null);

  const fetchProducts = () => {
    axios.get('http://127.0.0.1:8000/api/products')
      .then(response => {
        const list = Array.isArray(response.data.data) ? response.data.data : (Array.isArray(response.data) ? response.data : []);
        setProducts(list);
      })
      .catch(error => console.error("Gagal mengambil produk:", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    if (product.stock <= 0) {
      alert("Stok barang ini sudah habis!");
      return;
    }
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      if (existing.qty >= product.stock) {
        alert(`Stok ${product.name} terbatas! (Maksimal ${product.stock})`);
        return;
      }
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const decreaseQty = (productId) => {
    const existing = cart.find(item => item.id === productId);
    if (existing.qty === 1) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item => item.id === productId ? { ...item, qty: item.qty - 1 } : item));
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const paymentNum = parseFloat(paymentAmount) || 0;
  const changeAmount = paymentNum > 0 ? paymentNum - totalAmount : 0;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    if (paymentNum < totalAmount && paymentAmount !== '') {
      alert(`Uang pembayaran kurang! Kurang Rp ${(totalAmount - paymentNum).toLocaleString('id-ID')}`);
      return;
    }

    setIsProcessing(true);

    const payload = {
      payment: paymentNum > 0 ? paymentNum : totalAmount,
      items: cart.map(item => ({
        product_id: item.id,
        quantity: item.qty
      }))
    };

    axios.post('http://127.0.0.1:8000/api/checkout', payload)
      .then(response => {
        const resData = response.data.data;
        setSuccessModal({
          invoice: resData.invoice_number,
          total: totalAmount,
          payment: paymentNum > 0 ? paymentNum : totalAmount,
          change: paymentNum > 0 ? paymentNum - totalAmount : 0
        });
        setCart([]);
        setPaymentAmount('');
        fetchProducts();
      })
      .catch(error => {
        alert('❌ Gagal: ' + (error.response?.data?.message || 'Terjadi kesalahan transaksi'));
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  const categoriesList = [
    'ALL', ...new Set(
      products.map(p => typeof p.category === 'object' ? p.category?.name : p.category)
      .filter(Boolean)
    )
  ];

  const filteredProducts = products.filter(product => {
    const catName = typeof product.category === 'object' ? product.category?.name : product.category;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || catName === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return {
    products,
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
    categories: categoriesList,
    filteredProducts
  };
}
