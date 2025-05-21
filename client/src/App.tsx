import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PersonalDetails from './pages/PersonalDetails';
import LoanDetails from './pages/LoanDetails';
import Results from './pages/Results';

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/personal-details" element={<PersonalDetails />} />
				<Route path="/loan-details" element={<LoanDetails />} />
				<Route path="/results/:applicationId" element={<Results />} />
			</Routes>
		</Router>
	);
}
