import React, { useState } from 'react';
import '../css/searchbox.css'

const Claim = () => {
	const clients= [
			{fname: 'Doris', lname: 'Kidder', phour: 49, repiteAllowed: true},
			{fname: 'Shari', lname: 'Dai', phour: 70, respiteAllowed: true},
			{fname: 'Melisa', lname: 'Phan', phour: 50, respiteAllowed: true},
			{fname: 'Yao Ming', lname: 'Hsiao', phour: 63, respiteAllowed: false },
			{fname: 'Muoi', lname: 'Tang', phour: 56, respiteAllowed: true}
		]
	const [startdate, setStartdate] = useState('')
	const [enddate, setEnddate] = useState('')
	const [startdatefocus, setStartdatefocus] = useState(false)
	const [enddatefocus, setEnddatefocus] = useState(false)
	const [clientDetails, setClientDetails] = useState([])
	//const [curretClient, setCurrentClient] = useState({})
	const [showDetails, setShowDetails] = useState(false)
	
	const fetchClientInfo = client => {
		fetch('/claims', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				firstname: client.fname,
				lastname: client.lname,
				startdate,
				enddate,
				servicehours: client.phours,
				canrespite: client.respiteAllowed
			})
		}).then(res => {if(res.status === 200) return res.json()})
		  .then(json => {console.dir(json);setClientDetails(json.data); setShowDetails(true)})
	}
	
	const Clientbutton = (v, i) => <div key={'button_'+i} className='col-md-2 mx-1'><button className='btn btn-sm btn-outline-primary form-control' onClick={()=> fetchClientInfo(clients[i])}>{v.fname} {v.lname + ' '+v.phour}</button></div>
	
	return <div className="searchbox mt-4">
			<div className="d-flex justify-content-center">
				<div className="col-md-3 searchfield">
					<input type={startdatefocus ? "date" : "text"} value={startdate} name="startdate" id="startdate" onChange={e => setStartdate(e.target.value)} className="form_input form-control" placeholder=" " autoComplete="startdate" onFocus={()=>setStartdatefocus(true)} onBlur={e=>{e.target.value ? setStartdatefocus(true) : setStartdatefocus(false)}} />
					<label className="form_label" htmlFor="startdate">Service Start Date</label>
				</div>
				<div className="col-md-3 searchfield">
					<input type={enddatefocus ? "date" : "text"} value={enddate} name="enddate" id="enddate" onChange={e => setEnddate(e.target.value)} className="form_input form-control datepicker" placeholder=" " autoComplete="enddate" onFocus={()=>setEnddatefocus(true)} onBlur={e=>{e.target.value ? setEnddatefocus(true) : setEnddatefocus(false)}} />
					<label className="form_label" htmlFor="enddate">Service End Date</label>
				</div>
			</div>
			<div className='mt-4 d-flex justify-content-center'>
				{startdate && enddate && clients.map( (v,i) => Clientbutton(v,i))}
			</div> 
			
			{
				showDetails ? <div className='mt-4 d-flex justify-content-center p-0'>
						<table style={{width: '86%'}}>
							<thead>
								<tr>
									<th className='col-md-2'> PCA First Name</th>
									<th className='col-md-2'> PCA Last Name</th>
									<th className='col-md-1'> Procedure </th>
									<th className='col-md-2'> Service Date</th>
									<th className='col-md-2'> Billable Units</th>
									<th className='col-md-2'> Calculated Hours</th>
									<th className='col-md-1'> Corrected Hours </th>
								</tr>
							</thead>
							<tbody>
							{
								clientDetails.details.map( (v,i) => <tr key={'details_'+i}>
									<td>{v.pca_first_name}</td>
									<td>{v.pca_last_name}</td>
									<td>{v.procedure_code}</td>
									<td>{v.service_date.substring(0,10)}</td>
									<td style={v.procedure_code == 'T1019' ? {color:'red'} : {color: 'white'}}>{v.billable_units}</td>
									<td>{v.calculated_hours}</td>
									<td><input /></td>
								</tr>)
							}
								<tr>
									<td colSpan='3'></td>
									<td>Personal Total</td>
									<td>{clientDetails.personalTotal}</td>
									<td></td>
									<td></td>
								</tr>
							</tbody>
						</table>
					</div>
				:
				<div  className='mt-4' style={{color: 'red'}}> No record found </div>
			}
	</div>
}

export default  Claim

