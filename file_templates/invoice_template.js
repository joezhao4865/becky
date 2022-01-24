module.exports = ({
					recifname, 
					recilname, 
					billingAddress1, 
					billingAddress2, 
					shippingAddress1, 
					shippingAddress2,
					notes,
					comments,
					taxable,
					taxRate,
					sh,
					other
				}) => {
    const today = new Date();
	const currMonth = today.getMonth() + 1
	const currDay = today.getDate()
	const currYear = today.getFullYear()
	return `
		<!doctype html>
		<html>
		   <head>
			  <meta charset="utf-8">
			  <title>PDF Test Template</title>
			  <style>
				 .invoice-box {
					 max-width: 800px;
					 margin: auto;
					 padding: 30px;
					 box-shadow: 0 0 10px rgba(0, 0, 0, .15);
					 font-size: 16px;			 
					 font-family: 'Arial', 'san serif'
					 color: #555;
				 }
				 .invoice-box table{
					width: 100%;
				 }
				
				 #company, #invoice-header{
					width: 50%;
				 }
				 #billing, #shipping{	
					width: 20%;
					margin-top: 30px;
					
				 }
				 #biller, #shipper{
					margin-bottom: 20px;
				 }
				 .detail-table{
					margin-top: 30px;
				 }
				 .header-field{
					width: 50%;
				 }
				 .blue{
					background-color: #000080;
					color: white;
				 }
				 .zero-padding{
					padding-left: 0;
					padding-right: 0;
					margin-left: 0;
					margin-right: 0;
				 }
				 .right{
					text-align: right;
					padding-right: 2px;
				 }
				 .center{
					text-align: center;
				 }
				 .bordered-td{
					border: 1px solid grey;
					text-align: center;
				 }
				 .gray-td{
					background-color: #e6e6e6;
				 }
				 .header{
					font-size: 1.5rem;
					font-weight: bold;
					margin-bottom: 5px;
				 }
				 .top{
					width: 100%;
					margin-top: 40px;
				 }
				 @media only screen and (max-width: 600px) {
					 .top{display: flex; flex-direction: column}
					 #company, #invoice-header{
						width: 100%;
						border: 1px solid red;
					 }
					 #invoice-header{
						text-align: left;
					 }
				 }
			  </style>
		   </head>
		   <body>
			  <div class="invoice-box">
				<div class="top">
					<table cellpadding="0" cellspacing="0">
						<tr>
						   <td class="header-field">							
							<table id="company-table" style="position: relative">
								<thead><tr><th style="text-align: left; font-size: 1.5rem; position: absolute; top: -28px">Becky Healthcare LLC.</th></tr></thead>
								<tbody>
									<tr><td>10135 Yorktown Drive</td></tr>
									<tr><td>Greate Falls, VA 22066</td></tr>
									<tr><td></td></tr>
								</tbody>
							</table>
						   </td>
						   <td class="header-field">
							<table id="invoice-table" cellpadding="0" cellspacing="0">
								<thead><tr><th colspan="2" style="text-align: right; font-size: 1.5rem; color: #7979d2;">INVOICE</th></tr></thead>
								<tbody>
									<tr>
										<td style="text-align: right; width: 20%;">${currMonth + '/' + currDay + '/' + currYear}</td>
									</tr>
									<tr></tr>
									<tr></tr>
								</tbody>
							</table>
						   </td>
						</tr>
					</table>
				</div>
				<div class="top">
					<table cellpadding="0" cellspacing="0" style="width: 70%">
						<tr>
							<td id="billing">
								<table>
								<thead><tr><th style="text-align: left;" class="blue">BILL TO</th></tr></thead>
								<tbody>
									<tr><td>${recifname+' '+recilname}</td></tr>
									<tr style="height: 1rem"></tr>
									<tr><td>${billingAddress1}</td></tr>
									<tr><td>${billingAddress2}</td></tr>
								</tbody>
								</table>
							</td>
							<td style="width: 10%"></td>
							<td id="shipping">
								<table>
								<thead><tr><th style="text-align: left;" class="blue">SHIP TO</th></tr></thead>
								<tbody>
									<tr><td>${recifname+' '+recilname}</td></tr>
									<tr style="height: 1rem"></tr>
									<tr><td>${shippingAddress1}</td></tr>
									<tr><td>${shippingAddress2}</td></tr>
								</tbody>
								</table>
							</td>
						</tr>	
					</table>
				</div>
				<div class="detail-table">
					<table cellspacing="0" cellpadding="0">
						<thead>
							<tr>
								<th class="blue zero-padding" style="width: 15%">SALESPERSON</th>
								<th class="blue zero-padding" style="width: 10%">P.O.#</th>
								<th class="blue zero-padding" style="width: 15%">SHIP DATE</th>
								<th class="blue zero-padding" style="width: 25%">SHIP VIA</th>
								<th class="blue zero-padding" style="width: 10%">F.O.B.</th>
								<th class="blue zero-padding" style="width: 25%">TERMS</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="bordered-td"></td>
								<td class="bordered-td"> </td>
								<td class="bordered-td"> </td>
								<td class="bordered-td"> </td>
								<td class="bordered-td"> </td>
								<td class="bordered-td">Due on receipt</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="detail-table">
					<table cellspacing="0" cellpadding="0">
						<thead>
							<tr>
								<th class="blue zero-padding" style="width: 15%">ITEM #</th>
								<th class="blue zero-padding" style="width: 50%">DESCRIPTION</th>
								<th class="blue zero-padding" style="width: 5%">QTY</th>
								<th class="blue zero-padding" style="width: 15%">UNIT PRICE</th>
								<th class="blue zero-padding" style="width: 5%">TAX</th>
								<th class="blue zero-padding" style="width: 10%">TOTAL</th>
							</tr>
						</thead>
						<tbody>
							${
								notes.map((v,i) => `<tr>
									<td class="bordered-td">
										${v.item}
									</td>
									<td class="bordered-td">
										${v.description}
									</td>
									<td class="bordered-td">
										${v.qty}
									</td>
									<td class="bordered-td">
										${v.rate}
									</td>
									<td class="bordered-td">
										${v.tax}
									</td>
									<td class="gray-td right" style="border: 1px solid grey">
										${((+v.qty * +v.rate)*(1 + +v.tax)).toFixed(2)}
									</td>
								</tr>`).join('')
							}
							<tr>
								<td colspan="3"></td>
								<td>SUBTOTAL</td>
								<td></td>
								<td class="right gray-td" style="border-bottom: 1px solid gray">${(notes.reduce((sum, n) => sum + (+n.qty * +n.rate)*(1 + +n.tax), 0)).toFixed(2)}</td>
							</tr>
							<tr>
								<td colspan="2" class="center gray-td">Other Comments or Special Instructions</td>
								<td></td>
								<td>TAXABLE</td>
								<td></td>
								<td class="right gray-td" style="border-bottom: 1px solid gray">${taxable}</td>
							</tr>
							<tr>
								<td colspan="2" rowspan="5" style="border-left: 1px solid gray; border-right: 1px solid gray; border-bottom: 1px solid gray;">
									${comments}
								</td>
								<td></td>
								<td>TAX RATE</td>
								<td></td>
								<td class="right gray-td" style="border-bottom: 1px solid gray">${taxRate}%</td>
							</tr>
							<tr>
								<td></td>
								<td>TAX</td>
								<td></td>
								<td class="right gray-td" style="border-bottom: 1px solid gray">${(+taxable * +taxRate).toFixed(2)}</td>
							</tr>
							<tr>
								<td></td>
								<td>S & H</td>
								<td></td>
								<td class="right gray-td" style="border-bottom: 1px solid gray">${sh}</td>
							</tr>
							<tr>
								<td></td>
								<td style="border-bottom: 1px solid gray">OTHER</td>
								<td style="border-bottom: 1px solid gray"></td>
								<td class="right gray-td" style="border-bottom: 1px solid gray">${other}</td>
							</tr>
							<tr>
								<td></td>
								<td style="border-top: 1px solid gray">TOTAL</td>
								<td style="border-top: 1px solid gray"></td>
								<td class="right " style="border-top: 1px solid gray; background-color: #7979d2; color: white;">
									$ ${(
										((notes.reduce((sum, n) => sum + (+n.qty * +n.rate)*(1 + +n.tax), 0)) + +taxable * +taxRate + +sh + +other).toFixed(2)
									  ).replaceAll(/(\d)(?=(\d\d\d)+(\.|$))/g, '$1,')}
								</td>
							</tr>
						</tbody>
					</table>
					<div style="padding-right: 20px; text-align: right; margin-top: 20px">
						Make all checks payable to
					</div>
					<div style="padding-right: 25px; text-align: right; font-weight: bold">
						Becky Healthcare LLC.
					</div>
				</div>
				<div class="center" style="font-style: italic; font-weight: bold; margin-top: 20px">
					Thank You For Your Business!
				</div>
			  </div>
		   </body>
		</html>`
}
