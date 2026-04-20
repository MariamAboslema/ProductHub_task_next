import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const CartComponent = () => {
    const [cart, setCart] = useState([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
        setMounted(true);
    }, []);

    const syncStorage = (newCart) => {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const updateQuantity = (id, change) => {
        const newCart = cart
            .map((item) => {
                if (item._id === id) {
                    const newQty = item.quantity + change;
                    return { ...item, quantity: newQty };
                }
                return item;
            })
            .filter((item) => item.quantity > 0);

        syncStorage(newCart);
    };

    const removeItem = (id) => {
        if (confirm("Are you sure you want to remove this item?")) {
            const newCart = cart.filter((item) => item._id !== id);
            syncStorage(newCart);
        }
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleBuy = () => {
        if (cart.length === 0) return;
        alert(`🎉 Purchase Successful!\n\nTotal: $${total.toFixed(2)}`);
        syncStorage([]);
    };

    if (!mounted) return <div className="py-5 text-center">Loading...</div>;

    return (
        <div className="py-4 px-3" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 className=" mb-4" style={{ color: "#1e3a8a" }}>Your Shopping Cart 🛒</h2>

            {cart.length === 0 ? (
                <div className="text-center py-5 shadow-sm bg-white" style={{ borderRadius: "20px" }}>
                    <div style={{ fontSize: "40px", color: "#5E9FD1" }}>Empty cart</div>
                    <Link href="/products" className="btn mt-3 px-4 py-2"
                        style={{ backgroundColor: "#5E9FD1", color: "#fff", borderRadius: "40px" }}>
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <>
                    {cart.map((item) => (
                        <div key={item._id} className="card mb-3 border-0 shadow-sm" style={{ borderRadius: "16px" }}>
                            <div className="row g-0 align-items-center">
                                <div className="col-4 col-md-3">
                                    <div style={{ position: "relative", height: "120px" }}>
                                        <Image src={item.thumbnail} alt={item.title} fill style={{ objectFit: "contain", padding: "10px" }} />
                                    </div>
                                </div>
                                <div className="col-8 col-md-9">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start">
                                            <h6 className="fw-bold text-truncate" style={{ maxWidth: "200px" }}>{item.title}</h6>
                                            <button className="btn btn-sm text-danger" onClick={() => removeItem(item._id)}>🗑️</button>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <div className="d-flex align-items-center bg-light" style={{ borderRadius: "10px", padding: "2px 8px" }}>
                                                <button className="btn btn-sm fw-bold" onClick={() => updateQuantity(item._id, -1)} style={{ color: "#5E9FD1" }}>-</button>
                                                <span className="mx-3 fw-bold">{item.quantity}</span>
                                                <button className="btn btn-sm fw-bold" onClick={() => updateQuantity(item._id, 1)} style={{ color: "#5E9FD1" }}>+</button>
                                            </div>

                                            <div className="text-end">
                                                <div className="fw-bold fs-5" style={{ color: "#5E9FD1" }}>
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="card mt-4 border-0 shadow-lg" style={{ borderRadius: "20px", backgroundColor: "#5E9FD1", color: "#fff" }}>
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div> <p className="mb-0">Total Amount</p> <h2 className="fw-bold mb-0">${total.toFixed(2)}</h2> </div> <button onClick={handleBuy} className="btn btn-light px-5 py-3 fw-bold" style={{ borderRadius: "15px", color: "#5E9FD1" }}> Checkout 🚀 </button> </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartComponent;