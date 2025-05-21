import express from 'express';
import cors from 'cors';
import { config } from '../config';
import { loanOfferToolRoutes } from './routes/loanOfferToolRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', loanOfferToolRoutes);

app.listen(config.port, () => {
	console.log(`Server running on http://localhost:${config.port}`);
});

export default app;