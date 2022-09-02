import React, { useState } from 'react'
import VisitList from './VisitList'

const Searchbox = ({
		pcafname, setPcafname,
		pcalname, setPcalname,
		recifname, setRecifname,
		recilname, setRecilname,
		startdate, setStartdate,
		enddate, setEnddate,
		results, setResults,
		payer, setPayer,
		showResult, setShowResult,
		startdatefocus, setStartdatefocus,
		enddatefocus, setEnddatefocus
	}) => {

	const startSearch = () => {
		fetch('/visits', {
			body: JSON.stringify({recifname, recilname, pcafname, pcalname, startdate, enddate, payer}),
			headers: { 'content-type': 'application/json' },
			method: 'POST',
		}).then(res => {if(res.status === 200) return res.json()})
		  .then(json => { setResults(json.allVisits);setShowResult(true)})
	}
	
	const updatePriceAmount = (idx, amount, priceType) => {
		let localResults = [...results]
		if (priceType === 'billable' ) localResults[idx].billable_amount = amount
		else localResults[idx].paid_amount = amount
		setResults(localResults)
	}
	
	const updateRemarks = (idx, newRemarks) => {
		let localResults = [...results]
		localResults[idx].remarks = newRemarks
		setResults(localResults)
	}
	
	return <div className="searchbox d-md-flex flex-md-wrap">
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
			<input value={pcafname} name="pcafname" id="pcafname" onChange={e=>{setPcafname(e.target.value)}} className="form_input form-control" placeholder=" " autoComplete="pcafname" />
			<label className="form_label" htmlFor="pcafname">PCA First Name</label>
		</div>
		<div className="col-md-3 searchfield">
			<input value={pcalname} name="pcalname" id="pcalname" onChange={e=>{setPcalname(e.target.value)}} className="form_input form-control" placeholder=" " autoComplete="pcalname" />
			<label className="form_label" htmlFor="pcalname">PCA Last Name</label>
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
			<button className="btn btn-sm btn-primary form-control" onClick={startSearch}>Search</button>
		</div>
		{
			showResult ?
				results.length > 0 ? 
					<VisitList visits={results} handlePriceChange = {updatePriceAmount} handleRemarkChange= {updateRemarks}/>
					:
					<div className='mt-4' style={{textAlign: 'center', color: 'red'}}>No results found. Please check your search condition</div>
			: ''
		}
	</div>
} 

export default Searchbox