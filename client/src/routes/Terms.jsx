import '../theme.css'

export default function Terms() {
	return (
		<div className="container">
			<div className="card">
				<h1>Terms of Service</h1>
				<p>Last updated: {new Date().toLocaleDateString()}</p>
				
				<h2>Acceptance of Terms</h2>
				<p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
				
				<h2>Use License</h2>
				<p>Permission is granted to temporarily download one copy of the materials on Store Ratings Platform for personal, non-commercial transitory viewing only.</p>
				
				<h2>User Accounts</h2>
				<p>When you create an account with us, you must provide information that is accurate, complete, and current at all times.</p>
				
				<h2>Prohibited Uses</h2>
				<p>You may not use our service for any unlawful purpose or to solicit others to perform unlawful acts.</p>
				
				<h2>Content</h2>
				<p>Our service allows you to post ratings and reviews. You are responsible for the content that you post to the service.</p>
				
				<h2>Termination</h2>
				<p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever.</p>
				
				<h2>Contact Information</h2>
				<p>If you have any questions about these Terms of Service, please contact us at support@storeratings.com</p>
			</div>
		</div>
	)
}
