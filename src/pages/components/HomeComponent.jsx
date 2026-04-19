import Link from "next/link";

const HomeComponent = () => {
  return (
    <div>
      <div
        className="text-center"
        style={{
          background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
          borderRadius: "16px",
          marginTop: "1.5rem",
          padding: "2rem 1rem",
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
          Welcome to <span style={{ color: "#5E9FD1" }}>ProductHub</span> 🛒
        </h1>

        <p
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            color: "#4b5563",
            fontSize: "1rem",
            fontWeight: "400",
          }}
        >
          Discover thousands of products at your fingertips. Browse, compare, and manage your favorite products all in one place.
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

      <div className="row mt-4 g-4">

        <div className="col-md-4">
          <div
            className="card h-100 text-center border-0 shadow-sm p-3"
            style={{ borderRadius: "16px" }}
          >
            <div style={{ fontSize: "2.5rem" }}>📦</div>
            <h5 style={{ color: "#1e3a8a", fontWeight: "400", marginTop: "8px" }}>
              Wide Selection
            </h5>
            <p className="text-muted" style={{ fontSize: "0.95rem" }}>
              Browse hundreds of products across all categories.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card h-100 text-center border-0 shadow-sm p-3"
            style={{ borderRadius: "16px" }}
          >
            <div style={{ fontSize: "2.5rem" }}>✏️</div>
            <h5 style={{ color: "#1e3a8a", fontWeight: "400", marginTop: "8px" }}>
              Easy Management
            </h5>
            <p className="text-muted" style={{ fontSize: "0.95rem" }}>
              Add, edit, or remove products with ease.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card h-100 text-center border-0 shadow-sm p-3"
            style={{ borderRadius: "16px" }}
          >
            <div style={{ fontSize: "2.5rem" }}>⚡</div>
            <h5 style={{ color: "#1e3a8a", fontWeight: "400", marginTop: "8px" }}>
              Fast & Reliable
            </h5>
            <p className="text-muted" style={{ fontSize: "0.95rem" }}>
              Lightning fast performance with real-time data.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default HomeComponent;