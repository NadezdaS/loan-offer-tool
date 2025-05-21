import express from 'express';
import cors from 'cors';
import { loanOfferToolRoutes } from './routes/loanOfferToolRoutes';

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use('/api', loanOfferToolRoutes);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

export default app;