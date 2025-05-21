import { calculateMonthlyPayment } from '../src/utils/calculateMontlyPayment';

test('calculates correct monthly payment', () => {
    const result = calculateMonthlyPayment(10000, 5, 5); // $10,000 at 5% over 5 years
    expect(result).toBeCloseTo(188.71, 2);
});
