import React, {useState} from 'react'
import PaymentList from './PaymentList'

const Payments = () => {
	const [recifname, setRecifname] = useState('')
	const [recilname, setRecilname] = useState('')
	const [startdate, setStartdate] = useState('')
	const [enddate, setEnddate] = useState('')
	const [results, setResults] = useState([])
	const [payer, setPayer] = useState('')
	const [showResult, setShowResult] = useState(false)
	const [startdatefocus, setStartdatefocus] = useState(false)
	const [enddatefocus, setEnddatefocus] = useState(false)
	
	const handleSubmit = () => {
		fetch('/payments', {
			method: 'POST',
			headers: {'content-type': 'application/json'},
			body: JSON.stringify({
				recipient_first_name: recifname,
				recipient_last_name: recilname,
				serviceStartDate: startdate,
				serviceEndDate: enddate,
				payer: payer
			})
		}).then(res => res.json())
		  .then(json => {setResults(json.data); setShowResult(true)})
	}
	
	return <div className="mt-4"> 
	  <div className="searchbox d-md-flex flex-md-wrap">
		<div className="col-md-3 searchfield">
			<input value={recifname} 
				name="recifname" 
				id="recifname" 
				onChange={e=>{setRecifname(e.target.value)}} 
				className="form_input form-control"
				placeholder=" " 
				autoComplete="recifname"
			/>
			<label className="form_label" htmlFor="recifname">Recipient First Name</label>
		</div>
		<div className="col-md-3 searchfield">
			<input value={recilname} name="recilname" id="recilname" onChange={e=>{setRecilname(e.target.value)}} className="form_input form-control" placeholder=" " autoComplete="recilname" />
			<label className="form_label" htmlFor="recilname">Recipient Last Name</label>
		</div>
		<div className="col-md-3 searchfield">
			<input type={startdatefocus ? "date" : "text"} value={startdate} name="startdate" id="startdate" onChange={e=>{setStartdate(e.target.value)}} className="form_input form-control" placeholder=" " autoComplete="startdate" onFocus={()=>setStartdatefocus(true)} onBlur={e=>{e.target.value ? setStartdatefocus(true) : setStartdatefocus(false)}} />
			<label className="form_label" htmlFor="startdate">Service Start Date</label>
		</div>
		<div className="col-md-3 searchfield">
			<input type={enddatefocus ? "date" : "text"} value={enddate} name="enddate" id="enddate" onChange={e=>{setEnddate(e.target.value)}} className="form_input form-control datepicker" placeholder=" " autoComplete="enddate" onFocus={()=>setEnddatefocus(true)} onBlur={e=>{e.target.value ? setEnddatefocus(true) : setEnddatefocus(false)}} />
			<label className="form_label" htmlFor="enddate">Service End Date</label>
		</div>
		<div className="col-md-3 searchfield">
			<select className="form-control selector" value={payer} onChange={e=>{setPayer(e.target.value)}}>
				<option value="">-- Select a Payer --</option>
				<option value="AETV">Aetna Better Health of Virginia</option>
				<option value="ANTV">Anthem Healthkeepers Plus of Virginia</option>
				<option value="MAGV">Magellan Complete Care of Virgian</option>
				<option value="MEDV">Virginia Medical Assistance Program</option>
				<option value="OPTV">OptimalHealth of Virginia</option>
				<option value="UHTV">United Healthcare of Virginia</option>
				<option value="VAVA">Virginia Premier Health Plan Inc.</option>
			</select>
		</div>
		<div className="col-md-3 searchfield">
			<button className="btn btn-sm btn-primary form-control" onClick={handleSubmit}>Search</button>
		</div>
	</div>
	<div>
	{
		showResult ?
			results.length > 0 ? 
				<PaymentList payments={results}/>
				:
				<div className='mt-4' style={{textAlign: 'center', color: 'red'}}>No results found. Please check your search condition</div>
			: ''
	}
	</div>
</div>
}


export default Payments