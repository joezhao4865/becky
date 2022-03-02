import React, {useState, useEffect} from 'react';
import '../css/app.css';
import Router from './Router';
import Login from './Login';

const App = () => {
	const [loggedIn, setLoggedin] = useState(false)
	
	return <div className="app container-fluid">
		{loggedIn ? <Router /> : <Login login={setLoggedin} />}
    </div>
}



export default App
