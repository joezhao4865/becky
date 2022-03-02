import React, {useState} from 'react'
import {Link} from 'react-router-dom';
const Login = ({login}) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	
	const handleLogin = () => {
		login(true)
	}
	
	return <div>
			<nav className="navbar navbar-expand-lg navbar-dark" style={{borderBottom: '1px solid white'}}>
				<div className="navbar-brand" to="/">
					<em>
						<span style={{color: 'green', fontWeight: 'bold'}}>B</span>ecky
						<span style={{color: 'red', fontWeight: 'bold'}}>{' '}C</span>are
						<span style={{color: 'orange', fontWeight: 'bold'}}>{' '}LLC</span>
					</em>
				</div>
			</nav>
			<form className="searchbox mt-4" onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column'}}>
				<div className="col-md-3 searchfield mb-4">
					<input value={username} name="username" id="username" onChange={e=>{setUsername(e.target.value)}} className="form_input form-control" placeholder=" " autoComplete="username" />
					<label className="form_label" htmlFor="username">User Name</label>
				</div>
				<div className="col-md-3 searchfield mb-4">
					<input type='password' value={password} name="password" id="password" onChange={e=>{setPassword(e.target.value)}} className="form_input form-control" placeholder=" " autoComplete="password" />
					<label className="form_label" htmlFor="recilname">Password</label>
				</div>
				<div className="col-md-3">
					<button className="btn btn-primary btn-sm form-control"> Log in</button>
				</div>
			</form>
		</div>
}

export default Login