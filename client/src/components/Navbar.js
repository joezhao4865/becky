import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => <div className="app-header">
	<nav className="navbar navbar-expand-lg navbar-dark">
		<Link className="navbar-brand" to="/">
			<em>
				<span style={{color: 'green', fontWeight: 'bold'}}>B</span>ecky
				<span style={{color: 'red', fontWeight: 'bold'}}>{' '}C</span>are
				<span style={{color: 'orange', fontWeight: 'bold'}}>{' '}LLC</span>
			</em>
		</Link>
		<button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar">
			<span className="navbar-toggler-icon"></span>
		</button>
		<div className="navbar-collapse collapse" id="navbar">
			<ul className="navbar-nav">
				<li className="nav-item"><Link to="/" className="nav-link">Claims</Link></li>
				<li className="nav-item"><Link to="/payments" className="nav-link">Payments</Link></li>
				<li className="nav-item"><Link to="/payroll" className="nav-link">Pay Roll</Link></li>
				<li className="nav-item"><Link to="/invoice" className="nav-link">Invoice</Link></li>
				<li className="nav-item"><Link to="/quickbook" className="nav-link">Quick Book</Link></li>
			</ul>
		</div>
	</nav>
</div>

export default Navbar