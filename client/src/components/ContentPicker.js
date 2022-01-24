import React, {useState} from 'react'
import ReportSearch from './ReportSearch'
import ProfitLoss from './ProfitLoss'
import '../css/contentpicker.css'
const ContentPicker = () => {
	const [currentTab, setCurrentTab] = useState('ReportSearch')
	const [fname, setFname] = useState('')
	const [lname, setLname] = useState('')
	const [serviceStartDate, setServiceStartDate] = useState('')
	const [serviceEndDate, setServiceEndDate] = useState('')
	const [checkStartDate, setCheckStartDate] = useState('')
	const [checkEndDate, setCheckEndDate] = useState('')
	const [payer, setPayer] = useState('')
	const [serviceStartdatefocus, setServiceStartdatefocus] = useState(false)
	const [serviceEnddatefocus, setServiceEnddatefocus] = useState(false)
	const [checkStartdatefocus, setCheckStartdatefocus] = useState(false)
	const [checkEnddatefocus, setCheckEnddatefocus] = useState(false)
	const [results, setResults] = useState({})
	const [showResult, setShowResult] = useState(false)
	
	const [startMonth, setStartMonth] = useState('')
	const [endMonth, setEndMonth] = useState('')
	//const [endDate, setEndDate] = useState('')
	const [feeForService, setFeeForService] = useState(0.00)
	const [service, setService] = useState(0.00)
	const [evvCharge, setEvvCharge]= useState(0)
	const [faxCharge, setFaxCharge] = useState(0)
	const [meals, setMeals]= useState(0)
	const [miscellaneous, setMiscellaneous] = useState(0)
	const [office, setOffice] = useState(0)
	const [supply, setSupply] = useState(0)
	const [payRoll, setPayroll] = useState(0)
	const [rent, setRent] = useState(0)
	const [liability, setLiability] = useState(0)
	const [tel, setTel] = useState(0)
	const [travel, setTravel] = useState(0)
	const [interest, setInterest] = useState(0)
	
	const subviews = {
		ReportSearch: <ReportSearch
						fname={fname}
						setFname={setFname}
						lname={lname}
						setLname={setLname}
						serviceStartDate = {serviceStartDate}
						setServiceStartDate = {setServiceStartDate}
						serviceEndDate = {serviceEndDate}
						setServiceEndDate = {setServiceEndDate}
						checkStartDate = {checkStartDate}
						setCheckStartDate = {setCheckStartDate}
						checkEndDate ={checkEndDate}
						setCheckEndDate = {setCheckEndDate}
						payer = {payer}
						setPayer = {setPayer}
						serviceStartdatefocus = {serviceStartdatefocus}
						setServiceStartdatefocus = {setServiceStartdatefocus}
						serviceEnddatefocus = {serviceEnddatefocus}
						setServiceEnddatefocus = {setServiceEnddatefocus}
						checkStartdatefocus = {checkStartdatefocus}
						setCheckStartdatefocus = {setCheckStartdatefocus}
						checkEnddatefocus = {checkEnddatefocus}
						setCheckEnddatefocus = {setCheckEnddatefocus}
						results = {results}
						setResults = {setResults}
						showResult = {showResult}
						setShowResult = {setShowResult}
					/>,
		Invoice: <ProfitLoss
					startMonth = {startMonth}
					setStartMonth = {setStartMonth}
					endMonth = {endMonth}
					setEndMonth = {setEndMonth}
					//endDate ={endDate}
					//setEndDate = {setEndDate}
					feeForService = {feeForService}
					setFeeForService = {setFeeForService}
					service = {service}
					setService = {setService}
					evvCharge = {evvCharge}
					setEvvCharge = {setEvvCharge}
					faxCharge = {faxCharge}
					setFaxCharge = {setFaxCharge}
					meals = {meals}
					setMeals = {setMeals}
					miscellaneous = {miscellaneous}
					setMiscellaneous = {setMiscellaneous}
					office = {office}
					setOffice = {setOffice}
					supply = {supply}
					setSupply = {setSupply}
					payRoll = {payRoll}
					setPayroll = {setPayroll}
					rent = {rent}
					setRent = {setRent}
					liability = {liability}
					setLiability = {setLiability}
					tel = {tel}
					setTel = {setTel}
					travel = {travel}
					setTravel = {setTravel}
					interest = {interest}
					setInterest = {setInterest}
				 />
	}
	
	return <div>
		<div className="d-flex flex-row bd-highlight mb-3">
			  <div className={currentTab == 'ReportSearch' ? "px-2 bd-highlight active nav-header" : "px-2 bd-highlight nav-header"} onClick={() => setCurrentTab('ReportSearch')}>Income & Pay</div>
			  <div className="mx-4"> | </div>
			  <div className={currentTab == 'Invoice' ? "px-2 bd-highlight active nav-header" : "px-2 bd-highlight nav-header"} onClick={() => setCurrentTab('Invoice')}>Profit & Loss</div>
		</div>
		<div>
			{subviews[currentTab]}
		</div>
	</div>
}

export default ContentPicker

