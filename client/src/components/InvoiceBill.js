import React, {useState, useEffect} from 'react'
import '../css/invoice.css'
const InvoiceBill = ({recifname, recilname, startdate, enddate, billdata}) => {
	const today = new Date();
	const currMonth = today.getMonth() + 1
	const currDay = today.getDate()
	const currYear = today.getFullYear()
	
	const [billingAddress1, setBillingAddress1] = useState('')
	const [billingAddress2, setBillingAddress2] = useState('')
	const [shippingAddress1, setShippingAddress1] = useState('')
	const [shippingAddress2, setShippingAddress2] = useState('')
	const [notes, setNotes] = useState([])
	const [comments, setComments] = useState('')
	const [taxable, setTaxable] = useState(0)
	const [sh, setSh] = useState(0)
	const [other, setOther] = useState(0)
	
	const taxRate = 0.05
	const ivcNumber = '1234567'
	
	useEffect(()=>{
		if(billdata.length > 0){
			setBillingAddress1(billdata[0].billing_address1)
			setBillingAddress2(billdata[0].billing_address2)
			setShippingAddress1(billdata[0].shipping_address1)
			setShippingAddress2(billdata[0].shipping_address2)
			setNotes(billdata.reduce((start, d) =>[...start, {item: '', description: '', qty: d.billable_units, rate: d.hourly_charge, tax: 0.05}], []))
		}
	}, [])
	
	const createAndDownloadPdf = () => {
		fetch('/invoice', {
				method: "POST",
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
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
									})
			}).then(res => res.blob())
			  .then(blob => {
					var url = window.URL.createObjectURL(blob);
					//window.location.assign(file);
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', 'invoice.pdf')
					document.body.appendChild(link);
					link.click();
					link.parentNode.removeChild(link);
			  })	  
	}
	
	const addNotes = () => {
		let newNotes = [...notes]
		let note = {item: '', description: '', qty: 0, rate: 0, tax: 0.05}
		newNotes.push(note)
		setNotes(newNotes)
	}
	
	//v is the value k is the key of object at index idx
	const updateNotes = (v, k, idx) => {
		let newNotes = [...notes]
		newNotes[idx][k] = v
		setNotes(newNotes)
	}
	
	const removeZero = event => (key, idx) => f => event.target.value == '0' ? f('', key, idx) : f(event.target.value, key, idx)
	const restoreZero = event =>(key, idx) => f => event.target.value == '' ? f(0, key, idx) : f(event.target.value, key, idx)
	const removeZeroFromSimpleField = event => f => event.target.value == '0' ? f('') : f(event.target.value)
	const restoreZeroToSimpleField = event => f => event.target.value == '' ? f(0) : f(event.target.value)
	
	return <div className='mb-3'>
		<div id='invoice-content'>
			<div className="invoice-box">
				<div className="top">
					<table cellPadding="0" cellSpacing="0">
						<tbody>
						<tr>
						   <td className="header-field">							
							<table id="company-table" style={{position: 'relative'}}>
								<thead><tr><th style={{textAlign: 'left', fontSize: '1.5rem', position: 'absolute', top: '-28px'}}>Becky Healthcare LLC.</th></tr></thead>
								<tbody>
									<tr><td>10135 Yorktown Drive</td></tr>
									<tr><td>Greate Falls, VA 22066</td></tr>
									<tr><td></td></tr>
								</tbody>
							</table>
						   </td>
						   <td className="header-field">
							<table id="invoice-table" cellPadding="0" cellSpacing="0">
								<thead><tr><th colSpan="2" style={{textAlign: 'right', fontSize: '1.5rem', color: '#7979d2'}}>INVOICE</th></tr></thead>
								<tbody>
									<tr>
									{/*<td style={{textAlign: 'right', width: '80%', paddingRight: '5px'}}>DATE</td> */}
										<td style={{textAlign: 'right', 'width': '80%'}}>{currMonth + '/' + currDay + '/' + currYear}</td>
									</tr>
									<tr> </tr><tr> </tr>
									{/*<tr>
										<td style={{textAlign: 'right', width: '80%', paddingRight: '5px'}}>INVOICE #</td>
										<td style={{textAlign: 'center'}} className="bordered-td">{ivcNumber}</td>
									</tr> */}
									{/*<tr>
										<td style={{textAlign: 'right', paddingRight: '5px'}}>CUSTOMER ID</td>
										<td style={{textAlign: 'center'}}  className="bordered-td">{clientId}</td>
									</tr> */}
								</tbody>
							</table>
						   </td>
						</tr>
						</tbody>
					</table>
				</div>
				<div className="top">
					<table cellPadding="0" cellSpacing="0">
						<tbody>
						<tr>
							<td id="billing">
								<table>
								<thead><tr><th style={{textAlign: 'left'}} className="blue">BILL TO</th></tr></thead>
								<tbody>
									<tr><td>{recifname + ' ' + recilname}</td></tr>
									<tr style={{height: '1rem'}}></tr>
									<tr><td>{billingAddress1}</td></tr>
									<tr><td>{billingAddress2}</td></tr>
								</tbody>
								</table>
							</td>
							<td style={{width: '10%'}}></td>
							<td id="shipping">
								<table>
								<thead><tr><th style={{textAlign: 'left'}} className="blue">SHIP TO</th></tr></thead>
								<tbody>
									<tr><td>{recifname + ' ' + recilname}</td></tr>
									<tr style={{height: '1rem'}}></tr>
									<tr><td>{shippingAddress1}</td></tr>
									<tr><td>{shippingAddress2}</td></tr>
								</tbody>
								</table>
							</td>
						</tr>
						</tbody>
					</table>
				</div>
				<div className="detail-table">
					<table cellSpacing="0" cellPadding="0">
						<thead>
							<tr>
								<th className="blue zero-padding" style={{width: '15%'}}>SALESPERSON</th>
								<th className="blue zero-padding" style={{width: '10%'}}>P.O.#</th>
								<th className="blue zero-padding" style={{width: '15%'}}>SHIP DATE</th>
								<th className="blue zero-padding" style={{width: '25%'}}>SHIP VIA</th>
								<th className="blue zero-padding" style={{width: '10%'}}>F.O.B.</th>
								<th className="blue zero-padding" style={{width: '25%'}}>TERMS</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="bordered-td"></td>
								<td className="bordered-td"> </td>
								<td className="bordered-td"> </td>
								<td className="bordered-td"> </td>
								<td className="bordered-td"> </td>
								<td className="bordered-td">Due on receipt</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="detail-table">
					<table cellSpacing="0" cellPadding="0">
						<thead>
							<tr onClick={addNotes} className='pointer-hand'>
								<th className="blue zero-padding" style={{width: '15%'}}>ITEM #</th>
								<th className="blue zero-padding" style={{width: '50%'}}>DESCRIPTION</th>
								<th className="blue zero-padding" style={{width: '5%'}}>QTY</th>
								<th className="blue zero-padding" style={{width: '15%'}}>UNIT PRICE</th>
								<th className="blue zero-padding" style={{width: '5%'}}>TAX</th>
								<th className="blue zero-padding" style={{width: '10%'}}>TOTAL</th>
							</tr>
						</thead>
						<tbody>
						{
							notes.map((v,i) => <tr key={'k_'+i}>
								<td className="border-td" style={{width: '15%'}}>
									<input style={{width: '100%'}} type="text" value={v.item} onChange={e => updateNotes(e.target.value, 'item', i)} />
								</td>
								<td className="border-td" style={{width: '45%'}}>
									<input style={{width: '100%'}} type="text" value={v.description} onChange={e => updateNotes(e.target.value, 'description', i)} />
								</td>
								<td className="border-td" style={{width: '10%'}}>
									<input style={{width: '100%'}} type="text" value={v.qty} 
												onChange={e => updateNotes(e.target.value, 'qty', i)}
												onFocus={e=>removeZero(e)('qty',i)(updateNotes)}
												onBlur={e=>restoreZero(e)('qty',i)(updateNotes)}
									/>
								</td>
								<td className="right border-td" style={{width: '10%'}}>
									<input style={{width: '100%'}} type="text" value={v.rate} 
												onChange={e => updateNotes(e.target.value, 'rate', i)} 
												onFocus={e=>removeZero(e)('rate',i)(updateNotes)}
												onBlur={e=>restoreZero(e)('rate',i)(updateNotes)}
									/>
								</td>
								<td className="border-td" style={{width: '10%'}}>
									<input style={{width: '100%'}} type="text" value={v.tax} 
												onChange={e => updateNotes(e.target.value, 'tax', i)} 
												onFocus={e=>removeZero(e)('tax',i)(updateNotes)}
												onBlur={e=>restoreZero(e)('tax',i)(updateNotes)}
									/>
								</td>
								<td className="gray-td border-td right" style={{borderBottom: '1px solid grey'}}>
								{((+v.qty * +v.rate)*(1 + +v.tax)).toFixed(2)}
								</td>
							</tr>)
						}
							<tr>
								<td colSpan="3"></td>
								<td>SUBTOTAL</td>
								<td></td>
								<td className="right gray-td" style={{borderBottom: '1px solid grey'}}>
								{(notes.reduce((sum, n) => sum + (+n.qty * +n.rate)*(1 + +n.tax), 0)).toFixed(2)}
								</td>
							</tr>
							<tr>
								<td colSpan="2" className="center gray-td">Other Comments or Special Instructions</td>
								<td></td>
								<td>TAXABLE</td>
								<td></td>
								<td className="right gray-td" style={{borderBottom: '1px solid grey'}}>
									<input value={taxable} 
										onChange={e=>setTaxable(e.target.value)}
										onFocus={e=>removeZeroFromSimpleField(e)(setTaxable)} 
										onBlur={e=>restoreZeroToSimpleField(e)(setTaxable)}
										style={{width: '100%', textAlign: 'right'}}
									/>
								</td>
							</tr>
							<tr>
								<td className='py-0' colSpan="2" rowSpan="5">
									<textarea	style={{
														width: '100%', 
														height: '114px', 
														color: 'white', 
														background: 'none', 
														paddingLeft: '2px', 
														resize: 'none'
													}}
												onChange={e=>setComments(e.target.value)}
									></textarea>
								</td>
								<td></td>
								<td>TAX RATE</td>
								<td></td>
								<td className="right gray-td" style={{borderBottom: '1px solid grey'}}>{taxRate}%</td>
							</tr>
							<tr>
								<td></td>
								<td>TAX</td>
								<td></td>
								<td className="right gray-td" style={{borderBottom: '1px solid grey'}}>{(+taxable * +taxRate).toFixed(2)}</td>
							</tr>
							<tr>
								<td></td>
								<td>S & H</td>
								<td></td>
								<td className="gray-td">
									<input value={sh} 
										onChange={e=>setSh(e.target.value)}
										onFocus={e=>removeZeroFromSimpleField(e)(setSh)} 
										onBlur={e=>restoreZeroToSimpleField(e)(setSh)}
										style={{width: '100%', textAlign: 'right'}}
									/>
								</td>
							</tr>
							<tr>
								<td></td>
								<td style={{borderBottom: '1px solid gray'}}>OTHER</td>
								<td style={{borderBottom: '1px solid gray'}}></td>
								<td className="gray-td">
									<input value={other} 
										onChange={e=>setOther(e.target.value)}
										onFocus={e=>removeZeroFromSimpleField(e)(setOther)} 
										onBlur={e=>restoreZeroToSimpleField(e)(setOther)}
										style={{width: '100%', textAlign: 'right'}} 
									/>
								</td>
							</tr>
							<tr>
								<td></td>
								<td style={{borderTop: '1px solid gray'}}>TOTAL</td>
								<td style={{borderTop: '1px solid gray'}}></td>
								<td className="right" style={{borderTop: '1px solid gray', backgroundColor: '#7979d2', color: 'white'}}>
									{(+(notes.reduce((sum, n) => sum + (+n.qty * +n.rate)*(1 + +n.tax), 0)) + +taxable * +taxRate + +sh + +other).toFixed(2)}
								</td>
							</tr>
						</tbody>
					</table>
					<div style={{paddingRight: '20px', textAlign: 'right', marginTop: '20px'}}>
						Make all checks payable to
					</div>
					<div style={{paddingRight: '25px', textAlign: 'right', fontWeight: 'bold'}}>
						Becky Healthcare LLC.
					</div>
				</div>
				<div className="center" style={{fontStyle: 'italic', fontWeight: 'bold', marginTop: '20px'}}>
					Thank You For Your Business!
				</div>
				<div className='d-flex justify-content-end'>
					<button className='btn btn-primary' onClick={createAndDownloadPdf}>Download</button>
				</div>
			</div>
		</div>
	</div>
}

export default InvoiceBill