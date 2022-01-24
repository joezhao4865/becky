import React, { useState, useEffect } from 'react';

const PayrollList = ({results}) => {
	
	const [tax, setTax] = useState(0.00)
	const [liability, setLiability] = useState(0.00)
	const [expense, setExpense] = useState(0.00)
	
	const regexPattern = /(\d)(?=(\d\d\d)+(\.|$))/g
	
	useEffect(()=>{
		var taxTotal = 0.00
		var liability = 0.00
		var expense =0.00
		results.forEach( r => {
			taxTotal += +r.tax_withheld
			liability += +r.employer_liability
			expense += r.total_expense
		})
		setTax(taxTotal.toFixed(2))
		setLiability(liability.toFixed(2))
		setExpense(expense.toFixed(2))
	}, [results])
	
	
	return <div className='col mt-4'>
		<table className="table table-sm table-borderless my-4 d-none d-md-block hover-table"  id='#top'>
			<thead  style={{display: 'table', width: '100%'}}>
				<tr style={{borderBottom: '1px solid white'}}>
					<th className='col-md-1'>Check Date</th>
					<th className='col-md-2 text-center'>PCA</th>
					<th className='col-md-1 text-center'>Work Hours</th>
					<th className='col-md-1 text-center'>Total Paid</th>
					<th className='col-md-1 text-center'>Deductions</th>
					<th className='col-md-1 text-center'>Net Pay</th>
					<th className='col-md-1 text-center'>Check NO.</th>
					<th className='col-md-1 text-center text-center'>Tax</th>
					<th className='col-md-2 text-center'>Employer Liability</th>
					<th className='col-md-1'>Total</th>
				</tr>
			</thead>
			<tbody style={{display: 'table', width: '100%'}}>
				{
					results.map((v, i) => <tr key={'visits_'+i}>
							<td className='col-md-1'>{v.check_date.substring(0,10)}</td>
							<td className="col-md-2 text-center">{v.pca_first_name + ' ' + v.pca_last_name}</td>
							<td className="col-md-1 text-center">{v.work_hours}</td>
							<td className="col-md-1 text-center">{v.total_pay}</td>
							<td className="col-md-1 text-center">{v.deductions}</td>
							<td className="col-md-1 text-center">{v.net_pay}</td>
							<td className="col-md-1 text-center">{v.check_no}</td>
							<td className="col-md-1 text-center">{v.tax_withheld}</td>
							<td className="col-md-2 text-center">{v.employer_liability}</td>
							<td className="col-md-1">{v.total_expense}</td>
						</tr>              
					)
				}
				<tr>
					<td className='col-md-1'></td>
					<td className="col-md-2 text-center"></td>
					<td className="col-md-1 text-center"></td>
					<td className="col-md-1 text-center"></td>
					<td className="col-md-1 text-center"></td>
					<td className="col-md-1 text-center"></td>
					<td className="col-md-1 text-center" style={{borderBottom: '1px solid white'}}>Totals</td>
					<td className="col-md-1 text-center" style={{borderBottom: '1px solid white'}}>{tax.toString().replaceAll(regexPattern, '$1,')}</td>
					<td className="col-md-2 text-center" style={{borderBottom: '1px solid white'}}>{liability.toString().replaceAll(regexPattern, '$1,')}</td>
					<td className="col-md-1 " style={{borderBottom: '1px solid white'}}>{expense.toString().replaceAll(regexPattern, '$1,')}</td>
				</tr>
				<tr>
					<td colSpan='8'></td>
					<td colSpan='2'>
						<div className="form-control btn-group p-0 m-0" role="group" style={{backgroundColor: 'black'}}>
							<a type="btn" className="form-control btn btn-secondary py-0 m-0" href="#top">
								To Top
							</a>
						</div>
					</td>
				</tr>
			</tbody>
		</table>  
		{/* on small screens */}
		{
			results.map((v, i) => <table key={'table_'+i} className='table table-sm my-4 d-md-none table-borderless' style={{borderBottom: '1px solid white'}}><tbody>
						<tr style={{color: 'white'}}>
							<td className='col-5'>Check Date</td>
							<td className='col-7'>{v.check_date.substring(0,10)}</td>
						</tr>
						<tr style={{color: 'white'}}>
							<td>PCA</td>
							<td>{v.pca_first_name + ' ' + v.pca_last_name}</td>
						</tr>
						<tr style={{color: 'white'}}>
							<td>Total Pay</td>
							<td>{v.total_pay}</td>
						</tr>
						<tr style={{color: 'white'}}>
							<td>Tax</td>
							<td>{v.tax_withheld}</td>
						</tr>
						<tr style={{color: 'white'}}>
							<td>Employer Liability</td>
							<td>{v.employer_liability}</td>
						</tr>
						<tr style={{color: 'white'}}>
							<td>Expense</td>
							<td>{v.total_expense}</td>
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
					<td className='col-5'>Tax</td>
					<td className='col-7'>{tax.toString().replaceAll(regexPattern, '$1,')}</td>
				</tr>
				<tr style={{color: 'white'}}>
					<td className='col-5'>Employer Liability</td>
					<td className='col-7'>{liability.toString().replaceAll(regexPattern, '$1,')}</td>
				</tr>
				<tr style={{color: 'white'}}>
					<td className='col-5'>Total Expense</td>
					<td className='col-7'>{expense.toString().replaceAll(regexPattern, '$1,')}</td>
				</tr>
				<tr>
					<td colSpan='2' >
						<div className="form-control btn-group p-0 m-0" role="group" style={{backgroundColor: 'black'}}>
							<a type="btn" className="form-control btn btn-secondary py-0 m-0" href="#top">
								To Top
							</a>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>	
}

export default PayrollList
