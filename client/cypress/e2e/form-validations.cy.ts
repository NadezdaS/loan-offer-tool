describe('Loan application flow', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy="home-page-start-button"]').click()
  })

  it('Fist name is required field', () => {
    cy.get('[data-cy="lastName"]').type('Wood');
    cy.get('[data-cy="email"]').type('jwood@example.com');
    cy.get('[data-cy="employmentStatus"]').select('Employed');
    cy.get('[data-cy="employerName"]').type('ABC Corp');
    cy.get('[data-cy="personal-details-page-next-button"]').click();

    // We should get an error on First name
    cy.get('[data-cy="error-firstName"]').should('exist').contains('First name is required');
  });

  it('Last name is required field', () => {
    cy.get('[data-cy="firstName"]').type('John');
    cy.get('[data-cy="email"]').type('jwood@example.com');
    cy.get('[data-cy="employmentStatus"]').select('Employed');
    cy.get('[data-cy="employerName"]').type('ABC Corp');
    cy.get('[data-cy="personal-details-page-next-button"]').click();

    // We should get an error on Last name
    cy.get('[data-cy="error-lastName"]').should('exist').contains('Last name is required');
  });

  it('Loan purpose is required', () => {
    cy.get('[data-cy="firstName"]').type('John');
    cy.get('[data-cy="lastName"]').type('Wood');
    cy.get('[data-cy="email"]').type('jwood@example.com');
    cy.get('[data-cy="employmentStatus"]').select('Self-Employed');
    cy.get('[data-cy="personal-details-page-next-button"]').click();

    cy.get('[data-cy="loanPurpose"]').invoke('val', '');
    cy.get('[data-cy="amount"]').clear().type('25000');
    cy.get('[data-cy="loanTerm"]').clear().type('5');
    cy.get('[data-cy="submit-loan-button"]').click()

    // We should get an error on Loan purpose
    cy.get('[data-cy="error-loanPurpose"]').should('exist').contains('Loan purpose is required');
  });

  it('Minimal amount is $2000', () => {
    cy.get('[data-cy="firstName"]').type('John');
    cy.get('[data-cy="lastName"]').type('Wood');
    cy.get('[data-cy="email"]').type('jwood@example.com');
    cy.get('[data-cy="employmentStatus"]').select('Self-Employed');
    cy.get('[data-cy="personal-details-page-next-button"]').click();

    cy.get('[data-cy="loanPurpose"]').type('Home improvement');
    cy.get('[data-cy="amount"]').clear().type('1000');
    cy.get('[data-cy="loanTerm"]').clear().type('5');
    cy.get('[data-cy="submit-loan-button"]').click()

    // We should get an error on Amount
    cy.get('[data-cy="error-amount"]').should('exist').contains('Minimum loan amount is $2000');
  });

  it('Maximal loan term is 7 years', () => {
    cy.get('[data-cy="firstName"]').type('John');
    cy.get('[data-cy="lastName"]').type('Wood');
    cy.get('[data-cy="email"]').type('jwood@example.com');
    cy.get('[data-cy="employmentStatus"]').select('Self-Employed');
    cy.get('[data-cy="personal-details-page-next-button"]').click();

    cy.get('[data-cy="loanPurpose"]').type('Home improvement');
    cy.get('[data-cy="amount"]').clear().type('2500');
    cy.get('[data-cy="loanTerm"]').clear().type('8');
    cy.get('[data-cy="submit-loan-button"]').click()

    // We should get an error on Loan Term
    cy.get('[data-cy="error-loanTerm"]').should('exist').contains('Loan term must be between 1 and 7 years');
  });

  it('Vehicle deposit amount should be less than loan amount', () => {
    cy.get('[data-cy="firstName"]').type('John');
    cy.get('[data-cy="lastName"]').type('Wood');
    cy.get('[data-cy="email"]').type('jwood@example.com');
    cy.get('[data-cy="employmentStatus"]').select('Self-Employed');
    cy.get('[data-cy="personal-details-page-next-button"]').click();

    cy.get('[data-cy="loanPurpose"]').type('Vehicle');
    cy.get('[data-cy="amount"]').clear().type('2500');
    cy.get('[data-cy="deposit"]').clear().type('3000');
    cy.get('[data-cy="loanTerm"]').clear().type('3');
    cy.get('[data-cy="submit-loan-button"]').click()

    // We should get an error on Deposit
    cy.get('[data-cy="error-deposit"]').should('exist').contains('Deposit must not exceed the loan amount');
  });
  
});
