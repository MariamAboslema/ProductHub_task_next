import { useRouter } from "next/router";

const ErrorComponent = () => {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "8rem",
          fontWeight: "900",
          color: "#5E9FD1",
          lineHeight: 1,
        }}
      >
        404
      </h1>
      <h2 style={{ fontWeight: "700", color: "#1e3a8a", marginTop: "1rem" }}>Page Not Found</h2>
      <p
        style={{
          color: "#6b7280",
          fontSize: "1rem",
          maxWidth: "400px",
          margin: "1rem auto",
        }}
      >
        The page you are looking for does not exist. It might have been removed or the URL is incorrect.
      </p>

      <button
        className="btn btn-lg fw-bold px-5 mt-3"
        onClick={() => router.replace("/")}
        style={{
          backgroundColor: "#5E9FD1",
          color: "#fff",
          borderRadius: "50px",
          border: "none",
        }}
      >
         Back to Home</button>
    </div>
  );
};

export default ErrorComponent;