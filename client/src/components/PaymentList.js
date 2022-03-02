import React from 'react';

const PaymentList = (props) => {
	const regexPattern = /(\d)(?=(\d\d\d)+(\.|$))/g
	
	return <div className='col'>
		<table className="table table-sm table-borderless my-4 d-none d-md-block hover-table" style={{color: 'white'}}  id='#top'>
			<tbody>
				<tr style={{borderBottom: '1px solid white'}}>
					<th className="col-md-2">Recipient</th>
					<th className="col-md-1">Service Date</th>
					<th className="col-md-1">Payer</th>
					<th className="col-md-1">Procedure</th>
					<th className="col-md-1">Billing</th>
					<th className="col-md-1">Payment</th>
				</tr>
				{
					props.payments.map((v, i) => <tr key={'payment'+i}>
							<td>{v.recipient_first_name + ' ' + v.recipient_last_name}</td>
							<td>{v.service_date.substring(0,10)}</td>
							<td>{v.payer}</td>
							<td>{v.procedure_code}</td>
							<td>{v.billed_amount}</td>
							<td>{v.payment}</td>
						</tr>
					)
				}
			</tbody>
		</table>
		{/* on small screens */}
		{
			props.payments.map((v, i) => <table key={'table_'+i} className='table table-sm my-4 d-md-none table-borderless' style={{borderBottom: '1px solid white'}}><tbody>
						<tr style={{color: 'white'}}>
							<td >Recipient</td>
							<td >{v.recipient_first_name + ' ' + v.recipient_last_name}</td>
						</tr>
						<tr style={{color: 'white'}}>
							<td>Service Date</td>
							<td>{v.service_date.substring(0,10)}</td>
						</tr>
						<tr style={{color: 'white'}}>
							<td>Payer</td>
							<td>{v.payer}</td>
						</tr>
						<tr style={{color: 'white'}}>
							<td>Billing</td>
							<td>{v.billed_amount}</td>
						</tr>
						<tr style={{color: 'white'}}>
							<td>Payment</td>
							<td>{v.payment}</td>
						</tr>
					</tbody>
				</table>
			)	
		}
		{/*<table className='table table-sm mt-4 mb-5 d-md-none'>
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
		</table> */}
	</div>
}

export default PaymentList;