import React, { useState } from 'react'
import PayrollList from './PayrollList'
import '../css/searchbox.css'

const Payroll = () =>{
	const [startdate, setStartdate] = useState('')
	const [enddate, setEnddate] = useState('')
	const [pcafname, setPcafname] = useState('')
	const [pcalname, setPcalname] = useState('')
	const [paystatus, setPaystatus] = useState('')
	const [checkNo, setCheckNo] = useState('')
	const [results, setResults] = useState([])
	const [showResult, setShowResult] = useState(false)
	const [startdatefocus, setStartdatefocus] = useState(false)
	const [enddatefocus, setEnddatefocus] = useState(false)
	
	const startSearch = () => {
		fetch('/payroll', {
			body: JSON.stringify({pcafname, pcalname, startdate, enddate, paystatus, checkNo}),
			headers: { 'content-type': 'application/json' },
			method: 'POST',
		}).then(res => {if(res.status === 200) return res.json()})
		  .then(json => { setResults(json.payRolls);setShowResult(true)})
	}
	
	return <div className="mt-4"> 
		<div className="searchbox d-md-flex flex-md-wrap">
			<div className="col-md-3 searchfield">
				<input value={pcafname} 
					name="pcafname" 
					id="pcafname" 
					onChange={e=>{setPcafname(e.target.value)}} 
					className="form_input form-control"
					placeholder=" " 
					autoComplete="pcafname"
				/>
				<label className="form_label" htmlFor="pcafname">PCA First Name</label>
			</div>
			<div className="col-md-3 searchfield">
				<input value={pcalname} name="pcalname" id="pcalname" onChange={e=>{setPcalname(e.target.value)}} className="form_input form-control" placeholder=" " autoComplete="pcalname" />
				<label className="form_label" htmlFor="pcalname">PCA Last Name</label>
			</div>		
			<div className="col-md-3 searchfield">
				<input type={startdatefocus ? "date" : "text"} value={startdate} name="startdate" id="startdate" onChange={e=>{setStartdate(e.target.value)}} className="form_input form-control" placeholder=" " autoComplete="startdate" onFocus={()=>setStartdatefocus(true)} onBlur={e=>{e.target.value ? setStartdatefocus(true) : setStartdatefocus(false)}} />
				<label className="form_label" htmlFor="startdate">Check Start Date</label>
			</div>
			<div className="col-md-3 searchfield">
				<input type={enddatefocus ? "date" : "text"} value={enddate} name="enddate" id="enddate" onChange={e=>{setEnddate(e.target.value)}} className="form_input form-control datepicker" placeholder=" " autoComplete="enddate" onFocus={()=>setEnddatefocus(true)} onBlur={e=>{e.target.value ? setEnddatefocus(true) : setEnddatefocus(false)}} />
				<label className="form_label" htmlFor="enddate">Check End Date</label>
			</div>
			<div className="col-md-3 searchfield">
				<select className="form-control selector" value={paystatus} onChange={e=>{setPaystatus(e.target.value)}}>
					<option value="">-- Pay Check Status --</option>
					<option value="Adjust">Adjusted</option>
				</select>
			</div>
			<div className="col-md-3 searchfield">
				<input value={checkNo} name="checkNo" id="checkNo" onChange={e=>{setCheckNo(e.target.value)}} className="form_input form-control" placeholder=" " autoComplete="checkNo" />
				<label className="form_label" htmlFor="checkNo">Check Number</label>
			</div>
			<div className="col-md-3 searchfield">
				<button className="btn btn-sm btn-primary form-control" onClick={startSearch}>Search</button>
			</div>
			{
				showResult ? 
					results.length > 0 ? <PayrollList results={results}/>
						:
						<div className='mt-4' style={{textAlign: 'center', color: 'red'}}>No results found. Please check your search condition</div>
					: ''
			}
		</div>
	</div>
}

export default Payroll