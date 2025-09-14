import { Link } from 'react-router-dom'

export default function Footer() {
	const currentYear = new Date().getFullYear()
	
	return (
		<footer className="footer">
			<div className="footer-container">
				<div className="footer-content">
					{/* Brand Section */}
					<div className="footer-section">
						<div className="footer-brand">
							<h3>Store Ratings</h3>
							<p>Your trusted platform for store reviews and ratings. Discover the best stores in your area and share your experiences.</p>
						</div>
					</div>
					
					{/* Quick Links */}
					<div className="footer-section">
						<h4>Quick Links</h4>
						<ul className="footer-links">
							<li><Link to="/">Home</Link></li>
							<li><Link to="/stores">Browse Stores</Link></li>
							<li><Link to="/login">Login</Link></li>
							<li><Link to="/signup">Sign Up</Link></li>
						</ul>
					</div>
					
					{/* Features */}
					<div className="footer-section">
						<h4>Features</h4>
						<ul className="footer-links">
							<li>Store Ratings</li>
							<li>User Reviews</li>
							<li>Search & Filter</li>
							<li>Admin Dashboard</li>
						</ul>
					</div>
					
					{/* Contact Info */}
					<div className="footer-section">
						<h4>Contact</h4>
						<div className="footer-contact">
							<p>📧 support@storeratings.com</p>
							<p>📞 +1 (555) 123-4567</p>
							<p>📍 123 Business St, City, State 12345</p>
						</div>
					</div>
				</div>
				
				{/* Footer Bottom */}
				<div className="footer-bottom">
					<div className="footer-bottom-content">
						<p>&copy; {currentYear} Store Ratings Platform. All rights reserved.</p>
						<div className="footer-bottom-links">
							<Link to="/privacy">Privacy Policy</Link>
							<Link to="/terms">Terms of Service</Link>
							<Link to="/about">About Us</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
