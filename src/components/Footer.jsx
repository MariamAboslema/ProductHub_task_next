import Link from "next/link";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#5E9FD1"}}>
      <div className="container-fluid ps-lg-5 pe-lg-4 py-3">
        <div className="d-flex justify-content-between align-items-center">
          <span className="logoWord">🛒 ProductHub</span>
          <span style={{ color: "#D1E2FF", fontSize: "18px" }}>
            © 2026 ProductHub</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;