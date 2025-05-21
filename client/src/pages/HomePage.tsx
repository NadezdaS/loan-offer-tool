import { useNavigate } from 'react-router-dom';
import Button from '../components/button/Button';

export default function HomePage() {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/personal-details');
    };

    return (
        <div>
            <h2>Welcome to the Loan Offer Tool</h2>
            <Button
                id='home-page-start-btn'
                onClick={handleStart}
                data-cy="home-page-start-button"
            >
                Get Started
            </Button>
        </div>
    );
}