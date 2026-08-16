import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const DEFAULT_CATEGORIES = [
  { id: 1, name: 'Sembako Utama' },
  { id: 2, name: 'Bumbu Dapur' },
  { id: 3, name: 'Rokok & Korek' },
  { id: 4, name: 'Snack & Mi' },
  { id: 5, name: 'Sabun' },
];

export function useAdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: '', price: '', cost_price: '', stock: '', unit: 'pcs', category_id: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const csvInputRef = useRef(null);

  // Modern Popup State
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

  const fetchProducts = () => {
    axios.get('http://127.0.0.1:8000/api/products')
      .then(res => {
        const list = Array.isArray(res.data.data) ? res.data.data : (Array.isArray(res.data) ? res.data : []);
        setProducts(list);
      })
      .catch(err => console.error('Gagal mengambil produk:', err));
  };

  const fetchCategories = () => {
    axios.get('http://127.0.0.1:8000/api/categories')
      .then(res => {
        const list = Array.isArray(res.data.data) ? res.data.data : (Array.isArray(res.data) ? res.data : []);
        setCategories(list.length > 0 ? list : DEFAULT_CATEGORIES);
      })
      .catch(() => setCategories(DEFAULT_CATEGORIES));
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const openForm = (product = null) => {
    if (product) {
      setFormData({ 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        cost_price: product.cost_price || '',
        stock: product.stock, 
        unit: product.unit || 'pcs',
        category_id: product.category ? (product.category.id || '') : '' 
      });
      setImagePreview(product.image_url || null);
    } else {
      setFormData({ id: null, name: '', price: '', cost_price: '', stock: '', unit: 'pcs', category_id: '' });
      setImagePreview(null);
    }
    setImageFile(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('cost_price', formData.cost_price || '');
    data.append('stock', formData.stock);
    data.append('unit', formData.unit || 'pcs');
    data.append('category_id', formData.category_id);
    if (imageFile) {
      data.append('image', imageFile);
    }

    if (formData.id) {
      data.append('_method', 'PUT');
      axios.post(`http://127.0.0.1:8000/api/products/${formData.id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then(() => {
          closeForm();
          fetchProducts();
          showAlert('Berhasil Restock!', 'Stok dan harga barang berhasil diperbarui di database.', 'success');
        })
        .catch(err => {
          showAlert('Gagal Memperbarui', err.response?.data?.message || 'Periksa kembali data input form.', 'error');
        })
        .finally(() => setIsSubmitting(false));
    } else {
      axios.post('http://127.0.0.1:8000/api/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then(() => {
          closeForm();
          fetchProducts();
          showAlert('Produk Baru Berhasil Ditambah!', 'Barang sembako baru siap dijual.', 'success');
        })
        .catch(err => {
          showAlert('Gagal Menyimpan', err.response?.data?.message || 'Periksa kembali data input form.', 'error');
        })
        .finally(() => setIsSubmitting(false));
    }
  };

  const handleDelete = (id) => {
    const targetProduct = products.find(p => p.id === id);
    const name = targetProduct ? targetProduct.name : 'barang ini';

    showAlert(
      'Hapus Barang?',
      `Apakah Anda yakin ingin menghapus "${name}" dari inventaris gudang?`,
      'confirm',
      () => {
        axios.delete(`http://127.0.0.1:8000/api/products/${id}`)
          .then(() => {
            fetchProducts();
            showAlert('Barang Dihapus', `"${name}" telah berhasil dihapus.`, 'success');
          })
          .catch(() => showAlert('Gagal Hapus', 'Terjadi kesalahan saat menghapus barang.', 'error'));
      },
      'Ya, Hapus Barang'
    );
  };

  const handleImportCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split('\n').filter(l => l.trim().length > 0);
      const parsedProducts = [];

      const startIdx = lines[0].toLowerCase().includes('nama') || lines[0].toLowerCase().includes('name') ? 1 : 0;

      for (let i = startIdx; i < lines.length; i++) {
        const cols = lines[i].split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));
        if (cols.length >= 2) {
          parsedProducts.push({
            name: cols[0],
            price: Number(cols[1]) || 0,
            cost_price: cols[2] ? Number(cols[2]) : undefined,
            stock: cols[3] ? Number(cols[3]) : 10,
            unit: cols[4] || 'pcs',
            category: cols[5] || 'Sembako Utama'
          });
        }
      }

      if (parsedProducts.length === 0) {
        showAlert('Import Gagal', 'File CSV kosong atau format tidak sesuai.', 'error');
        return;
      }

      axios.post('http://127.0.0.1:8000/api/products/import', { products: parsedProducts })
        .then(res => {
          fetchProducts();
          showAlert('Import Massal Berhasil!', res.data.message || `Berhasil memasukkan ${parsedProducts.length} produk sekaligus ke gudang!`, 'success');
          if (csvInputRef.current) csvInputRef.current.value = '';
        })
        .catch(err => {
          showAlert('Gagal Import', err.response?.data?.message || 'Gagal memproses data produk.', 'error');
          if (csvInputRef.current) csvInputRef.current.value = '';
        });
    };
    reader.readAsText(file);
  };

  const filteredProducts = products.filter(p => {
    const catName = typeof p.category === 'object' ? p.category?.name : (p.category || 'Umum');
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || catName === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return {
    products,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    showForm,
    isSubmitting,
    formData,
    setFormData,
    imagePreview,
    fileInputRef,
    csvInputRef,
    handleImageChange,
    openForm,
    closeForm,
    handleSave,
    handleDelete,
    handleImportCSV,
    filteredProducts,
    alertModal,
    closeAlert
  };
}
