module.exports = ({
		startMonth,
		endMonth,
		endDate,
		feeForService,
		service,
		totalIncome,
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
	}) => {
    const today = new Date();
	const numPattern = /(\d)(?=(\d\d\d)+(\.|$))/g
	const restoreNumber = v => v ? v.replaceAll(/,/g, '') : '0'
	const formatNumber = v => v.replaceAll(numPattern, '$1,')
	const monthFullName = {
		"Jan": "January",
		"Feb": "February",
		"Mar": "March",
		"Aprl": "April",
		"May": "May",
		"Jun": "June",
		"Jul": "July",
		"Aug": "August",
		"Sep": "September",
		"Oct": "October",
		"Nov": "November",
		"Dec": "December"
	}
	return `
		<!doctype html>
		<html>
		   <head>
			  <meta charset="utf-8">
			  <title>PDF Test Template</title>
			  <style>
				 .title{
					 font-size: 1.5rem;
				 }
				 .bold{
					 font-weight: bold;
				 }
				 .gparent-title{
					 padding-left: 70px;
				 }
				 .parent-title{
					 padding-left: 90px;
				 }
				 .child-title{
					 padding-left: 110px;
				 }
				 .underline{
					 border-bottom: 1px solid black;
				 }
				 .underline-bold{
					 border-bottom: 2px solid black;
				 }
				 .center{
					 text-align: center;
				 }
				 .right {
					 text-align: right;
				 }
				 column-one: {
					 width: 40%;
				 }
				 column-two: {
					 width: 20%;
				 }
				 column-three: {
					 width: 40%;
				 }
			  </style>
		   </head>
		   <body>
			 	<div style="margin-top: 20px">
					<table class="underline-bold" style="width: 96%; margin: auto;">
						<tbody>
							<tr>
								<td>${today.toLocaleTimeString()}</td>
								<th class='title center'>Becky Healthcare LLC.</th>
							</tr>
							<tr>
								<td>${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}</td>
								<th class='title center'>Profit & Loss</th>
							</tr>
							<tr>
								<td> Accrual Basis</td>
								<th class='title center'>${monthFullName[startMonth]} through ${monthFullName[endMonth]} ${endDate}</th>
							</tr>
						</tbody>
					</table>
					<div style="margin-top: 20px;">
						<table style="width: 80%; margin: auto;">
							<tbody style="width: 100%">
								<tr>
									<th style="width: 20%;"></th>
									<th style="width: 50%"></th>
									<td class="center underline" style="width: 30%">${startMonth} - ${endMonth} &nbsp; ${endDate}</td>
								</tr>
								<tr>
									<th class="column-one"></></th>
									<td class="column-two bold gparent-title">Ordinary Income/Expense</td>
									<td class="column-three"></td>
								</tr>
								<tr>
									<th></th>
									<td class="bold parent-title">Income</td>
									<td></td>
								</tr>
								<tr>
									<th></th>
									<td class="child-title">Fee for Service Income</td>
									<td class="right">
										${feeForService}
									</td>
								</tr>
								<tr>
									<th></th>
									<td class="child-title">Service Income</td>
									<td class="right underline">
										${service}
									</td>
								</tr>
								<tr>
									<th></th>
									<td class="bold parent-title">Total Income</td>
									<td class="right">${formatNumber((+restoreNumber(feeForService) + +restoreNumber(service)).toFixed(2))}</td>
								</tr>
								<tr>
									<th></th>
									<td class="bold parent-title">Expense</td>
									<td></td>
								</tr>
								<tr>
									<th></th>
									<td class="child-title">EVV Charge</td>
									<td class="right">
										${evvCharge} 
									</td>
								</tr>
								<tr>
									<th></th>
									<td class="child-title">Fax Service Charge</td>
									<td class="right">
										${faxCharge}
								</tr>
								<tr>
									<th></th>
									<td class="child-title">Meals and Entertainment</td>
									<td class="right">
										${meals}
									</td>
								</tr>
								<tr>
									<th></th>
									<td class="child-title">Miscellaneous Expense</td>
									<td class="right">
										${miscellaneous}
									</td>
								</tr>
								<tr>
									<th></th>
									<td class="child-title">Office Expense</td>
									<td class="right">	
										${office}
									</td>
								</tr>
								<tr>
									<th></th>
									<td class="child-title">Office Supplies</td>
									<td class="right">
										${supply}
									</td>
								</tr>
								<tr>
									<th></th>
									<td class="child-title">Payroll Expenses</td>
									<td class="right">
										${payRoll}
									</td>
								</tr>
								<tr>
									<th></th>
									<td class="child-title">Rent Expense</td>
									<td class="right">
										${rent}
									</td>
								</tr>
								<tr>
									<th></th>
									<td class="child-title">Salary / Payroll Liabilities</td>
									<td class="right">
										${liability}
									</td>
								</tr>
								<tr>
									<th></th>
									<td class="child-title">Telephone Expense</td>
									<td class="right">
										${tel}
									</td>
								</tr>
								<tr>
									<th></th>
									<td class="child-title">Travel Expense</td>
									<td class="right underline">
										${travel}
									</td>
								</tr>
								<tr>
									<th></th>
									<td class="bold parent-title">Total Expense</td>
									<td class="right underline">
										${formatNumber((+restoreNumber(evvCharge) + +restoreNumber(faxCharge)
											+ +restoreNumber(meals) + +restoreNumber(miscellaneous) + 
											+restoreNumber(office) + +restoreNumber(supply) + +restoreNumber(payRoll) + 
											+restoreNumber(rent) + +restoreNumber(liability) + +restoreNumber(tel) + +restoreNumber(travel)).toFixed(2))}
									</td>
								</tr>
								<tr>
									<th></th>
									<td class="bold gparent-title">Net Ordinary Income/Expense</td>
									<td class="right">
										${formatNumber((+restoreNumber(feeForService) + +restoreNumber(service) - 
											+restoreNumber(evvCharge) - +restoreNumber(faxCharge) - +restoreNumber(meals) -
											+restoreNumber(miscellaneous) - +restoreNumber(office) - +restoreNumber(supply) - 
											+restoreNumber(payRoll) - +restoreNumber(rent) - +restoreNumber(liability) - +restoreNumber(tel) - +restoreNumber(travel)).toFixed(2))}
									</td>
								</tr>
								<tr>
									<th></th>
									<td class="bold gparent-title">Other Income/Expense</td>
									<td></td>
								</tr>
								<tr>
									<th></th>
									<td class="bold parent-title">Other Income</td>
									<td></td>
								</tr>
								<tr>
									<th></th>
									<td class="child-title">Interest Income</td>
									<td class="right underline">
										${interest}
									</td>
								</tr>
								<tr>
									<th></th>
									<td class="bold parent-title">Total Other Income</td>
									<td class="right underline">${interest}</td>
								</tr>
								<tr>
									<th></th>
									<td class="bold gparent-title">Net Other Income</td>
									<td class="right underline">${interest}</td>
								</tr>
								<tr>
									<th></th>
									<td class="bold" style="padding-left: 50px">Net Income</td>
									<td class="right underline-bold">
										${formatNumber((+restoreNumber(feeForService) + +restoreNumber(service) - +restoreNumber(evvCharge) - 
										   +restoreNumber(faxCharge) - +restoreNumber(meals) - +restoreNumber(miscellaneous) - +restoreNumber(office) - 
										   +restoreNumber(supply) - +restoreNumber(payRoll) - +restoreNumber(rent) - +restoreNumber(liability) - 
										   +restoreNumber(tel) - +restoreNumber(travel) + +restoreNumber(interest)).toFixed(2))}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
		   </body>
		</html>`
}
