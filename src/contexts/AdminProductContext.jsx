import { useState, useEffect, createContext, useRef } from "react";
import axios from "axios";


const DEFAULT_CATEGORIES = [
    { id: 1, name: "Sembako" },
    { id: 2, name: "Rokok" },
    { id: 3, name: "Snack" },
    { id: 4, name: "Sabun" },
    { id: 5, name: "Bumbu Dapur" }
]

const INITIAL_FORM = {
    id: null, name: '', price: '', cost_price: '', stock: '', unit: 'pcs', category_id: ''
}

const POPUP = {
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    onConfirm: null,
    confirmText: 'Ya, Lanjutkan',
    cancelText: 'Batal'
}


export const AdminProductContext = createContext()

export function AdminProductProvider({ children }) {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL')
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [showForm, setShowForm] = useState(false)
    const [alertModal, setAlertModal] = useState(POPUP)
    const fileInputRef = useRef(null)
    const csvInputRef = useRef(null)



    const showAlert = (title, message, type = 'info', onConfirm = null, confirmText = 'Ya, Lanjutkan') => {
        setAlertModal({
            isOpen: true,
            title,
            message,
            type,
            onConfirm,
            confirmText,
            cancelText: 'Batal'
        })
    }

    const closeAlert = () => {
        setAlertModal(prev => ({ ...prev, isOpen: false }))
    }

    const closeForm = () => {
        setShowForm(false);
        setImageFile(null);
        setImagePreview(null);
    }

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/products')

            const list = Array.isArray(response.data.data) ? response.data.data : (Array.isArray(response.data) ? response.data : [])

            setProducts(list)
        }

        catch (err) {
            console.error('Gagal memuat produk', err)
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/categories')

            const list = Array.isArray(response.data.data) ? response.data.data : (Array.isArray(response.data) ? response.data : []);
            setCategories(list.length > 0 ? list : DEFAULT_CATEGORIES)
        }
        catch {
            setCategories(DEFAULT_CATEGORIES)

        }
    }

    useEffect(() => {

        const loadData = async () => {
            await fetchProducts();
            await fetchCategories();
        }

        loadData()
    }, [])


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file))
        }
    }


    const openForm = (product = null) => {
        if (product) {
            setFormData({
                id: product.id,
                name: product.name,
                price: product.price,
                cost_price: product.cost_price || '',
                stock: product.stock,
                unit: product.unit,
                category_id: product.category ? (product.category.id || '') : ''
            });

            setImagePreview(product.image_url || null);
        } else {
            setFormData(INITIAL_FORM)
        }

        setImageFile(null);
        setShowForm(true)
    }

    const handleSave = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('cost_price', formData.cost_price || '');
        data.append('stock', formData.stock);
        data.append('unit', formData.unit || 'pcs');
        data.append('category_id', formData.category_id)
        if (imageFile) {
            data.append('image', imageFile);
        }
        try {

            if (formData.id) {
                data.append('_method', 'PUT');
                await axios.post(`http://127.0.0.1:8000/api/products/${formData.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                closeForm();
                fetchProducts();
                showAlert('Berhasil Restock!', 'Stok dan harga barang berhasil', 'success');
            } else {
                await axios.post('http://127.0.0.1:8000/api/products', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })

                closeForm();
                fetchProducts();
                showAlert('Produk Baru berhasil ditambah!', 'Barang sembako baru siap dijual.', 'success')
            }
        } catch (err) {
            showAlert('Gagal memperbarui', err.response?.data?.message || 'Periksa kembali data input form.', 'error');
        } finally {
            setIsSubmitting(false)
        }


    }




    const handleDelete = (id) => {
        const targetProduct = products.find(p => p.id === id);
        const name = targetProduct ? targetProduct.name : 'barang ini'

        showAlert(
            'Hapus Barang',
            `Apakah Anda yakin ingin menghapus "${name}" dari inventaris gudang?`,
            'confirm',
            async () => {
                try {
                    await axios.delete(`http://127.0.0.1:8000/api/products/${id}`)

                    fetchProducts()
                    showAlert('Barang Dihapus', `"${name}" telah berhasil dihapus`, 'success')
                }

                catch {
                    showAlert('Gagal Hapus', 'Terjadi kesalahan saat menghapus barang')
                }

            },

            'Ya, Hapus Barang'
        )
    }

    const handleImportCsv = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
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
                showAlert('Import Gagal', 'File Csv kosong atau format tidak sesuai.', 'error')
                return
            }

            try {
                const response = await axios.post('http://127.0.0.1:8000/api/products/import', {
                    products: parsedProducts
                })

                fetchProducts();
                showAlert('Import Massal Berhasil!', response.data.message || `Berhasil memasukkan ${parsedProducts.length} produk sekaligus ke gudang!`, 'success');
                if (csvInputRef.current) csvInputRef.current.value = '';
            } catch (err) {
                showAlert('Gagal Import', err.response?.data?.message || 'Gagal memproses data produk.', 'error');
                if (csvInputRef.current) csvInputRef.current.value = '';
            }
        }

        reader.readAsText(file)
    }

    const filterProduct = products.filter(p => {
        const catName = typeof p.category === 'object' ? p.category?.name : (p.category || 'Umum');
        const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCat = selectedCategory === 'ALL' || catName === selectedCategory

        return matchSearch && matchesCat
    })




    return (
        <AdminProductContext.Provider value={{ handleSave, handleDelete, handleImageChange, handleImportCsv, fetchProducts, fetchCategories, showAlert, products, selectedCategory, categories, searchTerm, setSearchTerm, showForm, isSubmitting, formData, imagePreview, fileInputRef, csvInputRef, openForm, closeForm, closeAlert, alertModal, filterProduct, setSelectedCategory, setFormData }}>
            {children}
        </AdminProductContext.Provider>
    )
}
