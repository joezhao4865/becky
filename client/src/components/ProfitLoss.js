import React, {useState} from 'react'
import '../css/profit_loss.css'
const ProfitLoss = ({
		startMonth,
		setStartMonth, 
		endMonth,
		setEndMonth, 
		//endDate,
		//setEndDate,
		feeForService, 
		setFeeForService,
		service,
		setService,
		evvCharge,
		setEvvCharge,
		faxCharge,
		setFaxCharge,
		meals,
		setMeals,
		miscellaneous, 
		setMiscellaneous,
		office,
		setOffice,
		supply,
		setSupply,
		payRoll,
		setPayroll,
		rent,
		setRent,
		liability,
		setLiability,
		tel,
		setTel,
	    travel,
        setTravel,
        interest,
        setInterest
	}) => {
	const today = new Date()
	
	const numPattern = /(\d)(?=(\d\d\d)+(\.|$))/g
	const createAndDownloadPdf = () => {
		fetch('/profit-loss', {
				method: "POST",
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					startMonth,
					endMonth,
					//endDate,
					feeForService,
					service,
					evvCharge,
					faxCharge,
					meals,
					miscellaneous,
					office,
					supply,
					payRoll,
					rent,
					liability,
					tel,
					travel,
					interest	
				})
			}).then(res => res.blob())
			  .then(blob => {
					var url = window.URL.createObjectURL(blob);
					//window.location.assign(file);
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', `profit_and_loss_${startMonth}-${endMonth}-${today.getFullYear()}.pdf`)
					document.body.appendChild(link);
					link.click();
					link.parentNode.removeChild(link);
			  })	  
	}
	
	const setNumberField = v => f => {
		let rawNum = v.replaceAll(/,/g, '')
		if(/^\-?\d*\.?(?:\d{1,2})?$/.test(rawNum)){
			rawNum = rawNum.replaceAll(numPattern, '$1,')
			return f(rawNum)
		}
	}
	
	const formatNumber = v => v.replaceAll(numPattern, '$1,')
	const removeZero = event => f => event.target.value == '0' ? f('') : f(event.target.value)
	const restoreZero = event => f => event.target.value == '' ? f(0) : f(event.target.value)
	const restoreNumber = v => v ? v.replaceAll(/,/g, '') : '0'
	const setRestrictDate = v => f => {if(/^[1-3]?\d?$/.test(v) && (!v || v <= 31)) f(v)}
	
	return <div className="container-fluid">
		<div className="d-flex" style={{borderBottom: '3px solid white'}}>
			<div className="d-flex flex-column col-md-1">
				<span className='white'>{today.toLocaleTimeString()}</span>
				<span className='white'>{today.getMonth() + 1}/{today.getDate()}/{today.getFullYear()}</span>
				<span className='white'>Accrual Basis</span>
			</div>
			<div className="col-md-11 white">
				<div className="center"><h4>Becky Healthcare LLC.</h4></div>
				<div className="bold center"><h4>Profit & Loss</h4></div>
				<div className='d-flex justify-content-center'>
					<span className='col-md-2'>
						<select className="py-0" value={startMonth} onChange={e=>{setStartMonth(e.target.value)}}>
							<option value="" style={{color: 'black'}}>--Select start month--</option>
							<option value="Jan" style={{color: 'black'}}>January</option>
							<option value="Feb" style={{color: 'black'}}>February</option>
							<option value="Mar" style={{color: 'black'}}>March</option>
							<option value="Aprl" style={{color: 'black'}}>April</option>
							<option value="May" style={{color: 'black'}}>May</option>
							<option value="Jun" style={{color: 'black'}}>June</option>
							<option value="Jul" style={{color: 'black'}}>July</option>
							<option value="Aug" style={{color: 'black'}}>August</option>
							<option value="Sep" style={{color: 'black'}}>September</option>
							<option value="Oct" style={{color: 'black'}}>October</option>
							<option value="Nov" style={{color: 'black'}}>November</option>
							<option value="Dec" style={{color: 'black'}}>December</option>
						</select>
					</span>
					<span className='col-md-1 center'>through</span>
					<span className='col-md-2'>
						<select className="py-0" value={endMonth} onChange={e=>{setEndMonth(e.target.value)}}>
							<option value="" style={{color: 'black'}}>--Select end month--</option>
							<option value="Jan" style={{color: 'black'}}>January</option>
							<option value="Feb" style={{color: 'black'}}>February</option>
							<option value="Mar" style={{color: 'black'}}>March</option>
							<option value="Aprl" style={{color: 'black'}}>April</option>
							<option value="May" style={{color: 'black'}}>May</option>
							<option value="Jun" style={{color: 'black'}}>June</option>
							<option value="Jul" style={{color: 'black'}}>July</option>
							<option value="Aug" style={{color: 'black'}}>August</option>
							<option value="Sep" style={{color: 'black'}}>September</option>
							<option value="Oct" style={{color: 'black'}}>October</option>
							<option value="Nov" style={{color: 'black'}}>November</option>
							<option value="Dec" style={{color: 'black'}}>December</option>
						</select>
					</span>
					<span className='col-md-1' style={{lineHeight: '1.7rem'}}>
						{today.getFullYear()}
					</span>
				</div>
			</div>
		</div>
		<div className='col-md-10 mx-auto mb-4'>
			<table className="table table-sm table-borderless mt-4 hover-table">
				<tbody>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6'></th>
						<td className='col-md-3 center white' style={{borderBottom: '2px solid white'}}>{startMonth} - {endMonth} &nbsp; {today.getFullYear()%100}</td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'>Ordinary Income/Expense</th>
						<td></td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'>&nbsp;&nbsp;Income</th>
						<td></td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'>&nbsp;&nbsp;&nbsp;&nbsp;Fee for Service Income</th>
						<td className='col-md-3 center white'>
							<input 
								type='text' 
								className='py-0 white right' 
								value={feeForService} 
								onChange={e => setNumberField(e.target.value)(setFeeForService)}
								onFocus={e=>removeZero(e)(setFeeForService)}
								onBlur={e=>restoreZero(e)(setFeeForService)}
							/>
						</td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'>&nbsp;&nbsp;&nbsp;&nbsp;Service Income</th>
						<td className='col-md-3 center white'>
							<input 
								type='text' 
								className='py-0 white right' 
								value={service} 
								onChange={e => setNumberField(e.target.value)(setService)} 
								onFocus={e=>removeZero(e)(setService)}
								onBlur={e=>restoreZero(e)(setService)}
							/>
						</td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'>&nbsp;&nbsp;Total Income</th>
						<td className='col-md-3 center white right' style={{borderBottom: '2px solid white'}}>
							{formatNumber((+restoreNumber(feeForService) + +restoreNumber(service)).toFixed(2))}
						</td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'>&nbsp;&nbsp;Expense</th>
						<td></td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'>&nbsp;&nbsp;&nbsp;&nbsp;EVV Charge</th>
						<td className='col-md-3 center white'>
							<input 
								type='text' 
								className='py-0 white right' 
								value={evvCharge} 
								onChange={e => setNumberField(e.target.value)(setEvvCharge)} 
								onFocus={e=>removeZero(e)(setEvvCharge)}
								onBlur={e=>restoreZero(e)(setEvvCharge)}
							/>
						</td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'>&nbsp;&nbsp;&nbsp;&nbsp;Fax Service Charge</th>
						<td className='col-md-3 center white'>
							<input 
								type='text' 
								className='py-0 white right' 
								value={faxCharge} 
								onChange={e => setNumberField(e.target.value)(setFaxCharge)}
								onFocus={e=>removeZero(e)(setFaxCharge)}
								onBlur={e=>restoreZero(e)(setFaxCharge)}								
							/>
						</td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'>&nbsp;&nbsp;&nbsp;&nbsp;Meals and Entertainment</th>
						<td className='col-md-3 center white'>
							<input 
								type='text' 
								className='py-0 white right' 
								value={meals} 
								onChange={e => setNumberField(e.target.value)(setMeals)}
								onFocus={e=>removeZero(e)(setMeals)}
								onBlur={e=>restoreZero(e)(setMeals)}									
							/>
						</td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'>&nbsp;&nbsp;&nbsp;&nbsp;Miscellaneous Expense</th>
						<td className='col-md-3 center white'>
							<input 
								type='text' 
								className='py-0 white right' 
								value={miscellaneous} 
								onChange={e => setNumberField(e.target.value)(setMiscellaneous)} 
								onFocus={e=>removeZero(e)(setMiscellaneous)}
								onBlur={e=>restoreZero(e)(setMiscellaneous)}
							/>
						</td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'>&nbsp;&nbsp;&nbsp;&nbsp;Office Expense</th>
						<td className='col-md-3 center white'>
							<input 
								type='text' 
								className='py-0 white right' 
								value={office} 
								onChange={e => setNumberField(e.target.value)(setOffice)}
								onFocus={e=>removeZero(e)(setOffice)}
								onBlur={e=>restoreZero(e)(setOffice)}								
							/>
						</td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'>&nbsp;&nbsp;&nbsp;&nbsp;Office Supplies</th>
						<td className='col-md-3 center white'>
							<input 
								type='text' 
								className='py-0 white right' 
								value={supply} 
								onChange={e => setNumberField(e.target.value)(setSupply)}
								onFocus={e=>removeZero(e)(setSupply)}
								onBlur={e=>restoreZero(e)(setSupply)}								
							/>
						</td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'>&nbsp;&nbsp;&nbsp;&nbsp;Payroll Expenses</th>
						<td className='col-md-3 center white'>
							<input 
								type='text' 
								className='py-0 white right' 
								value={payRoll} 
								onChange={e => setNumberField(e.target.value)(setPayroll)}
								onFocus={e=>removeZero(e)(setPayroll)}
								onBlur={e=>restoreZero(e)(setPayroll)}								
							/>
						</td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'>&nbsp;&nbsp;&nbsp;&nbsp;Rent Expense</th>
						<td className='col-md-3 center white'>
							<input 
								type='text' 
								className='py-0 white right' 
								value={rent} 
								onChange={e => setNumberField(e.target.value)(setRent)} 
								onFocus={e=>removeZero(e)(setRent)}
								onBlur={e=>restoreZero(e)(setRent)}
							/>
						</td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'>&nbsp;&nbsp;&nbsp;&nbsp;Salary / Payroll Liabilities</th>
						<td className='col-md-3 center white'>
							<input 
								type='text' 
								className='py-0 white right' 
								value={liability} 
								onChange={e => setNumberField(e.target.value)(setLiability)} 
								onFocus={e=>removeZero(e)(setLiability)}
								onBlur={e=>restoreZero(e)(setLiability)}
							/>
						</td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'>&nbsp;&nbsp;&nbsp;&nbsp;Telephone Expense</th>
						<td className='col-md-3 center white'>
							<input 
								type='text' 
								className='py-0 white right' 
								value={tel} 
								onChange={e => setNumberField(e.target.value)(setTel)} 
								onFocus={e=>removeZero(e)(setTel)}
								onBlur={e=>restoreZero(e)(setTel)}
							/>
						</td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'>&nbsp;&nbsp;&nbsp;&nbsp;Travel Expense</th>
						<td className='col-md-3 center white'>
							<input 
								type='text' 
								className='py-0 white right' 
								value={travel} 
								onChange={e => setNumberField(e.target.value)(setTravel)} 
								onFocus={e=>removeZero(e)(setTravel)}
								onBlur={e=>restoreZero(e)(setTravel)}
							/>
						</td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'>&nbsp;&nbsp;Total Expense</th>
						<td className='col-md-3 center white right' style={{borderBottom: '2px solid white'}}>
							{formatNumber((+restoreNumber(evvCharge) + +restoreNumber(faxCharge)
											+ +restoreNumber(meals) + +restoreNumber(miscellaneous) + 
											+restoreNumber(office) + +restoreNumber(supply) + +restoreNumber(payRoll) + 
											+restoreNumber(rent) + +restoreNumber(liability) + +restoreNumber(tel) + +restoreNumber(travel)).toFixed(2))}
						</td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'>Net Ordinary Income/Expense</th>
						<td className='col-md-3 center white right'>
							{formatNumber((+restoreNumber(feeForService) + +restoreNumber(service) - 
							+restoreNumber(evvCharge) - +restoreNumber(faxCharge) - +restoreNumber(meals) -
							+restoreNumber(miscellaneous) - +restoreNumber(office) - +restoreNumber(supply) - 
							+restoreNumber(payRoll) - +restoreNumber(rent) - +restoreNumber(liability) - +restoreNumber(tel) - +restoreNumber(travel)).toFixed(2))}
						</td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'>Other Income/Expense</th>
						<td></td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'>&nbsp;&nbsp;Other Income</th>
						<td></td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'>&nbsp;&nbsp;&nbsp;&nbsp;Interest Income</th>
						<td className='col-md-3 center white'>
							<input
								type='text' 
								className='py-0 white right' 
								value={interest} 
								onChange={e => setNumberField(e.target.value)(setInterest)} 
								onFocus={e=>removeZero(e)(setInterest)}
								onBlur={e=>restoreZero(e)(setInterest)}
							/>
						</td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'>&nbsp;&nbsp;Total Other Income</th>
						<td className='col-md-3 center white right' style={{borderBottom: '2px solid white'}}>{interest}</td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'>&nbsp;&nbsp;Net Other Income</th>
						<td className='col-md-3 center white right' style={{borderBottom: '2px solid white'}}>{interest}</td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'>Net Income</th>
						<td className='col-md-3 center white right' style={{borderBottom: '2px solid white'}}>
							{formatNumber((+restoreNumber(feeForService) + +restoreNumber(service) - +restoreNumber(evvCharge) - 
										   +restoreNumber(faxCharge) - +restoreNumber(meals) - +restoreNumber(miscellaneous) - +restoreNumber(office) - 
										   +restoreNumber(supply) - +restoreNumber(payRoll) - +restoreNumber(rent) - +restoreNumber(liability) - 
										   +restoreNumber(tel) - +restoreNumber(travel) + +restoreNumber(interest)).toFixed(2))}
						</td>
					</tr>
					<tr>
						<th className='col-md-3'></th>
						<th className='col-md-6 white'></th>
						<td className='col-md-3 px-0'><button className='btn btn-primary btn-sm form-control' onClick={createAndDownloadPdf}>DownLoad</button></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
}

export default ProfitLoss