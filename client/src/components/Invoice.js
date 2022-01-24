import React, {useState} from 'react';
import InvoiceBill from './InvoiceBill';
import InvoiceSearch from './InvoiceSearch';
const Invoice = () => {	
	const [recifname, setRecifname] = useState('')
	const [recilname, setRecilname] = useState('')
	const [startdate, setStartdate] = useState('')
	const [enddate, setEnddate] = useState('')
	const [result, setResult] = useState([])
	const [showResult, setShowResult] = useState(false)
	const [startdatefocus, setStartdatefocus] = useState(false)
	const [enddatefocus, setEnddatefocus] = useState(false)
	
	return <div>
		<InvoiceSearch 
			recifname = {recifname}
			setRecifname = {setRecifname}
			recilname = {recilname}
			setRecilname = {setRecilname}
			startdate = {startdate}
			setStartdate = {setStartdate}
			enddate = {enddate}
			setEnddate = {setEnddate}
			result = {result}
			setResult = {setResult}
			showResult = {showResult}
			setShowResult = {setShowResult}
			startdatefocus = {startdatefocus}
			setStartdatefocus= {setStartdatefocus}
			enddatefocus = {enddatefocus}
			setEnddatefocus = {setEnddatefocus}
		/>
		{showResult ? result && result.length > 0 ? <InvoiceBill recifname= {recifname} recilname = {recilname} startdate={startdate} enddate = {enddate} billdata={result} />
					: <div style={{color: 'red', textAlign: 'center'}}>No Result Found.</div>
					: ""}
	</div>
}

export default Invoice;
