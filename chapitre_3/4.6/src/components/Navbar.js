import React, { useState } from "react";
import "./Navbar.scss";

const Navbar = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<nav className="navbar">
			<div className="navbar__logo">MyLogo</div>
			<button
				className="navbar__toggle"
				onClick={() => setMenuOpen(!menuOpen)}
			>
				☰
			</button>
			<ul
				className={`navbar__links ${
					menuOpen ? "navbar__links--open" : ""
				}`}
			>
				<li className="navbar__item">
					<a href="/" className="navbar__link">
						Accueil
					</a>
				</li>
				<li className="navbar__item">
					<a href="/about" className="navbar__link">
						À propos
					</a>
				</li>
				<li className="navbar__item">
					<a
						href="/services"
						className="navbar__link"
						onClick={() => setDropdownOpen(!dropdownOpen)}
					>
						Services
					</a>
					{dropdownOpen && (
						<ul className="navbar__dropdown">
							<li>
								<a
									href="/services/web"
									className="navbar__dropdown-link"
								>
									Web Development
								</a>
							</li>
							<li>
								<a
									href="/services/design"
									className="navbar__dropdown-link"
								>
									Design
								</a>
							</li>
							<li>
								<a
									href="/services/marketing"
									className="navbar__dropdown-link"
								>
									Marketing
								</a>
							</li>
						</ul>
					)}
				</li>
				<li className="navbar__item">
					<a href="/contact" className="navbar__link">
						Contact
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
