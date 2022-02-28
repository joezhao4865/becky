import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home';
import Quickbook from './Quickbook';
//import ReportSearch from './ReportSearch';
import Navbar from './Navbar';
import Payroll from './Payroll';
import Invoice from './Invoice';
import Claim from './Claim';

const Router = () => <BrowserRouter>
		<Navbar />
		<Routes>	
			<Route path='/' element={<Home />} />
			<Route path='/payroll' element={<Payroll />} />
			<Route path='/claims' element={<Claim />} />
			<Route path='/invoice' element={<Invoice />} />
			<Route path='/quickbook' element={<Quickbook />} />
					{/*<Route path='/income-expense' element={ReportSearch} />
			</Route> */}
		</Routes>
	</BrowserRouter>


export default Router