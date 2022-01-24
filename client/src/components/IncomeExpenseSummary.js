import React, {useState} from 'react'
import '../css/income-expense.css'

const IncomeExpenseSummary = ({summaryData, startDate, endDate}) => {
	const [subCalculated, setSubCalculated] = useState(0)
	const threshold = summaryData.data.length
	const handleExport = () => {
		if(summaryData.data.length == threshold) //this is to prevent adding duplicate when button clicked multiple times
			summaryData.data.push({
				pca_first_name: '',
				pca_last_name: 'Totals',
				total_calculated: +summaryData.calculated,
				total_billable: +summaryData.billable,
				total_paid: +summaryData.paid,
				'paid - billable': +summaryData.balance,
				total_tax: +summaryData.tax,
				total_pay: +summaryData.paid,
				total_liability: +summaryData.liability,
				total_expense: +summaryData.expense,
				'expected profit': +summaryData.expected,
				'real profit': +summaryData.real,
				idx: summaryData.data.length
			})
		fetch('/reports/export', {
			  method: 'POST',
			  headers: {
				  'Content-Type': 'application/json'
		     },
			 body: JSON.stringify({data: summaryData.data})
		}).then(res=> res.blob())
		  .then(blob=>{
			const url = window.URL.createObjectURL(new Blob([blob]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', `income_expense_${startDate}-${endDate}.xlsx`)
			document.body.appendChild(link);
			link.click();
			link.parentNode.removeChild(link);
		})
	}
	
	const formatDigits = (digits) => '$'+digits.toString().replaceAll(/(\d)(?=(\d\d\d)+(\.|$))/g, '$1,')
	
	return <div className='col-md-12'>
	<div className='mt-4'>
		<div className='col-md-2'><button className='btn btn-outline-info btn-sm form-control' onClick={handleExport}>Export To Excel</button></div>
	</div>
	<table className="table table-sm table-borderless mt-4 hover-table" style={{color: 'white'}}  id='#top'>
		<thead>
			<tr style={{borderTop: '2px solid white', borderBottom: '1px solid white'}}>
				<th>PCA First Name</th>
				<th>PCA Last Name </th>
				<th className='income'>Total Billable</th>
				<th className='income'>Total Paid</th>
				<th className='balancing'>Pending Balance</th>
				<th className='expense'>Total Expense</th>
				<th className='profit-expected'>Expected Profit</th>
				<th className='profit-real'>Real Profit</th>
			</tr>
		</thead>
		<tbody>
		{
			summaryData.data.map((v,i) => <tr key={i} style={i== summaryData.data.length-1 ? {borderBottom: '2px solid white'} : {}}>
					<td className={v.total_billable == 0 ? 'negative' : ''}>{v.pca_first_name}</td>
					<td className={v.total_billable == 0 ? 'negative' : ''}>{v.pca_last_name}</td>
					<td className='income'>{v.total_billable}</td>
					<td className='income'>{v.total_paid}</td>
					<td className={v['paid - billable'] < 0 ? 'negative':'balancing'}>{v['paid - billable']}</td>
					<td className='expense'>{v.total_expense}</td>
					<td className={v['expected profit'] < 0 ? 'negative' : 'profit-expected'}>{v['expected profit']}</td>
					<td className={v['real profit'] < 0 ? 'negative' : 'profit-real'}>{v['real profit']}</td>
				</tr>)
		}
		<tr>
			<td></td>
			<td>TOTALS</td>
			<td className='income'>{formatDigits(summaryData.billable)}</td>
			<td className='income'>{formatDigits(summaryData.paid)}</td>
			<td className='income'>{formatDigits(summaryData.balance)}</td>
			<td className='balancing'>{formatDigits(summaryData.expense)}</td>
			<td className={summaryData.expected < 0 ? 'negative':'profit-expected'}>
				{formatDigits(summaryData.expected)}
			</td>
			<td className={summaryData.real < 0 ? 'negative':'profit-real'}>
				{formatDigits(summaryData.real)}
			</td>
		</tr>
		</tbody>
	</table>
	<div className='my-4 d-flex justify-content-end'>
		<div className='col-md-2'><button className='btn btn-outline-info btn-sm form-control' onClick={handleExport}>Export To Excel</button></div>
	</div>
</div>
}

export default IncomeExpenseSummary