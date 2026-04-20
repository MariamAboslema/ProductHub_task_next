import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();

  return (
    <nav className="navbar navbar-expand-lg shadow-sm py-0"style={{ backgroundColor: "#5E9FD1", borderBottom: "2px solid #e8f0fe" }}>
      <div className="container-fluid ps-lg-5 pe-lg-4"> 
        <Link className="navbar-brand d-flex align-items-center gap-2" href="/">
          <div className="logo-circle">
            <Image src="/logo.png"alt="ProductHub Logo"width={60}height={60}quality={75}priority className="imageLogo"/>
          </div>
          <span  className='logoWord'>ProductHub</span>
        </Link>

        <button
          className="navbar-toggler navbar-dark"type="button"data-bs-toggle="collapse"data-bs-target="#navbarContent"aria-controls="navbarContent"aria-expanded="false"aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <Link className="nav-link fw-semibold"href="/"style={{ color: router.pathname === "/" ? "white" : "#D1E2FF" }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" href="/products"style={{ color: router.pathname === "/products" ? "white" : "#D1E2FF" }}>Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold"href="/about"style={{ color: router.pathname === "/about" ? "white" : "#D1E2FF" }}>About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" href="/cart" style={{ color: router.pathname === "/cart" ? "white" : "#D1E2FF" }}>Cart</Link>
            </li>
            <li className="nav-item ms-lg-3">
            <button className="signup-btn">Sign Up</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;