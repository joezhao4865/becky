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
					/>,
		NewVisitForm: <NewVisitForm />
	}
	
	return <div>
		<div className="d-flex flex-row bd-highlight mb-3">
			  <div className={currentTab === 'Searchbox' ? "px-2 bd-highlight active nav-header" : "px-2 bd-highlight nav-header"} onClick={() => setCurrentTab('Searchbox')}>Visits</div>
			  <div className="mx-4"> | </div>
			  <div className={currentTab === 'NewVisitForm' ? "px-2 bd-highlight active nav-header" : "px-2 bd-highlight nav-header"} onClick={() => setCurrentTab('NewVisitForm')}>New Visit</div>
		</div>
		<div>
			{subviews[currentTab]}
		</div>
	</div>
}

export default ClaimPicker

