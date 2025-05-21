import request from 'supertest';
import app from '../src/server';
import { applicationStore } from '../src/models/dataStore';

describe('Loan Offer Tool API', () => {
    beforeEach(() => {
        // Reset application store between tests
        (applicationStore as any).applications = [];
    });

    describe('POST /api/loan-application', () => {
        it('should accept a valid loan application and return applicationId', async () => {
            const validApplication = {
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'jane@example.com',
                employmentStatus: 'Employed',
                employerName: 'ABC',
                loanPurpose: 'Personal',
                amount: 15000,
                deposit: 3000,
                loanTerm: 4
            };

            const response = await request(app)
                .post('/api/loan-application')
                .send(validApplication);

            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                message: expect.stringContaining('Application'),
                applicationId: 0
            });
        });

        it('should return 400 if required fields are missing or invalid', async () => {
            const invalidApplication = {
                firstName: 'John',
                amount: 10000
                // missing required fields
            };

            const response = await request(app)
                .post('/api/loan-application')
                .send(invalidApplication);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe('GET /api/lender-offers/:applicationId', () => {
        it('should return lender offers for a valid application ID', async () => {
            const application = {
                firstName: 'Alice',
                lastName: 'Bright',
                email: 'aliceb@example.com',
                employmentStatus: 'Self-Employed',
                loanPurpose: 'Home Renovation',
                amount: 20000,
                deposit: 5000,
                loanTerm: 5
            };

            const postRes = await request(app)
                .post('/api/loan-application')
                .send(application);

            const applicationId = postRes.body.applicationId;

            const getRes = await request(app)
                .get(`/api/lender-offers/${applicationId}`);

            expect(getRes.status).toBe(200);
            expect(Array.isArray(getRes.body.offers)).toBe(true);
            expect(getRes.body.offers[0]).toEqual(
                expect.objectContaining({
                    lenderName: expect.any(String),
                    interestRate: expect.any(Number),
                    fee: expect.any(Number),
                    monthlyRepayment: expect.any(Number)
                })
            );
        });

        it('should return 404 for invalid application ID', async () => {
            const response = await request(app)
                .get('/api/lender-offers/100');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Application with id 100 not found' });
        });
    });
});
