import React, { useState, useEffect } from 'react';

const VisitList = (props) => {
	const [paidTotal, setPaidTotal] = useState(0.00)
	const [calculated, setCalculated] = useState(0.00)
	const [billed, setBilled] = useState(0.00)
	const [updatedVisits, setUpdatedVisits] = useState({})
	const [saveSuccess, setSaveSuccess] = useState(false)
	const [saveError, setSaveError] = useState(false)
	
	const regexPattern = /(\d)(?=(\d\d\d)+(\.|$))/g
	
	useEffect(()=>{
		let paid = 0.00
		let calc = 0
		let billable = 0
		props.visits.forEach(v => {
			//paid += typeof(v.paid_amount) === 'string' ? Number(v.paid_amount) : v.paid_amount
			paid += +v.paid_amount || 0.00
			calc += v.calculated_amount
			//billable += typeof(v.billable_amount) === 'string' ? Number(v.billable_amount) : v.billable_amount
			billable += +v.billable_amount || 0.00
		})
		setPaidTotal(paid)
		setCalculated(calc)
		setBilled(billable)
	}, [props])
	
	const updateVisit = () => {
		if(Object.keys(updatedVisits).length > 0){
			fetch('/visits/updateVisit', {
				body: JSON.stringify({targets: updatedVisits}),
				headers: { 'content-type': 'application/json' },
				method: 'POST',
			}).then(res => {
				if(res.status === 200){
					setSaveSuccess(true)
					setUpdatedVisits({})
					setTimeout(()=>{setSaveSuccess(false);}, 2000)
				}else{
					setSaveError(true);
					setTimeout(()=>{setSaveError(false)}, 2000)
				}
			})
		}
	}
	
	const downloadvisits = () => {
		fetch('/visits/download', 
				{
					body: JSON.stringify({data: props.visits}),
					headers: { 'content-type': 'application/json' },
					method: 'POST',
				}
			).then(res=> res.blob())
		     .then(blob=>{
				const url = window.URL.createObjectURL(new Blob([blob]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', `visits_report.xlsx`)
				document.body.appendChild(link);
				link.click();
				link.parentNode.removeChild(link);
		})
	}
	
	return <div className='col'>
		<table className="table table-sm table-borderless my-4 d-none d-md-block hover-table" style={{color: 'white'}}  id='#top'>
			<tbody>
				<tr style={{borderBottom: '1px solid white'}}>
					<th className="col-md-2">Recipient</th>
					<th className="col-md-2">PCA</th>
					<th className="col-md-1">Service Date</th>
					<th className="col-md-1">Invoice Date</th>
					<th className="col-md-1">Payer</th>
					<th className="col-md-1">Calculated</th>
					<th className="col-md-1">Billable</th>
					<th className="col-md-1">Paid</th>
					<th className="col-md-2">Remarks</th>
				</tr>
				{
					props.visits.map((v, i) => <tr key={'visits_'+i}>
							<td>{v.recipient_first_name + ' ' + v.recipient_last_name}</td>
							<td>{v.pca_first_name + ' ' + v.pca_last_name}</td>
							<td>{v.service_date.substring(0,10)}</td>
							<td>{v.invoice_date.substring(0,10)}</td>
							<td>{v.payer_code}</td>
							<td>{v.calculated_amount}</td>
							<td>
								<input value={v.billable_amount} onChange={(e) => {props.handlePriceChange(i, e.target.value, 'billable'); setUpdatedVisits({...updatedVisits, [v.visitId]: {...updatedVisits[v.visitId], billable: e.target.value}});}}  className="form-control py-0" type="number" min='0' step='0.01'/></td>
							<td>
								<input value={v.paid_amount} onChange={(e) => {props.handlePriceChange(i, e.target.value, 'paid'); setUpdatedVisits({...updatedVisits, [v.visitId]: {...updatedVisits[v.visitId], paid: e.target.value}});}}  className="form-control py-0" type="number" min='0' step='0.01'/>
							</td>
							<td><input value={v.remarks}  className='p-0' onChange={(e) => {props.handleRemarkChange(i,e.target.value); setUpdatedVisits({...updatedVisits, [v.visitId]: {...updatedVisits[v.visitId], remarks: e.target.value}})}} className="form-control py-0"/></td>
						</tr>
					)
				}
				<tr>
					{
						saveSuccess ? <td colSpan="3" className='py-0' style={{borderBottom: '1px  solid #4dff88'}}><span className='form-control text-center py-0' style={{color: '#4dff88', border: '1px solid #4dff88', background: 'none'}}> Recored Update was Successful</span></td>
							: saveError ? <td colSpan="3" className='py-0' style={{borderBottom: '1px  solid red'}}><span className='form-control text-center py-0' style={{color: 'red', border: '1px solid red', background: 'none'}}> Record Update Failed</span></td>
								: <td colSpan="3" className='py-0' style={{borderBottom: '1px solid #282c34'}}></td>			
					}
					<td  className='py-0' style={{borderBottom: '1px solid white'}}>Totals</td>
					<td  className='py-0' style={{borderBottom: '1px solid white'}}>{calculated.toFixed(2).toString().replaceAll(regexPattern, '$1,')}</td>
					<td  className='py-0' style={{borderBottom: '1px solid white'}}>{Number(billed).toFixed(2).toString().replaceAll(regexPattern, '$1,')}</td>
					<td  className='py-0' style={{borderBottom: '1px solid white'}}>{Number(paidTotal).toFixed(2).toString().replaceAll(regexPattern, '$1,')}</td>
					<td  colSpan='2' className='py-0' >
						<div className="form-control btn-group p-0 m-0" role="group" style={{backgroundColor: 'black'}}>
							<button className="form-control btn btn-primary py-0 m-0" onClick={updateVisit} >
								Save
							</button>
							<a type="btn" className="form-control btn btn-secondary py-0 m-0" href="#top">
								To Top
							</a>
						</div>
					</td>
				</tr>
				<tr>
					<td colSpan='7'></td>
					<td colSpan='2'>
						<button className='form-control btn btn-info py-0 m-0' onClick={downloadvisits}>Download Visits</button>
					</td>
				</tr>
			</tbody>
		</table>
		{/* on small screens */}
		{
			props.visits.map((v, i) => <table key={'table_'+i} className='table table-sm my-4 d-md-none table-borderless' style={{borderBottom: '1px solid white'}}><tbody>
						<tr style={{color: 'white'}}>
							<td >Recipient</td>
							<td >{v.recipient_first_name + ' ' + v.recipient_last_name}</td>
						</tr>
						<tr style={{color: 'white'}}>
							<td>PCA</td>
							<td>{v.pca_first_name + ' ' + v.pca_last_name}</td>
						</tr>
						<tr style={{color: 'white'}}>
							<td>Service Date</td>
							<td>{v.service_date.substring(0,10)}</td>
						</tr>
						<tr style={{color: 'white'}}>
							<td>Calculated</td>
							<td>{v.calculated_amount}</td>
						</tr>
						<tr style={{color: 'white'}}>
							<td>Billable</td>
							<td><input value={v.billable_amount} onChange={(e) => {props.handlePriceChange(i, e.target.value, 'billable'); setUpdatedVisits({...updatedVisits, [v.visitId]: {...updatedVisits[v.visitId], billable: e.target.value}});}}  className="form-control py-0" type="number" min='0' step='0.01'/></td>
						</tr>
						<tr style={{color: 'white'}}>
							<td>Paid</td>
							<td>
								<input value={v.paid_amount} onChange={(e) => {props.handlePriceChange(i, e.target.value, 'paid'); setUpdatedVisits({...updatedVisits, [v.visitId]: {...updatedVisits[v.visitId], paid: e.target.value}});}}  className="form-control py-0" type="number" min='0' step='0.01'/>
							</td>
						</tr>
						<tr style={{color: 'white'}}>
							<td>Remarks</td>
							<td><input value={v.remarks} onChange={(e) => {props.handleRemarkChange(i,e.target.value); setUpdatedVisits({...updatedVisits, [v.visitId]: {...updatedVisits[v.visitId], remarks: e.target.value}})}} className="form-control py-0"/></td>
						</tr>
					</tbody>
				</table>
			)	
		}
		<table className='table table-sm mt-4 mb-5 d-md-none'>
			<tbody>
				<tr style={{color: 'white'}}>
					<td colSpan='2'>Totals</td>
				</tr>
				<tr style={{color: 'white'}}>
					<td>Calculated</td>
					<td>{calculated.toFixed(2).toString().replaceAll(regexPattern, '$1,')}</td>
				</tr>
				<tr style={{color: 'white'}}>
					<td>Billable</td>
					<td>{Number(billed).toFixed(2).toString().replaceAll(regexPattern, '$1,')}</td>
				</tr>
				<tr style={{color: 'white'}}>
					<td>Paid</td>
					<td>{Number(paidTotal).toFixed(2).toString().replaceAll(regexPattern, '$1,')}</td>
				</tr>
				<tr>
					<td colSpan='2' >
						<div className="form-control btn-group p-0 m-0" role="group" style={{backgroundColor: 'black'}}>
							<button className="form-control btn btn-primary py-0 m-0" onClick={updateVisit} >
								Save Changes
							</button>
							<a type="btn" className="form-control btn btn-secondary py-0 m-0" href="#top">
								To Top
							</a>
						</div>
					</td>
				</tr>
				<tr>
					<td colSpan="2" style={{borderBottom: 'black'}}>
						{
							saveSuccess ? <span className='form-control text-center mt-1 py-0' style={{color: '#4dff88', border: '1px solid #4dff88', background: 'none'}}> Recored Update was Successful</span>
								: saveError ? <span className='form-control text-center mt-1 py-0' style={{color: 'red', border: '1px solid red', background: 'none'}}> Record Update Failed</span>
									: ''			
						}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
}

export default VisitList;