import { useState } from "react";
import Image from "next/image";

const ProductModal = ({ onClose, onSave, editProduct }) => {
  const isEdit = !!editProduct;

  const [form, setForm] = useState(
    isEdit
      ? {
          _id: editProduct._id || "",
          title: editProduct.title || "",
          price: editProduct.price?.toString() || "",
          category: editProduct.category || "",
          description: editProduct.description || "",
          thumbnail: editProduct.thumbnail || "",
        }
      : { title: "", price: "", category: "", description: "", thumbnail: "" }
  );

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "2rem", width: "90%", maxWidth: "500px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold m-0" style={{ color: "#1e3a8a" }}>
            {isEdit ? "✏️ Edit Product" : "➕ Add New Product"}
          </h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Title</label>
          <input className="form-control" name="title" value={form.title} onChange={handleChange} placeholder="Product title" />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Price ($)</label>
          <input className="form-control" name="price" value={form.price} onChange={handleChange} placeholder="0.00" type="number" />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Category</label>
          <input className="form-control" name="category" value={form.category} onChange={handleChange} placeholder="e.g. Electronics" />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Description</label>
          <textarea className="form-control" name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Product description..." />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Image URL</label>
          <input className="form-control" name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="https://..." />
        </div>

        <div className="d-flex gap-2 justify-content-end">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button
            className="btn fw-semibold"
            style={{ backgroundColor: "#5E9FD1", color: "#fff", border: "none" }}
            onClick={handleSave}
          >
            {isEdit ? "Save Changes" : "Add Product"}
          </button>
        </div>

      </div>
    </div>
  );
};

const SeeMoreModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "2rem", width: "90%", maxWidth: "500px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold m-0" style={{ color: "#1e3a8a" }}>👁️ Product Details</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <div style={{ position: "relative", width: "100%", height: "200px" }}>
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            style={{ objectFit: "contain", borderRadius: "12px", backgroundColor: "#f8fafc" }}
          />
        </div>

        <h5 className="fw-bold mt-3">{product.title}</h5>
        <span className="badge mb-2" style={{ backgroundColor: "#dbeafe", color: "#1e40af" }}>
          {product.category}
        </span>
        <p className="text-muted mt-2">{product.description}</p>

        <div className="d-flex justify-content-between align-items-center mt-2">
          <span style={{ fontSize: "1.5rem", fontWeight: "800", color: "#5E9FD1" }}>${product.price}</span>
          <span className="badge bg-warning text-dark">⭐ {product.rating}</span>
          <span className="badge bg-success">Stock: {product.stock}</span>
        </div>

        <button
          className="btn w-100 mt-3 fw-semibold"
          style={{ backgroundColor: "#5E9FD1", color: "#fff", border: "none", borderRadius: "10px" }}
          onClick={onClose}
        >
          Close
        </button>

      </div>
    </div>
  );
};

const ProductsComponent = ({ products }) => {
  const [productList, setProductList] = useState(products);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [seeMoreProduct, setSeeMoreProduct] = useState(null);
  const cardsPerPage = 3;
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts =
    selectedCategory === "All"
      ? productList
      : productList.filter((p) => p.category === selectedCategory);

  const visibleProducts = [];
  if (filteredProducts.length > 0) {
    for (let i = 0; i < Math.min(cardsPerPage, filteredProducts.length); i++) {
      const index = (startIndex + i) % filteredProducts.length;
      visibleProducts.push(filteredProducts[index]);
    }
  }

  const next = () => setStartIndex((prev) => (prev + 1) % filteredProducts.length);
  const prev = () => setStartIndex((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length);

  const handleDelete = async (id) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProductList((prev) => prev.filter((p) => p._id !== id));
  };

  const handleAdd = async (form) => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: parseFloat(form.price) || 0 }),
    });
    const data = await res.json();
    if (data.success) setProductList((prev) => [data.product, ...prev]);
  };

   const handleEdit = async (form) => {
    if (!form._id) {
      console.error("No product ID");
      return;
    }

    try {
      const res = await fetch(`/api/products/${form._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          price: parseFloat(form.price) || 0,
          category: form.category,
          description: form.description,
          thumbnail: form.thumbnail,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setProductList((prev) =>
          prev.map((p) => (p._id === form._id ? data.product : p))
        );
        
        setEditProduct(null);   
      } 
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

       

  return (
    <div className="py-4">

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h2 className="fw-bold m-0" style={{ color: "#1e3a8a" }}>Products 🛍️</h2>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <select
            className="form-select"
            style={{ width: "180px", borderRadius: "10px", borderColor: "#5E9FD1" }}
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); setStartIndex(0); }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            className="btn fw-bold"
            style={{ backgroundColor: "#5E9FD1", color: "#fff", borderRadius: "10px", border: "none" }}
            onClick={() => setShowAddModal(true)}
          >
            + Add New Product
          </button>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        <button onClick={prev} style={{ backgroundColor: "#5E9FD1", color: "#fff", border: "none", borderRadius: "50%", width: "40px", height: "40px", fontSize: "1.2rem", cursor: "pointer", flexShrink: 0 }}>‹</button>

        <div className="row g-4 flex-grow-1">
          {visibleProducts.map((product) => (
            <div className="col-md-4" key={product._id}>
              <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: "16px", overflow: "hidden" }}>
                <div style={{ position: "relative", width: "100%", height: "150px" }}>
                  <Image src={product.thumbnail} alt={product.title} fill
                    style={{ objectFit: "contain", padding: "10px", backgroundColor: "#f8fafc" }}
                  />
                </div>
                <div className="card-body d-flex flex-column p-3">
                  <span className="badge mb-2" style={{ backgroundColor: "#dbeafe", color: "#1e40af", alignSelf: "flex-start" }}>
                    {product.category}
                  </span>
                  <h6 className="fw-bold" style={{ color: "#1e3a8a" }}>
                    {product.title.length > 40 ? product.title.substring(0, 40) + "..." : product.title}
                  </h6>
                  <p className="fw-bold mt-auto mb-2" style={{ color: "#5E9FD1" }}>${product.price}</p>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm flex-fill"
                      style={{ backgroundColor: "#fef3c7", color: "#92400e", border: "1px solid #fde68a", borderRadius: "8px" }}
                      onClick={() => setEditProduct(product)}>✏️ Edit</button>
                    <button className="btn btn-sm flex-fill"
                      style={{ backgroundColor: "#dcfce7", color: "#166534", border: "1px solid #bbf7d0", borderRadius: "8px" }}
                      onClick={() => setSeeMoreProduct(product)}>👁️ More</button>
                    <button className="btn btn-sm"
                      style={{ backgroundColor: "#fee2e2", color: "#991b1b", border: "1px solid #fecaca", borderRadius: "8px" }}
                      onClick={() => handleDelete(product._id)}>🗑️</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={next} style={{ backgroundColor: "#5E9FD1", color: "#fff", border: "none", borderRadius: "50%", width: "40px", height: "40px", fontSize: "1.2rem", cursor: "pointer", flexShrink: 0 }}>›</button>
      </div>

      {showAddModal && (
        <ProductModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAdd}
          editProduct={null}
        />
      )}

      {editProduct && (
        <ProductModal
          key={editProduct._id}
          onClose={() => setEditProduct(null)}
          onSave={handleEdit}
          editProduct={editProduct}
        />
      )}

      <SeeMoreModal product={seeMoreProduct} onClose={() => setSeeMoreProduct(null)} />
    </div>
  );
};

export default ProductsComponent;