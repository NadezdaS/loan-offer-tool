import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLenderOffers } from '../services/loanService';
import type { LenderOffer } from '../../../shared/types';

export default function Results() {
	const { applicationId } = useParams();
	const [offers, setOffers] = useState<LenderOffer[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (applicationId) {
			setLoading(true);
			setError(null);

			getLenderOffers(Number(applicationId))
				.then((data) => {
					setOffers(data);
					setError(null);
				})
				.catch((err) => {
					console.log(err.message)
					setError(`Failed to fetch lender offers: ${err.message}. Please try again or contact the support.`);
					setOffers([]);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [applicationId]);

	return (
		<div>
			<h2>Loan Offers</h2>

			{loading && <p>Loading offers...</p>}

			{error && <p>{error}</p>}

			{!loading && !error && offers.length === 0 && (
				<p>No offers available for this application.</p>
			)}
			<div id='offers-results-container' data-cy='offers-results-container-cy'>
				{offers.map((offer, index) => (
					<div key={index} style={{ marginLeft: '20px' }} data-cy={`lender-${offer.lenderName}`}>
						<h3>{offer.lenderName}</h3>
						<ul>
							<li key='montly-payment'>Monthly Repayment: ${offer.monthlyRepayment}</li>
							<li key='interest-rate'>Interest Rate: {offer.interestRate}%</li>
							<li key='lender-fee'>Fees: {offer.fee > 0 ? `$${offer.fee}` : 'No fees'}</li>
						</ul>
					</div>
				))}
			</div>
		</div>
	);
}