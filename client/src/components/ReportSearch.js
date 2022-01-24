import React, { useState } from 'react'
import IncomeExpenseSummary from './IncomeExpenseSummary'
import '../css/searchbox.css'

const ReportSearch = (
		{
			fname,
			setFname,
			lname,
			setLname,
			serviceStartDate,
			setServiceStartDate,
			serviceEndDate,
			setServiceEndDate,
			checkStartDate,
			setCheckStartDate,
			checkEndDate,
			setCheckEndDate,
			payer,
			setPayer,
			serviceEnddatefocus,
			setServiceEnddatefocus,
			serviceStartdatefocus,
			setServiceStartdatefocus,
			checkStartdatefocus,
			setCheckStartdatefocus,
			checkEnddatefocus,
			setCheckEnddatefocus,
			results,
			setResults,
			showResult,
			setShowResult
		}
	) => {

	const handleReport = () => {
		fetch('/reports', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({serviceStartDate, serviceEndDate, checkStartDate, checkEndDate, payer})
		}).then(res => {if(res.status === 200) return res.json()})
		  .then(json => {json.data = json.data.map((d,i) => ({...d, idx: i})); setResults(json);setShowResult(true)})
	}
	
	return <div className="searchbox d-md-flex flex-md-wrap">
		<div className="col-md-3 searchfield">
			<input value={fname} 
				name="fname" 
				id="fname" 
				onChange={e=>{setFname(e.target.value)}} 
				className="form_input form-control"
				placeholder=" " 
				autoComplete="fname"
			/>
			<label className="form_label" htmlFor="recifname">PCA First Name</label>
		</div>
		<div className="col-md-3 searchfield">
			<input value={lname} name="lname" id="lname" onChange={e=>{setLname(e.target.value)}} className="form_input form-control" placeholder=" " autoComplete="lname" />
			<label className="form_label" htmlFor="lname">PCA Last Name</label>
		</div>
		<div className="col-md-3 searchfield">
			<input type={serviceStartdatefocus ? "date" : "text"} value={serviceStartDate} name="serviceStartDate" id="serviceStartDate" onChange={e=>{setServiceStartDate(e.target.value)}} className="form_input form-control" placeholder=" " autoComplete="serviceStartDate" onFocus={()=>setServiceStartdatefocus(true)} onBlur={e=>{e.target.value ? setServiceStartdatefocus(true) : setServiceStartdatefocus(false)}} />
			<label className="form_label" htmlFor="serviceStartDate">Service Start Date</label>
		</div>
		<div className="col-md-3 searchfield">
			<input type={serviceEnddatefocus ? "date" : "text"} value={serviceEndDate} name="serviceEndDate" id="serviceEndDate" onChange={e=>{setServiceEndDate(e.target.value)}} className="form_input form-control datepicker" placeholder=" " autoComplete="serviceEndDate" onFocus={()=>setServiceEnddatefocus(true)} onBlur={e=>{e.target.value ? setServiceEnddatefocus(true) : setServiceEnddatefocus(false)}} />
			<label className="form_label" htmlFor="serviceEndDate">Service End Date</label>
		</div>
		<div className="col-md-3 searchfield">
			<input type={checkStartdatefocus ? "date" : "text"} value={checkStartDate} name="checkStartDate" id="checkStartDate" onChange={e=>{setCheckStartDate(e.target.value)}} className="form_input form-control" placeholder=" " autoComplete="checkStartDate" onFocus={()=>setCheckStartdatefocus(true)} onBlur={e=>{e.target.value ? setCheckStartdatefocus(true) : setCheckStartdatefocus(false)}} />
			<label className="form_label" htmlFor="checkStartDate">Check Start Date</label>
		</div>
		<div className="col-md-3 searchfield">
			<input type={checkEnddatefocus ? "date" : "text"} value={checkEndDate} name="checkEndDate" id="checkEndDate" onChange={e=>{setCheckEndDate(e.target.value)}} className="form_input form-control datepicker" placeholder=" " autoComplete="checkEndDate" onFocus={()=>setCheckEnddatefocus(true)} onBlur={e=>{e.target.value ? setCheckEnddatefocus(true) : setCheckEnddatefocus(false)}} />
			<label className="form_label" htmlFor="checkEndDate">Check End Date</label>
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
			<button className="btn btn-sm btn-primary form-control" onClick={handleReport}>Search</button>
		</div>
		{
			showResult ?
				results.data.length > 0 ? 
					<IncomeExpenseSummary summaryData={results} startDate={serviceStartDate} endDate={serviceEndDate}/>
					:
					<div className='mt-4' style={{textAlign: 'center', color: 'red'}}>No results found. Please check your search condition</div>
			: ''
		}
	</div>
}

export default ReportSearch