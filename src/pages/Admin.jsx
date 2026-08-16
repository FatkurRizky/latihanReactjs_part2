import { useAdminProducts } from '../hooks/useAdminProducts';
import AdminHeader from '../components/admin/AdminHeader';
import AdminStats from '../components/admin/AdminStats';
import AdminFilter from '../components/admin/AdminFilter';
import ProductTable from '../components/admin/ProductTable';
import ProductModal from '../components/admin/ProductModal';
import CustomAlertModal from '../components/common/CustomAlertModal';

export default function Admin() {
  const {
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
  } = useAdminProducts();

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-5">
        <AdminHeader 
          onOpenAddModal={() => openForm(null)}
          csvInputRef={csvInputRef}
          handleImportCSV={handleImportCSV}
        />
        <AdminStats products={products} />
        <AdminFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <ProductTable 
          products={filteredProducts}
          onEdit={openForm}
          onDelete={handleDelete}
        />
        <ProductModal 
          showForm={showForm}
          closeForm={closeForm}
          handleSave={handleSave}
          formData={formData}
          setFormData={setFormData}
          categories={categories}
          fileInputRef={fileInputRef}
          handleImageChange={handleImageChange}
          imagePreview={imagePreview}
          isSubmitting={isSubmitting}
        />

        {/* Custom Modern Glassmorphism Alert & Confirmation Modal */}
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
