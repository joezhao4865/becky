import React, {useState} from 'react'
import Searchbox from './Searchbox'
import NewVisitForm from './NewVisitForm'
import '../css/contentpicker.css'
import '../css/searchbox.css'
const ClaimPicker = () => {
	const [currentTab, setCurrentTab] = useState('Searchbox')
	const [pcafname, setPcafname] = useState('')
	const [pcalname, setPcalname] = useState('')
	const [recifname, setRecifname] = useState('')
	const [recilname, setRecilname] = useState('')
	const [startdate, setStartdate] = useState('')
	const [enddate, setEnddate] = useState('')
	const [results, setResults] = useState([])
	const [payer, setPayer] = useState('')
	const [showResult, setShowResult] = useState(false)
	const [startdatefocus, setStartdatefocus] = useState(false)
	const [enddatefocus, setEnddatefocus] = useState(false)
	
	const [trpcafname, setTrPcafname] = useState('')
	const [trpcalname, setTrPcalname] = useState('')
	const [trrecifname, setTrRecifname] = useState('')
	const [trrecilname, setTrRecilname] = useState('')
	const [trstartdate, setTrStartdate] = useState('')
	const [trenddate, setTrEnddate] = useState('')
	const [trresults, setTrResults] = useState([])
	const [trpayer, setTrPayer] = useState('')
	const [trshowResult, setTrShowResult] = useState(false)
	const [trstartdatefocus, setTrStartdatefocus] = useState(false)
	const [trenddatefocus, setTrEnddatefocus] = useState(false)
	
	const subviews = {
		Searchbox: <Searchbox
						pcafname={pcafname}
						setPcafname ={setPcafname}
						pcalname={pcalname}
						setPcalname ={setPcalname}
						recifname={recifname}
						setRecifname = {setRecifname}
						recilname={recilname}
						setRecilname = {setRecilname}
						startdate = {startdate}
						setStartdate = {setStartdate}
						enddate = {enddate}	
						setEnddate = {setEnddate}
						payer = {payer}
						setPayer = {setPayer}
						startdatefocus = {startdatefocus}
						setStartdatefocus = {setStartdatefocus}
						enddatefocus = {enddatefocus}
						setEnddatefocus = {setEnddatefocus}						
						results = {results}
						setResults = {setResults}
						showResult = {showResult}
						setShowResult = {setShowResult}
						functionGroup = 'Searchbox'
					/>,
		ClaimTracker: <Searchbox
						pcafname={trpcafname}
						setPcafname ={setTrPcafname}
						pcalname={trpcalname}
						setPcalname ={setTrPcalname}
						recifname={trrecifname}
						setRecifname = {setTrRecifname}
						recilname={trrecilname}
						setRecilname = {setTrRecilname}
						startdate = {trstartdate}
						setStartdate = {setTrStartdate}
						enddate = {trenddate}	
						setEnddate = {setTrEnddate}
						payer = {trpayer}
						setPayer = {setTrPayer}
						startdatefocus = {trstartdatefocus}
						setStartdatefocus = {setTrStartdatefocus}
						enddatefocus = {trenddatefocus}
						setEnddatefocus = {setTrEnddatefocus}						
						results = {trresults}
						setResults = {setTrResults}
						showResult = {trshowResult}
						setShowResult = {setTrShowResult}
						functionGroup = 'ClaimTracker'
					/>, 
		NewVisitForm: <NewVisitForm />
	}
	
	return <div>
		<div className="d-flex flex-row bd-highlight mb-3">
			  <div className={currentTab === 'Searchbox' ? "px-2 bd-highlight active nav-header" : "px-2 bd-highlight nav-header"} onClick={() => setCurrentTab('Searchbox')}>Visits</div>
			  <div className="mx-4"> | </div>
			  <div className={currentTab === 'ClaimTracker' ? "px-2 bd-highlight active nav-header" : "px-2 bd-highlight nav-header"} onClick={() => setCurrentTab('ClaimTracker')}>Claim Tracking</div>
			  <div className="mx-4"> | </div>
			  <div className={currentTab === 'NewVisitForm' ? "px-2 bd-highlight active nav-header" : "px-2 bd-highlight nav-header"} onClick={() => setCurrentTab('NewVisitForm')}>New Visit</div>
		</div>
		<div>
			{subviews[currentTab]}
		</div>
	</div>
}

export default ClaimPicker

