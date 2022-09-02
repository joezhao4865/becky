import React, {useState} from 'react'

const NewVisitForm = (props) => {
	const today = new Date()	
	const todayUTC = new Date(today.getTime()).toISOString().replace(/T.*/, '')
	const [visitid, setVisitid] = useState('')
	const [status, setStatus] = useState('')
	const [pfname, setPfname] = useState('')
	const [plname, setPlname] = useState('')
	const [rfname, setRfname] = useState('')
	const [rlname, setRlname] = useState('')
	const [proc, setProc] = useState('')
	const [startdate, setStartdate] = useState('')
	const [enddate, setEnddate] = useState('')
	const [invoicedate, setInvoicedate] = useState(todayUTC)
	const [payer, setPayer] = useState('')
	const [calculated, setCalculated] = useState(0)
	const [billable, setBillable] = useState(0)
	const [paid, setPaid] = useState(0)
	const [remark, setRemark] = useState('')
	const [saved, setSaved] = useState(null)
	
	const tableFields = [
		{name: 'Visit ID/ICN', type: 'input', val: visitid, onFieldChange: setVisitid},
		{
			name: 'Claim Status', 
			type: 'select', 
			options: [
				{val: '', label: 'Select Calim Status'},
				{val: 'Accepted', label: 'Accepted'},
				{val: 'Denied', label: 'Denied'},
				{val: 'Pending', label: 'Pending'}			
			],
			val: status,
			onFieldChange: setStatus
		},
		{name: 'PCA First Name', type: 'input', val: pfname, onFieldChange: setPfname},
		{name: 'PCA Last Name', type: 'input', val: plname, onFieldChange: setPlname},
		{name: 'Recipient First Name', type: 'input', val: rfname, onFieldChange: setRfname},
		{name: 'Recipient Last Name', type: 'input', val: rlname, onFieldChange: setRlname},
		{name: 'Procedure Code', type: 'input', val: proc, onFieldChange: setProc},
		{name: 'Service Start Date', type: 'date', val: startdate, onFieldChange: setStartdate},
		{name: 'Service End Date', type: 'date', val: enddate, onFieldChange: setEnddate},
		{name: 'Invoice Date', type: 'date', val: invoicedate, onFieldChange: setInvoicedate},
		{
			name: 'Payer', 
			type: 'select', 
			options: [
				{val: '', label: 'Select Payer'},
				{val: "AETV", label: "Aetna Better Health of Virginia"},
				{val: "ANTV", label: "Anthem Healthkeepers Plus of Virginia"},
				{val: "MAGV", label: "Magellan Complete Care of Virgian"},
				{val: "MEDV", label: "Virginia Medical Assistance Program"},
				{val: "OPTV", label: "OptimalHealth of Virginia"},
				{val: "UHTV", label: "United Healthcare of Virginia"},
				{val: "VAVA", label: "Virginia Premier Health Plan Inc."}	
			],
			val: payer,
			onFieldChange: setPayer
		},
		{name: 'Calculated Amount', type: 'input', val: calculated, onFieldChange: setCalculated},
		{name: 'Billable Amount', type: 'input', val: billable, onFieldChange: setBillable},
		{name: 'Paid Amount', type: 'input', val: paid, onFieldChange: setPaid},
		{name: 'Remarks', type: 'input', val: remark, onFieldChange: setRemark}
	]
	
	const fieldMaker ={
		input: (keyvalue, fieldName, field) => <tr key={keyvalue}>
											<td className='col-md-4 text-end px-2'><small>{fieldName}</small></td>
											<td className='col-md-5 px-2'>
												<input value={field.val} onChange={e=>field.onFieldChange(e.target.value)}
													style={{borderBottom:'1px solid white', outline: 'none'}}
												/></td>
											<td className='col-md-3 px-2'><span></span></td>
										</tr>,
										
		date: (keyvalue, fieldName, field) => <tr key={keyvalue}>
											<td className='col-md-4 text-end px-2'><small>{fieldName}</small></td>
											<td className='col-md-5 px-2'>
												<input type='date' value={field.val} onChange={e=>field.onFieldChange(e.target.value)}style={{width: '100%'}} />
											</td>
											<td className='col-md-3 px-2'><span></span></td>
										</tr>,
		select: (keyvalue, fieldName, field) => <tr key={keyvalue}>
											<td className='col-md-4 text-end px-2'><small>{fieldName}</small></td>
											<td className='col-md-5 px-2'>
												<select className='selector' name={fieldName} value={field.val} onChange={e=>field.onFieldChange(e.target.value)} style={{width: '100%'}}>
													{field.options.map(({val, label}) => <option key={label} value={val}>{label}</option>)}
												</select>
											</td>
											<td className='col-md-3 px-2'><span></span></td>
										</tr>
	}
	
	const saveClaim = () => {
		fetch('/visits/saveClaim', {
			body: JSON.stringify({visitid,status,pfname,plname,rfname,rlname,proc,startdate,enddate,invoicedate,payer,calculated,billable,paid,remark}),
			headers: { 'content-type': 'application/json' },
			method: 'POST',
		}).then(res => {
			setSaved(res.status == 200)
			setTimeout(()=>setSaved(null), 2000)
		})
	}
	return <div className='searchbox' style={{width: '90%', margin: '20px auto'}}>
			<table className='table text-white table-borderless'>
				<tbody>
					{tableFields.map((v,i) => fieldMaker[v.type](v.name+i, v.name, v))}
					<tr>
						<td></td>
						<td><button className='form-control btn btn-primary' onClick={saveClaim}>Submit</button></td>
						<td>{
								saved === true ? 
									<button className='form-control btn btn-success'>Claim Successfully Saved</button> 
								: saved === false ?
									<button className='form-control btn btn-danger'>Claim Failed to Save</button> 
								: ''
							}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
}

export default NewVisitForm