import Link from "next/link";

const AboutComponent = () => {
    return (
        <div>
            <div
                className="text-center py-3"
                style={{
                    background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                    borderRadius: "16px",
                    marginTop: "1.5rem",
                }}
            >
                <div
                    style={{
                        fontSize: "2.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "2.2rem",
                            fontWeight: "400",
                            color: "#1e3a8a",
                            marginBottom: "0.8rem",
                        }}
                    >
                        About <span style={{ color: "#5E9FD1" }}>ProductHub</span> 🛒
                    </h1>

                </div>

                <p
                    style={{
                        maxWidth: "600px",
                        margin: "0.5rem auto",
                        color: "#4b5563",
                        fontSize: "0.85rem",
                    }}
                >
                    ProductHub is a modern platform built to help you discover, manage,and explore thousands of products all in one place.
                </p>
                <Link href="/products">
                    <button
                        className="btn mt-3 px-4"
                        style={{
                            backgroundColor: "#5E9FD1",
                            color: "#fff",
                            borderRadius: "40px",
                            border: "none",
                            fontWeight: "400",
                        }}
                    >
                        Go to Products 🚀
                    </button>
                </Link>
            </div>

            <div className="row mt-3 g-3">
                <div className="col-md-4">
                    <div className="card h-100 text-center border-0 shadow-sm p-3" style={{ borderRadius: "16px" }}>
                        <div style={{ fontSize: "2rem" }}>🎯</div>
                        <h5 style={{ color: "#1e3a8a", marginTop: "4px", fontSize: "1.1rem" }}>Our Mission</h5>
                        <p className="text-muted" style={{ fontSize: "0.85rem", marginBottom: "0" }}>
                            Make product discovery simple, fast, and enjoyable for everyone.
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card h-100 text-center border-0 shadow-sm p-3" style={{ borderRadius: "16px" }}>
                        <div style={{ fontSize: "2rem" }}>💡</div>
                        <h5 style={{ color: "#1e3a8a", marginTop: "4px", fontSize: "1.1rem" }}>Our Vision</h5>
                        <p className="text-muted" style={{ fontSize: "0.85rem", marginBottom: "0" }}>
                            To become the go-to hub for product management worldwide.
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card h-100 text-center border-0 shadow-sm p-3" style={{ borderRadius: "16px" }}>
                        <div style={{ fontSize: "2rem" }}>🤝</div>
                        <h5 style={{ color: "#1e3a8a", marginTop: "4px", fontSize: "1.1rem" }}>Our Values</h5>
                        <p className="text-muted" style={{ fontSize: "0.85rem", marginBottom: "0" }}>
                            Simplicity, transparency, and a user-first approach.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutComponent;