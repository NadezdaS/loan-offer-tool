describe('Loan application flow', () => {
  beforeEach(() => {
    cy.visit('/');

    // Click on the Get Started button on the Home Page
    cy.get('[data-cy="home-page-start-button"]').click()
  })

  it('Get offers for non-Vehicle purpose and Employed person status', () => {
    // Fill personal details
    cy.get('[data-cy="firstName"]').type('John');
    cy.get('[data-cy="lastName"]').type('Wood');
    cy.get('[data-cy="email"]').type('jwood@example.com');
    cy.get('[data-cy="employmentStatus"]').select('Employed');
    cy.get('[data-cy="employerName"]').type('ABC Corp');
    cy.get('[data-cy="personal-details-page-next-button"]').click();

    // Fill loan details
    cy.get('[data-cy="loanPurpose"]').type('Home Improvement');
    cy.get('[data-cy="amount"]').clear().type('25000');
    cy.get('[data-cy="loanTerm"]').clear().type('5');

    cy.get('[data-cy="submit-loan-button"]').click()

    // Verify redirection to results page
    cy.url().should('include', '/results/');
    cy.contains('Loan Offers');
    cy.get('[data-cy="offers-results-container-cy"]').children().should('have.length', 3);
  });

  it('Get offers for Vehicle purpose and Self-employed person status', () => {
    // Fill personal details
    cy.get('[data-cy="firstName"]').type('Alice');
    cy.get('[data-cy="lastName"]').type('Spring');
    cy.get('[data-cy="email"]').type('aspring@example.com');
    cy.get('[data-cy="employmentStatus"]').select('Self-Employed');
    cy.get('[data-cy="employerName"]').should('not.exist');
    cy.get('[data-cy="personal-details-page-next-button"]').click();

    // Fill loan details
    cy.get('[data-cy="loanPurpose"]').type('Vehicle');
    cy.get('[data-cy="amount"]').clear().type('15000');
    cy.get('[data-cy="deposit"]').should('exist');
    cy.get('[data-cy="deposit"]').clear().type('3000');
    cy.get('[data-cy="loanTerm"]').clear().type('3');

    cy.get('[data-cy="submit-loan-button"]').click()

    // Verify redirection to results page
    cy.url().should('include', '/results/');
    cy.contains('Loan Offers');
    cy.get('[data-cy="offers-results-container-cy"]').children().should('have.length', 3);
  });  
});
