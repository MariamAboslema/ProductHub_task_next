import { useState } from "react";
import Image from "next/image";

const ProductCard = ({ product, onEdit, onSeeMore, onDelete }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = existingCart.findIndex(item => item._id === product._id);
    if (productIndex > -1) {
      existingCart[productIndex].quantity += quantity;
    } else {
      existingCart.push({ ...product, quantity });
    }
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert(`Added ${quantity} of ${product.title} to your cart successfully! 🛒`);
  };

  return (
    <div
      className="card h-100 border-0"
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid #e2eaf6",
        boxShadow: "0 2px 12px rgba(94,159,209,0.08)",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "160px", backgroundColor: "#f0f6fb" }}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          style={{ objectFit: "contain", padding: "14px" }}
        />
        <span
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            backgroundColor: "#dbeafe",
            color: "#1e40af",
            fontSize: "0.68rem",
            fontWeight: "600",
            padding: "3px 10px",
            borderRadius: "20px",
          }}
        >
          {product.category}
        </span>
      </div>

      <div className="card-body d-flex flex-column p-3" style={{ gap: "8px" }}>
        <h6
          className="fw-bold mb-0"
          style={{ color: "#1e3a8a", fontSize: "0.85rem", lineHeight: "1.4", minHeight: "38px" }}
        >
          {product.title.length > 50 ? product.title.substring(0, 50) + "..." : product.title}
        </h6>

        <p className="fw-bold mb-0" style={{ color: "#5E9FD1", fontSize: "1.1rem" }}>
          ${product.price}
        </p>

        <div
          className="d-flex align-items-center gap-2"
          style={{ backgroundColor: "#f0f6fb", borderRadius: "10px", padding: "6px 10px" }}
        >
          <div className="d-flex align-items-center gap-1">
            <button
              className="btn btn-sm"
              onClick={handleDecrement}
              style={{
                backgroundColor: "#fff",
                border: "1px solid #c8dff0",
                borderRadius: "6px",
                color: "#5E9FD1",
                fontWeight: "700",
                lineHeight: 1,
                padding: "2px 8px",
                fontSize: "1rem",
              }}
            >-</button>
            <span style={{ fontWeight: "700", fontSize: "0.9rem", minWidth: "20px", textAlign: "center", color: "#1e3a8a" }}>
              {quantity}
            </span>
            <button
              className="btn btn-sm"
              onClick={handleIncrement}
              style={{
                backgroundColor: "#fff",
                border: "1px solid #c8dff0",
                borderRadius: "6px",
                color: "#5E9FD1",
                fontWeight: "700",
                lineHeight: 1,
                padding: "2px 8px",
                fontSize: "1rem",
              }}
            >+</button>
          </div>
          <button
            className="btn btn-sm  flex-grow-1"
            onClick={addToCart}
            style={{
              backgroundColor: "#5E9FD1",
              color: "#fff",
              borderRadius: "8px",
              border: "none",
              fontSize: "0.98rem",
              padding: "5px 0",
            }}
          >
            🛒 Add to Cart
          </button>
        </div>

        <div className="d-flex gap-2 mt-1">
          <button
            className="btn btn-sm flex-fill"
            style={{ backgroundColor: "#fef9ec", color: "#92400e", border: "1px solid #fde68a", borderRadius: "8px", fontSize: "0.75rem", fontWeight: "600" }}
            onClick={() => onEdit(product)}
          >✏️ Edit</button>
          <button
            className="btn btn-sm flex-fill"
            style={{ backgroundColor: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0", borderRadius: "8px", fontSize: "0.75rem", fontWeight: "600" }}
            onClick={() => onSeeMore(product)}
          >👁️ More</button>
          <button
            className="btn btn-sm"
            style={{ backgroundColor: "#fff5f5", color: "#991b1b", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "0.75rem", padding: "4px 10px" }}
            onClick={() => onDelete(product._id)}
          >🗑️</button>
        </div>
      </div>
    </div>
  );
};

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

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSave = () => { onSave(form); onClose(); };

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "2rem", width: "90%", maxWidth: "500px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold m-0" style={{ color: "#1e3a8a" }}>{isEdit ? "✏️ Edit Product" : "➕ Add New Product"}</h5>
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
          <button className="btn fw-semibold" style={{ backgroundColor: "#5E9FD1", color: "#fff", border: "none" }} onClick={handleSave}>
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
          <Image src={product.thumbnail} alt={product.title} fill style={{ objectFit: "contain", borderRadius: "12px", backgroundColor: "#f0f6fb" }} />
        </div>
        <h5 className="fw-bold mt-3">{product.title}</h5>
        <span className="badge mb-2" style={{ backgroundColor: "#dbeafe", color: "#1e40af" }}>{product.category}</span>
        <p className="text-muted mt-2">{product.description}</p>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span style={{ fontSize: "1.5rem", fontWeight: "800", color: "#5E9FD1" }}>${product.price}</span>
          <span className="badge bg-warning text-dark">⭐ {product.rating}</span>
          <span className="badge bg-success">Stock: {product.stock}</span>
        </div>
        <button className="btn w-100 mt-3 fw-semibold" style={{ backgroundColor: "#5E9FD1", color: "#fff", border: "none", borderRadius: "10px" }} onClick={onClose}>
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
    selectedCategory === "All" ? productList : productList.filter((p) => p.category === selectedCategory);

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
    if (confirm("Are you sure you want to delete?")) {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      setProductList((prev) => prev.filter((p) => p._id !== id));
    }
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
    try {
      const res = await fetch(`/api/products/${form._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: parseFloat(form.price) || 0 }),
      });
      const data = await res.json();
      if (data.success) {
        setProductList((prev) => prev.map((p) => (p._id === form._id ? data.product : p)));
        setEditProduct(null);
      }
    } catch (error) { console.error("Update Error:", error); }
  };

  return (
    <div className="py-4">
      <div
        className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2 px-3"
        style={{ minHeight: "38px" }}
      >
        <h2 className="fw-bold m-0" style={{ color: "#1e3a8a", fontSize: "1.4rem" }}>
          Products 🛍️
        </h2>
        <div className="d-flex gap-2 align-items-center">
          <select
            className="form-select form-select-sm"
            style={{
              borderRadius: "8px",
              borderColor: "#c8dff0",
              fontSize: "0.82rem",
              height: "32px",
              paddingTop: "4px",
              paddingBottom: "4px",
            }}
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); setStartIndex(0); }}
          >
            {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <button
            onClick={() => setShowAddModal(true)}
            style={{
              backgroundColor: "#5E9FD1",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "0.82rem",
              fontWeight: "600",
              height: "32px",
              padding: "0 14px",
              whiteSpace: "nowrap",
              cursor: "pointer",
            }}
          >
            + Add New
          </button>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3 px-2">
        <button
          onClick={prev}
          className="btn flex-shrink-0"
          style={{ backgroundColor: "#5E9FD1", color: "#fff", borderRadius: "50%", width: "38px", height: "38px", padding: 0, fontSize: "1.1rem", lineHeight: 1, border: "none" }}
        >‹</button>

        <div className="row g-3 flex-grow-1">
          {visibleProducts.map((product) => (
            <div className="col-md-4" key={product._id}>
              <ProductCard
                product={product}
                onEdit={setEditProduct}
                onSeeMore={setSeeMoreProduct}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>

        <button
          onClick={next}
          className="btn flex-shrink-0"
          style={{ backgroundColor: "#5E9FD1", color: "#fff", borderRadius: "50%", width: "38px", height: "40px", padding: 0, fontSize: "1.1rem", lineHeight: 1, border: "none" }}
        >›</button>
      </div>

      {showAddModal && <ProductModal onClose={() => setShowAddModal(false)} onSave={handleAdd} />}
      {editProduct && <ProductModal key={editProduct._id} onClose={() => setEditProduct(null)} onSave={handleEdit} editProduct={editProduct} />}
      <SeeMoreModal product={seeMoreProduct} onClose={() => setSeeMoreProduct(null)} />
    </div>
  );
};

export default ProductsComponent;
