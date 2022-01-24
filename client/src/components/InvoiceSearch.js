import React, {useState, useEffect} from 'react'
import '../css/searchbox.css'
const InvoiceSearch = ({
		recifname, 
		setRecifname, 
		recilname, 
		setRecilname, 
		startdate,
		setStartdate,
		enddate, 
		setEnddate,
		result,
		setResult,
		showReult,
		setShowResult,
		startdatefocus,
		setStartdatefocus,
		enddatefocus,
		setEnddatefocus
	}) => {	
	useEffect(()=>{
		if(recifname && recilname && startdate && enddate) startSearch()
		else setShowResult(false)
	}, [recifname, recilname, startdate, enddate])
	
	const startSearch = () => {
		fetch('/invoice/search', {
			body: JSON.stringify({recifname, recilname, startdate, enddate}),
			headers: { 'content-type': 'application/json' },
			method: 'POST',
		}).then(res => {if(res.status === 200) {setShowResult(true); return res.json()}})
		  .then(json => { if(json.bills.length > 0) {setResult(json.bills)}})
	}
	
	return <div className="searchbox d-md-flex flex-md-wrap mt-4">
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
	</div>
}

export default InvoiceSearch