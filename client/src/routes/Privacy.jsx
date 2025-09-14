import '../theme.css'

export default function Privacy() {
	return (
		<div className="container">
			<div className="card">
				<h1>Privacy Policy</h1>
				<p>Last updated: {new Date().toLocaleDateString()}</p>
				
				<h2>Information We Collect</h2>
				<p>We collect information you provide directly to us, such as when you create an account, submit ratings, or contact us for support.</p>
				
				<h2>How We Use Your Information</h2>
				<p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
				
				<h2>Information Sharing</h2>
				<p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
				
				<h2>Data Security</h2>
				<p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
				
				<h2>Contact Us</h2>
				<p>If you have any questions about this Privacy Policy, please contact us at support@storeratings.com</p>
			</div>
		</div>
	)
}
